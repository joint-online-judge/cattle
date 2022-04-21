import type { ProColumns } from '@ant-design/pro-table'
import { EditableProTable } from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { Checkbox, Form, message } from 'antd'
import LoadFailResult from 'components/LoadFailResult'
import ShadowCard from 'components/ShadowCard'
import { useMessage } from 'hooks'
import {
	flatten,
	fromPairs,
	groupBy,
	isArray,
	merge,
	toPairs,
	uniq
} from 'lodash-es'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import type { DomainPermission, DomainRoleEdit } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'

interface DataSourceType {
	id: string
	permission: string
	[key: string]: boolean | string
}

const Index: React.FC = () => {
	const { t } = useTranslation()
	const msg = useMessage()
	const [form] = Form.useForm()
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
	const [activeKey, setActiveKey] = useState<keyof DomainPermission>('general')
	const [loadFailed, setLoadFailed] = useState<boolean>(false)

	if (!domainUrl) {
		// Shall be unreachable under normal conditions
		throw new Error('No domainUrl found')
	}

	const {
		refresh: refetch,
		loading: fetching,
		data: roles
	} = useRequest(
		async () => {
			const response = await Horse.domain.v1ListDomainRoles(domainUrl, {
				ordering: 'created_at'
			})
			return response.data.data?.results ?? []
		},
		{
			onSuccess: () => {
				form.resetFields()
			},
			onError: () => {
				setLoadFailed(true)
				message.error('fetch domain user failed')
			}
		}
	)

	const { run: updateRole, loading: updating } = useRequest(
		async (role: string, data: DomainRoleEdit) => {
			const response = await Horse.domain.v1UpdateDomainRole(
				domainUrl,
				role,
				data
			)
			return response.data
		},
		{
			manual: true,
			onSuccess: res => {
				if (res.errorCode === ErrorCode.Success) {
					msg.success.update()
				} else if (res.errorCode === ErrorCode.DomainRoleReadOnlyError) {
					message.error('this role is read-only')
				} else {
					message.error('update failed')
				}

				refetch()
			},
			onError: () => {
				refetch()
				message.error('fetch domain user failed')
			}
		}
	)

	const columns: ProColumns<DataSourceType>[] = useMemo(() => {
		if (isArray(roles)) {
			const roleCols: ProColumns<DataSourceType>[] = roles.map(role => ({
				title: role.role,
				width: 60,
				dataIndex: role.role,
				align: 'center',
				formItemProps: {
					valuePropName: 'checked'
				},
				renderFormItem: e => (
					<Checkbox
						onChange={(domEvent): void => {
							// @ts-expect-error incomplete typings
							const row = e.entity as Record<string, string>
							const selectedRole = e.dataIndex as string
							const originDomainRole = roles.find(r => r.role === selectedRole)

							if (originDomainRole === undefined) {
								return
							}

							updateRole(selectedRole, {
								permission: merge(originDomainRole.permission, {
									[activeKey]: {
										[row.permission]: domEvent.target.checked
									}
								})
							})
						}}
					/>
				)
			}))

			roleCols.unshift({
				title: t('DomainSettings.permission'),
				width: 200,
				dataIndex: 'permission',
				editable: false
			})

			return roleCols
		}

		return []
	}, [roles, t, activeKey, updateRole])

	const categories = useMemo(() => {
		if (!isArray(roles) || roles.length === 0) {
			return []
		}

		return uniq(flatten(roles.map(r => Object.keys(r.permission))))
	}, [roles])

	const dataSource: DataSourceType[] = useMemo(() => {
		if (!isArray(roles) || roles.length === 0) {
			return []
		}

		// FIXME: maybe simpler implementation for better readability?
		const permissionGroup: Record<
			string,
			{ permName: string; roleValue: [string, boolean] }[]
		> = groupBy(
			flatten(
				roles
					.map(r => ({
						role: r.role,
						permission: toPairs(r.permission[activeKey])
					}))
					.map(o =>
						o.permission.map(pair => ({
							permName: pair[0],
							roleValue: [o.role, pair[1]]
						}))
					)
			),
			o => o.permName
		)

		const result = toPairs(permissionGroup).map(pair => ({
			id: `${activeKey}-${pair[0]}`,
			permission: pair[0],
			...fromPairs(pair[1].map(o => o.roleValue))
		}))
		return result as DataSourceType[]
	}, [roles, activeKey])

	useEffect(() => {
		setEditableKeys(dataSource.map(o => o.id))
	}, [dataSource])

	return (
		<ShadowCard>
			{loadFailed ? (
				<LoadFailResult />
			) : (
				<EditableProTable<DataSourceType>
					bordered
					rowKey='id'
					columns={columns}
					value={dataSource}
					scroll={{ x: 'max-content' }}
					loading={fetching || updating}
					cardProps={false}
					search={false}
					options={false}
					pagination={false}
					recordCreatorProps={false}
					toolbar={{
						menu: {
							type: 'tab',
							activeKey,
							items: categories.map(c => ({
								key: c,
								label: <span>{c}</span>
							})),
							onChange: (key: React.Key | undefined): void => {
								setActiveKey(key as keyof DomainPermission)
							}
						}
					}}
					editable={{
						type: 'multiple',
						form,
						editableKeys,
						onChange: setEditableKeys
					}}
				/>
			)}
		</ShadowCard>
	)
}

export default Index

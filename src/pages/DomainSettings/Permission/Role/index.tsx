import type { ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { Button, message, Popconfirm } from 'antd'
import LoadFailResult from 'components/LoadFailResult'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { DomainRole } from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'
import AddRoleModal from './AddRoleModal'

const Index: React.FC = () => {
	const { domainUrl } = useParams<{ domainUrl: string }>()
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
			const response = await Horse.domain.v1ListDomainRoles(domainUrl)
			return response.data.data?.results ?? []
		},
		{
			onError: () => {
				setLoadFailed(true)
				message.error('fetch domain user failed')
			}
		}
	)

	const { run: deleteRole, loading: deleting } = useRequest(
		async (role?: string) => {
			if (typeof role !== 'string') {
				return
			}
			const response = await Horse.domain.v1DeleteDomainRole(domainUrl, role)
			// eslint-disable-next-line consistent-return
			return response.data
		},
		{
			manual: true,
			onSuccess: res => {
				switch (res?.errorCode) {
					case ErrorCode.Success: {
						refetch()
						message.success('delete success')

						break
					}

					case ErrorCode.DomainRoleReadOnlyError: {
						message.error('this role is read-only')

						break
					}

					case ErrorCode.DomainRoleUsedError: {
						message.error('users with this role exist')

						break
					}

					default: {
						message.error('delete failed')
					}
				}
			},
			onError: () => {
				message.error('delete failed')
			}
		}
	)

	const columns: ProColumns<DomainRole>[] = [
		{
			title: '角色',
			dataIndex: 'role'
		},
		{
			title: '操作',
			width: 160,
			key: 'option',
			dataIndex: 'role',
			render: role => [
				<Popconfirm
					title='Are you sure to delete this role?'
					onConfirm={(): void => deleteRole(role?.toString())}
					okText='Yes'
					cancelText='No'
					key='delete'
					okButtonProps={{
						loading: deleting
					}}
				>
					<Button type='link'>Delete</Button>
				</Popconfirm>
			]
		}
	]

	const toolBarRender = (): ReactNode[] => [
		<AddRoleModal
			key='add'
			domainUrl={domainUrl}
			roles={roles}
			onSuccess={refetch}
		/>
	]

	return (
		<ShadowCard>
			{loadFailed ? (
				<LoadFailResult />
			) : (
				<ProTable<DomainRole>
					bordered
					scroll={{ x: 'max-content' }}
					loading={fetching || deleting}
					cardProps={false}
					search={false}
					options={false}
					pagination={false}
					columns={columns}
					rowKey='id'
					dataSource={roles ?? []}
					toolBarRender={toolBarRender}
				/>
			)}
		</ShadowCard>
	)
}

export default Index

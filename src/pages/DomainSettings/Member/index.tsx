import { UserAddOutlined } from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { useRequest } from 'ahooks'
import { Button, message, Popconfirm, Space, Tag } from 'antd'
import Gravatar from 'components/Gravatar'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { ProTablePagination } from 'types'
import { transPagination } from 'utils'
import type { DomainUserAdd, UserWithDomainRole } from 'utils/service'
import { Horse } from 'utils/service'
import AddUserModal from './AddUserModal'

const Index: React.FC = () => {
	const [modalVis, setModalVis] = useState<boolean>(false)
	const [editingUser, setEditingUser] = useState<
		UserWithDomainRole | undefined
	>(undefined)
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const tableRef = useRef<ActionType>()
	const modalFormRef = useRef<ProFormInstance<DomainUserAdd>>()

	if (!domainUrl) {
		// Shall be unreachable under normal conditions
		throw new Error('No domainUrl found')
	}

	const { runAsync: fetchDomainUsers, loading: fetching } = useRequest(
		async (parameters: ProTablePagination) => {
			const response = await Horse.domain.v1ListDomainUsers(
				domainUrl,
				transPagination(parameters)
			)
			return response.data.data ?? { count: 0, results: [] }
		},
		{
			manual: true,
			onError: () => {
				message.error('fetch domain user failed')
			}
		}
	)

	const { run: removeUser, loading: deleting } = useRequest(
		async (userId: string) => {
			const response = await Horse.domain.v1RemoveDomainUser(domainUrl, userId)
			return response.data
		},
		{
			manual: true,
			onSuccess: () => {
				tableRef.current?.reload()
				message.success('remove domain user success')
			},
			onError: () => {
				message.error('remove domain user failed')
			}
		}
	)

	const columns: ProColumns<UserWithDomainRole>[] = [
		{
			title: '学号',
			width: 140,
			dataIndex: 'studentId'
		},
		{
			title: '用户名',
			width: 140,
			render: (_, record) => (
				<Space>
					<Gravatar gravatar={record.gravatar} size='small' />
					<Link to={`/user/${record.id}`}>{record.username}</Link>
				</Space>
			)
		},
		{
			title: '真名',
			width: 120,
			ellipsis: true,
			dataIndex: 'realName'
		},
		{
			title: '角色',
			width: 120,
			dataIndex: 'domainRole',
			render: value => <Tag>{value}</Tag>
		},
		{
			title: '操作',
			key: 'option',
			valueType: 'option',
			render: (_text, record) => [
				<Button
					type='link'
					key='edit'
					onClick={(): void => {
						setEditingUser(record)
						setModalVis(true)
					}}
				>
					编辑
				</Button>,
				<Popconfirm
					key='remove'
					title='Are you sure to remove this user?'
					onConfirm={(): void => removeUser(record.id)}
				>
					<Button type='link'>删除</Button>
				</Popconfirm>
			]
		}
	]

	const toolBarRender = (): ReactNode[] => [
		<Button
			key='add-user'
			type='primary'
			icon={<UserAddOutlined />}
			onClick={(): void => {
				setEditingUser(undefined)
				setModalVis(true)
				modalFormRef.current?.resetFields()
			}}
		>
			添加用户
		</Button>
	]

	return (
		<ShadowCard>
			<ProTable<UserWithDomainRole>
				scroll={{ x: 'max-content' }}
				loading={fetching || deleting}
				actionRef={tableRef}
				cardProps={false}
				columns={columns}
				request={async (
					parameters
				): Promise<Partial<RequestData<UserWithDomainRole>>> => {
					const data = await fetchDomainUsers(parameters)
					return {
						data: data.results,
						total: data.count,
						success: true
					}
				}}
				rowKey='id'
				pagination={{
					showQuickJumper: true
				}}
				search={false}
				dateFormatter='string'
				toolBarRender={toolBarRender}
			/>
			<AddUserModal
				domainUrl={domainUrl}
				onSuccess={async (): Promise<void> => tableRef.current?.reload()}
				visible={modalVis}
				onVisibleChange={setModalVis}
				formRef={modalFormRef}
				editingUser={editingUser}
			/>
		</ShadowCard>
	)
}

export default Index

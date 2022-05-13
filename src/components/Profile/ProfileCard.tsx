import { EditOutlined, MailOutlined, ProfileOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tooltip } from 'antd'
import Gravatar from 'components/Gravatar'
import { useAuth } from 'models'
import type React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VERTICAL_GUTTER } from 'utils/constants'

const Index: React.FC = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	return (
		<Row align='middle' justify='center' gutter={VERTICAL_GUTTER}>
			<Col span={24}>
				<Row justify='center'>
					<Tooltip title='Change your avatar' placement='bottom'>
						<Link to='/preference/account'>
							<Gravatar gravatar={auth.user?.gravatar} size={200} />
						</Link>
					</Tooltip>
				</Row>
			</Col>

			<Col span={24}>
				<Row align='middle'>
					<Col span={24}>
						<span className='text-2xl font-semibold'>
							{auth.user?.realName ?? auth.user?.username}
						</span>
					</Col>
					<Col span={24}>
						<span className='text-lg text-gray-400'>{auth.user?.username}</span>
					</Col>
				</Row>
			</Col>

			<Col span={24}>
				<Button
					block
					icon={<EditOutlined />}
					onClick={(): void => {
						navigate('/preference/account')
					}}
				>
					Edit Profile
				</Button>
			</Col>

			{auth.user?.email ? (
				<Col span={24}>
					<Row align='middle' gutter={8}>
						<Col>
							<MailOutlined className='text-sm' />
						</Col>
						<Col>
							<span className='text-sm'>{auth.user.email}</span>
						</Col>
					</Row>
				</Col>
			) : null}

			{auth.user?.studentId ? (
				<Col span={24}>
					<Row align='middle' gutter={8}>
						<Col>
							<ProfileOutlined className='text-sm' />
						</Col>
						<Col>
							<span className='text-sm'>{auth.user.studentId}</span>
						</Col>
					</Row>
				</Col>
			) : null}
		</Row>
	)
}

export default Index

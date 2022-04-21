import { Col, Row } from 'antd'
import type React from 'react'
import { VERTICAL_GUTTER } from 'utils/constants'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'

const Index: React.FC = () => (
	<Row gutter={VERTICAL_GUTTER}>
		<Col span={24}>
			<EditProfile />
		</Col>
		<Col span={24}>
			<ChangePassword />
		</Col>
	</Row>
)

export default Index

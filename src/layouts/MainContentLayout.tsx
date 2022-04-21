import { Col, Row } from 'antd'
import type React from 'react'
import { MAIN_CONTENT_GRID } from 'utils/constants'

const Index: React.FC<{ className?: string }> = ({ children, className }) => (
	<Row justify='center' className={className}>
		<Col {...MAIN_CONTENT_GRID}>{children}</Col>
	</Row>
)

export default Index

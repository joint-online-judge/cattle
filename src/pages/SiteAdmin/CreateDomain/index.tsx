import { Col, Row } from 'antd'
import UpsertDomainForm from 'components/Domain/UpsertDomainForm'
import type React from 'react'

const Index: React.FC = () => (
	/* Todo: add helper */
	/* todo: add onChange on URL/ID field to ensure unique field */
	<Row>
		<Col>
			<UpsertDomainForm />
		</Col>
	</Row>
)

export default Index

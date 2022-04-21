import { Result } from 'antd'
import type React from 'react'

const Index: React.FC = () => (
	<Result
		status='error'
		title='Load Data Failed'
		subTitle='Please refresh the page.'
	/>
)

export default Index

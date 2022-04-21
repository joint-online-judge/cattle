import type { CardProps } from 'antd'
import { Card } from 'antd'
import { merge } from 'lodash-es'
import type React from 'react'

const Index: React.FC<CardProps> = props => {
	const { children, ...otherProps } = props

	return (
		<Card
			bordered={false}
			{...merge(otherProps, {
				className: otherProps.className
					? `shadow-md ${otherProps.className}`
					: 'shadow-md'
			})}
		>
			{children}
		</Card>
	)
}

export default Index

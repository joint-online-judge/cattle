import type { MenuProps } from 'antd'
import ShadowCard from 'components/ShadowCard'
import React from 'react'
import './style.less'

export interface IProps extends MenuProps {
	children: React.ReactElement<MenuProps>
}

const Index: React.FC<IProps> = ({ children, ...otherProps }) => (
	<ShadowCard
		bodyStyle={{ padding: 0 }}
		style={{ overflow: 'hidden' }}
		className='settings-side-bar'
	>
		{React.cloneElement<MenuProps>(children, { ...otherProps })}
	</ShadowCard>
)

export default Index

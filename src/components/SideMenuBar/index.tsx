import type { MenuProps } from 'antd'
import ShadowCard from 'components/ShadowCard'
import React from 'react'

export interface IProps extends MenuProps {
  children: React.ReactElement<MenuProps>
}

const Index: React.FC<IProps> = ({ children, ...otherProps }) => (
  <ShadowCard
    bodyStyle={{ padding: 0 }}
    style={{ overflow: 'hidden' }}
    className='w-full'
  >
    {React.cloneElement<MenuProps>(children, { ...otherProps })}
  </ShadowCard>
)

export default Index

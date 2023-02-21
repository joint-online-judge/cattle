import { Col, Row } from 'antd'
import React from 'react'
import { DEFAULT_GUTTER } from 'utils/constants'

interface IProperties {
  children: React.ReactNode | React.ReactNode[]
  extra: React.ReactNode | React.ReactNode[] // Extra component on the side
  position?: 'left' | 'right' // On left or right side extra component will be placed
}

const Index: React.FC<IProperties> = ({ children, extra, position }) => {
  const childrenOrder = position && position === 'left' ? 1 : 0
  return (
    <Row gutter={DEFAULT_GUTTER}>
      <Col xs={24} sm={24} md={16} xl={16} xxl={18} order={childrenOrder}>
        <Row gutter={DEFAULT_GUTTER}>
          {React.Children.map(children, (c, index) => (
            <Col span={24} key={`main-${index}`}>
              {c}
            </Col>
          ))}
        </Row>
      </Col>
      <Col xs={24} sm={24} md={8} xl={8} xxl={6}>
        <Row gutter={DEFAULT_GUTTER}>
          {React.Children.map(extra, (c, index) => (
            <Col span={24} key={`extra-${index}`}>
              {c}
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Index

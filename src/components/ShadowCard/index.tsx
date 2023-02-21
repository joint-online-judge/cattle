import type { CardProps } from 'antd'
import { Card } from 'antd'
import { merge } from 'lodash-es'
import type React from 'react'
import { useMemo } from 'react'

const Index: React.FC<CardProps & { noPadding?: boolean }> = props => {
  const { children, noPadding = false, ...otherProps } = props

  const fullClassName: string = useMemo(() => {
    let cls = 'shadow-md overflow-hidden'
    if (otherProps.className) cls = `${cls} ${otherProps.className}`
    return cls
  }, [otherProps.className])

  return (
    <Card
      bordered={false}
      {...merge(otherProps, {
        className: fullClassName,
        bodyStyle: noPadding ? { padding: 0 } : undefined
      })}
    >
      {children}
    </Card>
  )
}

export default Index

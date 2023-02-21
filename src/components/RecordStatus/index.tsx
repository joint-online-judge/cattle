import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { Space } from 'antd'
import type React from 'react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { RecordState } from 'utils/service'

interface IProps {
  record?: {
    id: string
    state?: RecordState
    createdAt?: string
  }
  domainUrl?: string
  size?: 'default' | 'large' | 'small'
}

interface StatusConfig {
  text: string
  color: string
  icon: ReactElement
}

const RecordStatusConfig: Record<RecordState, StatusConfig> = {
  [RecordState.Processing]: {
    text: 'Processing',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordState.Queueing]: {
    text: 'Queueing',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordState.Retrying]: {
    text: 'Retrying',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordState.Fetched]: {
    text: 'Fetched',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordState.Compiling]: {
    text: 'Compiling',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordState.Running]: {
    text: 'Running',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordState.Judging]: {
    text: 'Judging',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordState.Accepted]: {
    text: 'Accepted',
    color: '#25ad40',
    icon: <CheckOutlined />
  },
  [RecordState.Rejected]: {
    text: 'Rejected',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordState.Failed]: {
    text: 'Failed',
    color: '#fb5555',
    icon: <CloseOutlined />
  }
}

const Index: React.FC<IProps> = ({ record, domainUrl, size = 'default' }) => {
  const fontClass = {
    small: 'text-sm',
    large: 'text-lg',
    default: undefined
  }
  const className = fontClass[size]
  if (!record) return <div className={className}>N/A</div>

  const config = record.state ? RecordStatusConfig[record.state] : undefined
  const url = domainUrl ? `/domain/${domainUrl}/record/${record.id}` : record.id

  if (!config)
    return (
      <Link
        target='_blank'
        rel='noopener noreferrer'
        to={url}
        className={className}
      >
        {record.state}
      </Link>
    )

  return (
    <Link
      target='_blank'
      rel='noopener noreferrer'
      to={url}
      style={{ color: config.color }}
    >
      <Space className={className}>
        {config.icon}
        {config.text}
      </Space>
    </Link>
  )
}

export default Index

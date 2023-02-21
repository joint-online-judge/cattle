import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { Space } from 'antd'
import type React from 'react'
import type { ReactElement } from 'react'
import { RecordCaseResult } from 'utils/service'

interface IProps {
  caseResult: RecordCaseResult | undefined
}

interface StatusConfig {
  text: string
  color: string
  icon: ReactElement
}

const RecordCaseStatusConfig: Record<RecordCaseResult, StatusConfig> = {
  [RecordCaseResult.Accepted]: {
    text: 'Accepted',
    color: '#25ad40',
    icon: <CheckOutlined />
  },
  [RecordCaseResult.WrongAnswer]: {
    text: 'WA',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordCaseResult.TimeLimitExceeded]: {
    text: 'Time Limit Exceeded',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordCaseResult.MemoryLimitExceeded]: {
    text: 'Memory Limit Exceeded',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordCaseResult.OutputLimitExceeded]: {
    text: 'Output Limit Exceeded',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordCaseResult.RuntimeError]: {
    text: 'Runtime Error',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordCaseResult.CompileError]: {
    text: 'Compile Error',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordCaseResult.SystemError]: {
    text: 'System Error',
    color: '#fb5555',
    icon: <CloseOutlined />
  },
  [RecordCaseResult.Canceled]: {
    text: 'Cancelled',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  },
  [RecordCaseResult.Etc]: {
    text: 'ETC',
    color: '#8c8c8c',
    icon: <ClockCircleOutlined />
  }
}

const Index: React.FC<IProps> = ({ caseResult }) => {
  const config = caseResult ? RecordCaseStatusConfig[caseResult] : undefined

  if (!config) return <span>{caseResult}</span>

  return (
    <Space style={{ color: config.color }}>
      {config.icon}
      {config.text}
    </Space>
  )
}

export default Index

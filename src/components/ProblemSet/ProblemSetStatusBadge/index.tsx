import { Badge, Tooltip } from 'antd'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { ProblemSetStatus } from 'types'
import { getProblemSetStatus } from '../utils'

interface IProps {
  unlockAt?: string
  dueAt?: string
  lockAt?: string
}

const Index: React.FC<IProps> = ({ unlockAt, dueAt, lockAt }) => {
  const { t } = useTranslation()
  const status = getProblemSetStatus(unlockAt, dueAt, lockAt)

  if (status === ProblemSetStatus.Unstarted) {
    return (
      <Tooltip title={t('problemSet.tooltip.notStarted')}>
        <Badge status='default' text={t('problemSet.status.notStarted')} />
      </Tooltip>
    )
  }

  if (status === ProblemSetStatus.Locked) {
    return (
      <Tooltip title={t('problemSet.tooltip.ended')}>
        <Badge status='error' text={t('problemSet.status.ended')} />
      </Tooltip>
    )
  }

  if (status === ProblemSetStatus.Overdue) {
    return (
      <Tooltip title={t('problemSet.tooltip.overdue')}>
        <Badge status='warning' text={t('problemSet.status.overdue')} />
      </Tooltip>
    )
  }

  return <Badge status='processing' text={t('problemSet.status.ongoing')} />
}

export default Index

import { Badge } from 'antd'
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
		return <Badge status='default' text={t('problemSet.status.notStarted')} />
	}

	if (status === ProblemSetStatus.Locked) {
		return <Badge status='error' text={t('problemSet.status.ended')} />
	}

	if (status === ProblemSetStatus.Overdue) {
		return <Badge status='warning' text={t('problemSet.status.overdue')} />
	}

	return <Badge status='processing' text={t('problemSet.status.ongoing')} />
}

export default Index

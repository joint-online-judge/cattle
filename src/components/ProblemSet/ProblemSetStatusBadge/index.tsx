import { Badge } from 'antd'
import { t } from 'i18next'
import type React from 'react'

interface IProps {
	unlockAt?: string
	dueAt?: string
	lockAt?: string
}

const Index: React.FC<IProps> = ({
	unlockAt: unlockAtObj,
	dueAt: dueAtObj,
	lockAt: lockAtObj
}) => {
	const now = Date.now()
	const unlockAt = unlockAtObj ? new Date(unlockAtObj).getTime() : undefined
	const dueAt = dueAtObj ? new Date(dueAtObj).getTime() : undefined
	const lockAt = lockAtObj ? new Date(lockAtObj).getTime() : undefined

	if (unlockAt && now < unlockAt) {
		return <Badge status='default' text={t('problemSet.status.notStarted')} />
	}

	if (lockAt && now > lockAt) {
		return <Badge status='error' text={t('problemSet.status.ended')} />
	}

	if (dueAt && now > dueAt) {
		return <Badge status='warning' text={t('problemSet.status.overdue')} />
	}

	return <Badge status='processing' text={t('problemSet.status.ongoing')} />
}

export default Index

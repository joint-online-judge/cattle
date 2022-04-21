import {
	CodeOutlined,
	EditOutlined,
	EyeOutlined,
	SettingOutlined,
	TrophyOutlined
} from '@ant-design/icons'
import { Menu, Progress } from 'antd'
import ShadowCard from 'components/ShadowCard'
import SideMenuPage from 'components/SideMenuPage'
import { useDomain, usePageHeader, useProblemSet } from 'models'
import mm from 'moment'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemSetIdError } from 'utils/exception'
import AfterDue from './AfterDue'
import BeforeAvailable from './BeforeAvailable'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { setHeader } = usePageHeader()
	const { domain } = useDomain()
	const { problemSet, fetchProblemSet, loading } = useProblemSet()
	const { domainUrl, problemSetId } =
		useParams<{ domainUrl: string; problemSetId: string }>()
	const [status, setStatus] = useState<
		'LOCKED' | 'NOT_STARTED' | 'ONGOING' | 'OVERDUE'
	>('ONGOING')

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	if (!problemSetId) {
		throw new NoProblemSetIdError()
	}

	const acRate: number = useMemo(() => {
		if (
			typeof problemSet?.numSubmit === 'number' &&
			typeof problemSet.numAccept === 'number' &&
			problemSet.numSubmit > 0
		) {
			return Math.ceil(problemSet.numAccept / problemSet.numSubmit)
		}

		return 0
	}, [problemSet])

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? 'unknown'
			},
			{
				path: 'problem-set',
				breadcrumbI18nKey: 'PROBLEM_SET.PROBLEM_SET'
			},
			{
				path: problemSetId
			}
		],
		[domainUrl, domain?.name, problemSetId]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			title: problemSet?.title
		})
	}, [breads, setHeader, problemSet?.title])

	useEffect(() => {
		fetchProblemSet(domainUrl, problemSetId)
		return () => {
			fetchProblemSet(null, null)
		}
	}, [domainUrl, problemSetId, fetchProblemSet])

	useEffect(() => {
		const now = mm()
		if (problemSet?.unlockAt) {
			const unlockTime = mm(problemSet.unlockAt)
			if (now.isBefore(unlockTime)) {
				setStatus('NOT_STARTED')
				return
			}
		}

		if (problemSet?.lockAt) {
			const lockTime = mm(problemSet.lockAt)
			if (now.isAfter(lockTime)) {
				setStatus('LOCKED')
				return
			}
		}

		if (problemSet?.dueAt) {
			const dueTime = mm(problemSet.dueAt)
			if (now.isAfter(dueTime)) {
				setStatus('OVERDUE')
				return
			}
		}

		setStatus('ONGOING')
	}, [problemSet])

	if (status === 'NOT_STARTED') {
		return <BeforeAvailable />
	}

	if (status === 'LOCKED') {
		return <AfterDue />
	}

	if (status === 'OVERDUE') {
		return <AfterDue />
	}

	return (
		<SideMenuPage
			shadowCard={false}
			defaultTab='detail'
			menu={
				<Menu mode='inline'>
					<Menu.Item key='detail' icon={<EyeOutlined />}>
						{t('ProblemSetDetail.menu.detail')}
					</Menu.Item>
					<Menu.Item key='scoreboard' icon={<TrophyOutlined />}>
						{t('ProblemSetDetail.menu.scoreboard')}
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key='system-test' icon={<CodeOutlined />}>
						{t('ProblemSetDetail.menu.systemTest')}
					</Menu.Item>
					<Menu.Item key='edit' icon={<EditOutlined />}>
						{t('ProblemSetDetail.menu.edit')}
					</Menu.Item>
					<Menu.Item key='settings' icon={<SettingOutlined />}>
						{t('ProblemSetDetail.menu.settings')}
					</Menu.Item>
				</Menu>
			}
			extra={
				<ShadowCard loading={loading}>
					<dl className='m-0'>
						<dt>Status</dt>
						<dd>Finished</dd>
						<dt>Due At</dt>
						<dd>
							{problemSet?.dueAt
								? mm(problemSet.dueAt).format('YYYY-MM-DD HH:mm:ss')
								: 'Never'}
						</dd>
						<dt>Lock At</dt>
						<dd>
							{problemSet?.lockAt
								? mm(problemSet.lockAt).format('YYYY-MM-DD HH:mm:ss')
								: 'Never'}
						</dd>
						<dt>Accept Rate</dt>
						<dd>
							<Progress
								type='dashboard'
								width={80}
								success={{ percent: acRate }}
								format={(): string => `${acRate}%`}
								style={{ marginTop: 12 }}
							/>
						</dd>
					</dl>
				</ShadowCard>
			}
		>
			<Outlet />
		</SideMenuPage>
	)
}

export default Index

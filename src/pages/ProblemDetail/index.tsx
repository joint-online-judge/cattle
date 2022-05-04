import {
	CodeOutlined,
	EditOutlined,
	ReadOutlined,
	SettingOutlined
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Menu, message, Space } from 'antd'
import Gravatar from 'components/Gravatar'
import ShadowCard from 'components/ShadowCard'
import SideMenuPage from 'components/SideMenuPage'
import { useDomain, usePageHeader } from 'models'
import type React from 'react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import Horse, { ErrorCode } from 'utils/service'
import { ProblemContext } from './context'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { domain } = useDomain()
	const { setHeader } = usePageHeader()
	const { domainUrl, problemId } =
		useParams<{ domainUrl: string; problemId: string }>()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	if (!problemId) {
		throw new NoProblemIdError()
	}

	const {
		data: problemResp,
		refresh,
		loading: fetchingProblem
	} = useRequest(
		async () => {
			const res = await Horse.problem.v1GetProblem(domainUrl, problemId)
			return res.data
		},
		{
			refreshDeps: [domainUrl, problemId],
			onSuccess: res => {
				if (res.errorCode !== ErrorCode.Success) {
					message.error('get problem fail')
				}
			},
			onError: () => {
				message.error('get problem fail')
			}
		}
	)

	const { data: owner, loading: fetchingOwner } = useRequest(
		async () => {
			const res = await Horse.user.v1GetUser(problemResp?.data?.ownerId ?? '')
			return res.data.data
		},
		{
			ready: Boolean(problemResp?.data?.ownerId),
			onError: () => {
				message.error('get owner failed')
			}
		}
	)

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? 'unknown'
			},
			{
				path: 'problem',
				breadcrumbI18nKey: 'problem.problems'
			},
			{
				path: 'null'
			}
		],
		[domainUrl, domain]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			title: problemResp?.data?.title
		})
	}, [breads, setHeader, problemResp])

	const problemContextValue = useMemo(
		() => ({
			problem: problemResp?.data,
			loading: fetchingProblem,
			refresh
		}),
		[problemResp?.data, fetchingProblem, refresh]
	)

	return (
		<ProblemContext.Provider value={problemContextValue}>
			<SideMenuPage
				defaultTab='detail'
				shadowCard={false}
				menu={
					<Menu mode='inline'>
						<Menu.Item key='detail' icon={<ReadOutlined />}>
							{t('PROBLEM.HOME')}
						</Menu.Item>
						<Menu.Item key='submit' icon={<CodeOutlined />}>
							{t('PROBLEM.SUBMIT_CODE')}
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item key='edit' icon={<EditOutlined />}>
							{t('PROBLEM.EDIT')}
						</Menu.Item>
						<Menu.Item key='settings' icon={<SettingOutlined />}>
							{t('PROBLEM.SETTINGS')}
						</Menu.Item>
					</Menu>
				}
				extra={
					<ShadowCard loading={fetchingProblem || fetchingOwner}>
						<dl className='m-0'>
							<dt>{t('PROBLEM.STATUS')}</dt>
							<dd>{problemResp?.data?.latestRecord?.state}</dd>
							<dt>{t('PROBLEM.PROBLEM_GROUP')}</dt>
							<dd>不知道</dd>
							<dt>{t('PROBLEM.OWNER')}</dt>
							<dd>
								<Space>
									<Gravatar size={20} gravatar={owner?.gravatar} />
									<span>{owner?.username}</span>
								</Space>
							</dd>
							<dt>Accept Rate</dt>
							<dd>100%</dd>
						</dl>
					</ShadowCard>
				}
			>
				<Outlet />
			</SideMenuPage>
		</ProblemContext.Provider>
	)
}

export default Index

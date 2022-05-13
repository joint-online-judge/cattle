import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Head from 'components/Head'
import { ProblemSetList } from 'components/ProblemSet'
import ShadowCard from 'components/ShadowCard'
import { useAccess, useDomain } from 'models'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'
import './style.less'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const { domain } = useDomain()
	const access = useAccess()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	return (
		<>
			<Head title={domain?.name ?? 'Domain Home'} />
			<ShadowCard
				className='domain-home-problem-set-card'
				title={t('DomainHome.problemSet')}
				extra={
					access.canCreateProblemSet ? (
						<Button
							icon={<PlusOutlined />}
							onClick={(): void => {
								navigate(`/domain/${domainUrl}/create-problem-set`)
							}}
							type='primary'
						>
							{t('DomainHome.createProblemSet')}
						</Button>
					) : null
				}
				bodyStyle={{ padding: 0 }}
			>
				<ProblemSetList domainUrl={domainUrl} />
			</ShadowCard>
		</>
	)
}

export default Index

import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import ProblemSetList from 'components/ProblemSetList'
import ShadowCard from 'components/ShadowCard'
import { useAccess, usePageHeader } from 'models'
import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import './style.less'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const { removeHeader } = usePageHeader()
	const access = useAccess()

	useEffect(() => {
		removeHeader()
	}, [removeHeader])

	if (!domainUrl) {
		// Shall be unreachable under normal conditions
		throw new Error('No domainUrl found')
	}

	return (
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
	)
}

export default Index

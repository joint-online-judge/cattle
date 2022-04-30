import { UpsertProblemSetForm } from 'components/ProblemSet'
import SidePage from 'components/SidePage'
import { useDomain, usePageHeader } from 'models'
import type React from 'react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'

const Index: React.FC = () => {
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const { domain } = useDomain()
	const { setHeader } = usePageHeader()
	const { t } = useTranslation()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? ''
			},
			{
				path: 'create-problem-set'
			}
		],
		[domainUrl, domain?.name]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			title: t('CreateProblemSet.title')
		})
	}, [breads, setHeader, t])

	return (
		<SidePage extra={<h1>Side</h1>}>
			<UpsertProblemSetForm
				domainUrl={domainUrl}
				initialValues={{
					hidden: true,
					scoreboardHidden: true
				}}
			/>
		</SidePage>
	)
}

export default Index

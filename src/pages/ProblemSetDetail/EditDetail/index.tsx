import { UpsertProblemSetForm } from 'components/ProblemSet'
import ShadowCard from 'components/ShadowCard'
import { useProblemSet } from 'models'
import type React from 'react'
import { useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'

const ProblemSetEditDetail: React.FC = () => {
	const { problemSet, refresh, loading } = useProblemSet()
	const { domainUrl } = useParams<{ domainUrl: string }>()

	if (!domainUrl) {
		throw new NoDomainUrlError()
	}

	return (
		<ShadowCard loading={loading}>
			<UpsertProblemSetForm
				domainUrl={domainUrl}
				initialValues={problemSet}
				onUpdateSuccess={refresh}
			/>
		</ShadowCard>
	)
}

export default ProblemSetEditDetail

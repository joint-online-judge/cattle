import { Empty } from 'antd'
import MarkdownRender from 'components/MarkdownRender'
import ShadowCard from 'components/ShadowCard'
import { t } from 'i18next'
import { useProblem } from 'models'
import type React from 'react'

const Index: React.FC = () => {
	const problemContext = useProblem()

	return (
		<ShadowCard title={t('ProblemDetail.introduction')}>
			{problemContext.problem?.content ? (
				<MarkdownRender>
					{problemContext.problem.content || t('ProblemDetail.noDescription')}
				</MarkdownRender>
			) : (
				<Empty description={<span>{t('ProblemDetail.noDescription')}</span>} />
			)}
		</ShadowCard>
	)
}

export default Index

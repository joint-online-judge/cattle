import { Col, Row, Spin, Typography } from 'antd'
import MarkdownRender from 'components/MarkdownRender'
import ShadowCard from 'components/ShadowCard'
import { useProblemSet } from 'models'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { VERTICAL_GUTTER } from 'utils/constants'
import ProblemList from '../ProblemList'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { problemSet, loading } = useProblemSet()

	return (
		<Row gutter={VERTICAL_GUTTER}>
			{problemSet?.content ? (
				<Col span={24}>
					<ShadowCard
						loading={loading}
						title={t('ProblemSetDetail.introduction')}
					>
						<Spin spinning={!problemSet}>
							<Typography>
								<MarkdownRender>{problemSet.content}</MarkdownRender>
							</Typography>
						</Spin>
					</ShadowCard>
				</Col>
			) : null}

			<Col span={24}>
				<ShadowCard
					loading={loading}
					title={t('ProblemSetDetail.problem')}
					bodyStyle={
						problemSet?.problems && problemSet.problems.length > 0
							? {
									padding: 0
							  }
							: undefined
					}
				>
					<ProblemList problems={problemSet?.problems} />
				</ShadowCard>
			</Col>
		</Row>
	)
}

export default Index

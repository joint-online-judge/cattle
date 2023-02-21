import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { ProblemSetList } from 'components/ProblemSet'
import ShadowCard from 'components/ShadowCard'
import { t } from 'i18next'
import { useAccess } from 'models'
import type React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NoDomainUrlError } from 'utils/exception'

const Index: React.FC = () => {
  const access = useAccess()
  const navigate = useNavigate()
  const { domainUrl } = useParams<{ domainUrl: string }>()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  return (
    <Row>
      <Col span={24}>
        <ShadowCard
          className='pb-6'
          title={t('ProblemSetList.problemSet')}
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
          noPadding
        >
          <ProblemSetList domainUrl={domainUrl} />
        </ShadowCard>
      </Col>
    </Row>
  )
}

export default Index

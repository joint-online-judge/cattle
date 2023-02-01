import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Skeleton } from 'antd'
import Gravatar from 'components/Gravatar'
import Head from 'components/Head'
import MarkdownRender from 'components/MarkdownRender'
import { ProblemSetList } from 'components/ProblemSet'
import ShadowCard from 'components/ShadowCard'
import { useAccess, useDomain } from 'models'
import type React from 'react'
import { ReactElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { VERTICAL_GUTTER } from 'utils/constants'
import { NoDomainUrlError } from 'utils/exception'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { domainUrl } = useParams<{ domainUrl: string }>()
  const { domain, loading } = useDomain()
  const access = useAccess()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  const domainInfo: ReactElement | null = useMemo(() => {
    if (loading) {
      return <Skeleton paragraph={{ rows: 1 }} active />
    }

    if (domain) {
      return (
        <div>
          <Row justify='start'>
            <Col>
              <Gravatar gravatar={domain.gravatar} size={36} />
            </Col>
            <Col>
              <h1 className='m-0 ml-2 text-2xl font-medium text-black'>
                {domain.name}
              </h1>
            </Col>
            {/* TODO: @owner badge */}
          </Row>
          {domain.bulletin ? (
            <>
              <Divider>Bulletin</Divider>
              <Row>
                <Col span={24}>
                  <MarkdownRender>{domain.bulletin}</MarkdownRender>
                </Col>
              </Row>
            </>
          ) : null}
        </div>
      )
    }

    return null
  }, [domain, loading])

  return (
    <>
      <Head title={domain?.name ?? 'Domain Home'} />
      <Row align='middle' justify='center' gutter={VERTICAL_GUTTER}>
        <Col span={24}>
          <ShadowCard>{domainInfo}</ShadowCard>
        </Col>
        <Col span={24}>
          <ShadowCard
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
            <ProblemSetList domainUrl={domainUrl} recent={5} />
          </ShadowCard>
        </Col>
      </Row>
    </>
  )
}

export default Index

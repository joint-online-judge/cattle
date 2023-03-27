import { PlusOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { useRequest } from 'ahooks'
import { Button, Col, message, Row } from 'antd'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import type { ProTablePagination } from 'types'
import { transPagination } from 'utils'
import { DEFAULT_GUTTER } from 'utils/constants'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import Horse from 'utils/service'
import AddExistProblem from './AddExistProblem'
import DraggableProblemTable from './DraggableProblemTable'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const [tab, setTab] = useState('tab1')
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>()
  const navigate = useNavigate()
  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!problemSetId) {
    throw new NoProblemIdError()
  }

  const {
    data: problemSet,
    refresh: refreshProblemSet,
    loading: fetchingProblemSet
  } = useRequest(
    async () => {
      const res = await Horse.problemSet.v1GetProblemSet(
        domainUrl,
        problemSetId
      )
      return res.data.data
    },
    {
      onError: () => {
        message.error('failed to fetch domain info')
      }
    }
  )

  const {
    runAsync: fetchProblems,
    refresh: refreshProblems,
    loading: fetchingProblems
  } = useRequest(
    async (parameters: ProTablePagination) => {
      const res = await Horse.problem.v1ListProblems(domainUrl, {
        ...transPagination(parameters),
        ordering: '-created_at'
      })
      return res.data.data ?? { count: 0, results: [] }
    },
    {
      manual: true
    }
  )
  const createNewProblem = (
    <div className='mx-8 space-x-4'>
      <Button
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(`/domain/${domainUrl}/create-problem`)
        }}
        type='primary'
      >
        {t('ProblemList.create')}
      </Button>
    </div>
  )
  return (
    <Row gutter={DEFAULT_GUTTER}>
      <Col span={24}>
        <ShadowCard noPadding>
          <ProCard split='vertical'>
            <ProCard
              title='Problem List'
              colSpan='30%'
              bodyStyle={{ padding: 16 }}
            >
              <DraggableProblemTable
                domainUrl={domainUrl}
                problemSetId={problemSetId}
                problems={problemSet?.problems ?? []}
                loading={fetchingProblemSet}
                onDeleteSuccess={() => {
                  refreshProblemSet()
                  refreshProblems()
                }}
                onUpdateFinish={() => refreshProblemSet()}
              />
            </ProCard>
            <ProCard
              tabs={{
                activeKey: tab,
                onChange: setTab,
                animated: { inkBar: true, tabPane: true },
                tabBarExtraContent: createNewProblem
              }}
            >
              <ProCard.TabPane key='tab1' tab='Add Existed'>
                <AddExistProblem
                  fetchingProblems={fetchingProblems}
                  onAddSuccess={refreshProblemSet}
                  fetchProblems={fetchProblems}
                  problemIdList={problemSet?.problems?.map(p => p.id) ?? []}
                />
              </ProCard.TabPane>
              <ProCard.TabPane key='tab2' tab='Clone'>
                TODO: Clone
              </ProCard.TabPane>
            </ProCard>
          </ProCard>
        </ShadowCard>
      </Col>
    </Row>
  )
}

export default Index

import { useRequest } from 'ahooks'
import { Col, Row } from 'antd'
import ShadowCard from 'components/ShadowCard'
import { useMessage } from 'hooks'
import type React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DEFAULT_GUTTER } from 'utils/constants'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'
import Horse from 'utils/service'
import Config from './Config'
import Dataset from './Dataset'
import Overview from './Overview'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>()
  const msg = useMessage()
  const [tabKey, setTabKey] = useState('dataset')

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!problemId) {
    throw new NoProblemIdError()
  }

  const configRequest = useRequest(
    async () => {
      const res = await Horse.problemConfig.v1GetProblemConfigJson(
        domainUrl,
        'latest',
        problemId
      )
      return res.data
    },
    {
      onError: () => {
        msg.error.fetch() // TODO
      }
    }
  )

  const historyRequest = useRequest(
    async () => {
      const res = await Horse.problemConfig.v1ListProblemConfigCommits(
        domainUrl,
        problemId,
        {
          ordering: '-created_at',
          limit: 5
        }
      )
      return res.data
    },
    {
      onError: () => {
        msg.error.fetch() // TODO
      }
    }
  )

  const listObjectsRequest = useRequest(
    async () => {
      const res =
        await Horse.problemConfig.v1ListLatestProblemConfigObjectsUnderAGivenPrefix(
          domainUrl,
          problemId,
          {
            delimiter: '/',
            amount: 100
          }
        )
      return res.data
    },
    {
      onError: () => {
        msg.error.fetch(t('CommittedFileTree.fileList'))
      }
    }
  )

  const tabList = useMemo(
    () => [
      {
        key: 'dataset',
        tab: t('ProblemDetail.Settings.dataset')
      },
      {
        key: 'config',
        tab: t('ProblemDetail.Settings.config')
      }
    ],
    [t]
  )

  const refresh = useCallback(() => {
    configRequest.refresh()
    historyRequest.refresh()
    listObjectsRequest.refresh()
  }, [configRequest, historyRequest, listObjectsRequest])

  const mainContent = useMemo(() => {
    if (tabKey === 'dataset')
      return (
        <Dataset refresh={refresh} listObjectsRequest={listObjectsRequest} />
      )
    return <Config refresh={refresh} configRequest={configRequest} />
  }, [tabKey, refresh, listObjectsRequest, configRequest])

  return (
    <Row gutter={DEFAULT_GUTTER}>
      <Col span={24}>
        <Overview
          domainUrl={domainUrl}
          problemId={problemId}
          configRequest={configRequest}
          historyRequest={historyRequest}
        />
      </Col>
      <Col span={24}>
        <ShadowCard
          activeTabKey={tabKey}
          tabList={tabList}
          onTabChange={key => {
            setTabKey(key)
          }}
        >
          {mainContent}
        </ShadowCard>
      </Col>
    </Row>
  )
}

export default Index

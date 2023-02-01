import {
  CodeOutlined,
  EditOutlined,
  ReadOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import RecordStatus from 'components/RecordStatus'
import ShadowCard from 'components/ShadowCard'
import SideMenuPage from 'components/SideMenuPage'
import { useProblem } from 'models'
import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import { NoDomainUrlError, NoProblemIdError } from 'utils/exception'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const { problem, fetchProblem, loading: fetchingProblem } = useProblem()
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!problemId) {
    throw new NoProblemIdError()
  }

  useEffect(() => {
    fetchProblem(domainUrl, problemId)
    return () => {
      fetchProblem(null, null)
    }
  }, [domainUrl, problemId, fetchProblem])

  // const { data: owner, loading: fetchingOwner } = useRequest(
  //   async () => {
  //     const res = await Horse.user.v1GetUser(problem?.ownerId ?? '')
  //     return res.data.data
  //   },
  //   {
  //     ready: Boolean(problem?.ownerId),
  //     onError: () => {
  //       message.error('get owner failed')
  //     }
  //   }
  // )

  return (
    <SideMenuPage
      defaultTab='detail'
      menu={
        <Menu mode='inline'>
          <Menu.Item key='detail' icon={<ReadOutlined />}>
            {t('ProblemDetail.menu.detail')}
          </Menu.Item>
          <Menu.Item key='submit' icon={<CodeOutlined />}>
            {t('ProblemDetail.menu.submit')}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key='edit' icon={<EditOutlined />}>
            {t('ProblemDetail.menu.edit')}
          </Menu.Item>
          <Menu.Item key='settings' icon={<SettingOutlined />}>
            {t('ProblemDetail.menu.settings')}
          </Menu.Item>
        </Menu>
      }
      extra={
        <ShadowCard loading={fetchingProblem}>
          <dl className='m-0'>
            <dt>{t('ProblemDetail.status')}</dt>
            <dd>
              {problem?.latestRecord ? (
                <RecordStatus
                  domainUrl={domainUrl}
                  record={problem.latestRecord}
                />
              ) : (
                '-'
              )}
            </dd>
            <dt>{t('ProblemDetail.problemGroup')}</dt>
            <dd>不知道</dd>
            {/* <dt>{t('ProblemDetail.owner')}</dt>
            <dd>
              <Space>
                <Gravatar size={20} gravatar={owner?.gravatar} />
                <span>{owner?.username}</span>
              </Space>
            </dd> */}
            <dt>Accept Rate</dt>
            <dd>100%</dd>
          </dl>
        </ShadowCard>
      }
    >
      <Outlet />
    </SideMenuPage>
  )
}

export default Index

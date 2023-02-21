import {
  CodeOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
  TrophyOutlined
} from '@ant-design/icons'
import { Progress, Tooltip } from 'antd'
import {
  getProblemSetStatus,
  ProblemSetStatusBadge
} from 'components/ProblemSet'
import ShadowCard from 'components/ShadowCard'
import SideMenuPage from 'components/SideMenuPage'
import UserBadge from 'components/UserBadge'
import dayjs from 'dayjs'
import { useProblemSet } from 'models'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'
import type { MenuItemsWithPermission } from 'types'
import { ProblemSetStatus } from 'types'
import { NoDomainUrlError, NoProblemSetIdError } from 'utils/exception'
import BeforeAvailable from './BeforeAvailable'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const { problemSet, fetchProblemSet, loading } = useProblemSet()
  const { domainUrl, problemSetId } =
    useParams<{ domainUrl: string; problemSetId: string }>()
  const [status, setStatus] = useState<ProblemSetStatus>(
    ProblemSetStatus.Ongoing
  )

  const menuItems: MenuItemsWithPermission = useMemo(
    () => [
      {
        key: 'detail',
        icon: <EyeOutlined />,
        label: t('ProblemSetDetail.menu.detail')
      },
      {
        key: 'scoreboard',
        icon: <TrophyOutlined />,
        label: t('ProblemSetDetail.menu.scoreboard')
      },
      {
        type: 'divider'
      },
      {
        key: 'system-test',
        icon: <CodeOutlined />,
        label: t('ProblemSetDetail.menu.systemTest')
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: t('ProblemSetDetail.menu.edit')
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: t('ProblemSetDetail.menu.settings')
      }
    ],
    [t]
  )

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  if (!problemSetId) {
    throw new NoProblemSetIdError()
  }

  const acRate: number = useMemo(() => {
    if (
      typeof problemSet?.numSubmit === 'number' &&
      typeof problemSet.numAccept === 'number' &&
      problemSet.numSubmit > 0
    ) {
      return Math.floor(problemSet.numAccept / problemSet.numSubmit)
    }

    return 0
  }, [problemSet])

  useEffect(() => {
    fetchProblemSet(domainUrl, problemSetId)
    return () => {
      fetchProblemSet(null, null)
    }
  }, [domainUrl, problemSetId, fetchProblemSet])

  useEffect(() => {
    setStatus(
      getProblemSetStatus(
        problemSet?.unlockAt,
        problemSet?.dueAt,
        problemSet?.lockAt
      )
    )
  }, [problemSet])

  if (status === ProblemSetStatus.Unstarted) {
    return <BeforeAvailable />
  }

  return (
    <SideMenuPage
      defaultTab='detail'
      menuItems={menuItems}
      extra={
        <ShadowCard loading={loading}>
          <dl className='m-0'>
            <dt>{t('ProblemSetDetail.status')}</dt>
            <dd>
              <ProblemSetStatusBadge
                unlockAt={problemSet?.unlockAt}
                dueAt={problemSet?.dueAt}
                lockAt={problemSet?.lockAt}
              />
            </dd>
            <Tooltip title={t('ProblemSetDetail.tooltip.dueAt')}>
              <dt>{t('ProblemSetDetail.dueAt')}</dt>
              <dd>
                {problemSet?.dueAt
                  ? dayjs(problemSet.dueAt).format('YYYY-MM-DD HH:mm:ss')
                  : t('ProblemSetDetail.never')}
              </dd>
            </Tooltip>
            <Tooltip title={t('ProblemSetDetail.tooltip.lockAt')}>
              <dt>{t('ProblemSetDetail.lockAt')}</dt>
              <dd>
                {problemSet?.lockAt
                  ? dayjs(problemSet.lockAt).format('YYYY-MM-DD HH:mm:ss')
                  : t('ProblemSetDetail.never')}
              </dd>
            </Tooltip>
            <dt>{t('ProblemSetDetail.owner')}</dt>
            <dd>
              {problemSet?.ownerId ? (
                <UserBadge userId={problemSet.ownerId} />
              ) : (
                'N/A'
              )}
            </dd>
            <dt>{t('ProblemSetDetail.acRate')}</dt>
            <dd>
              <Progress
                type='dashboard'
                width={80}
                success={{ percent: acRate }}
                format={(): string => `${acRate}%`}
                style={{ marginTop: 12 }}
              />
            </dd>
          </dl>
        </ShadowCard>
      }
    >
      <Outlet />
    </SideMenuPage>
  )
}

export default Index

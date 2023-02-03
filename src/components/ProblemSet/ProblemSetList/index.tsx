import { useRequest } from 'ahooks'
import { List, message, Skeleton } from 'antd'
import { ProblemSetStatusBadge } from 'components/ProblemSet'
import dayjs from 'dayjs'
import { t } from 'i18next'
import type React from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Horse from 'utils/service'

interface IProps {
  domainUrl: string
  recent?: number
}

const Index: React.FC<IProps> = ({ domainUrl, recent }) => {
  const { data: problemSets, loading } = useRequest(
    async () => {
      if (!domainUrl) {
        return []
      }

      if (recent) {
        const res = await Horse.problemSet.v1ListProblemSets(domainUrl, {
          ordering: '-created_at',
          limit: recent
        })
        return res.data.data?.results ?? []
      }
      const res = await Horse.problemSet.v1ListProblemSets(domainUrl, {
        ordering: '-created_at'
        // TODO: real pagination
      })
      return res.data.data?.results ?? []
    },
    {
      refreshDeps: [domainUrl],
      onError: () => {
        message.error('failed to fetch problem sets')
      }
    }
  )

  return (
    <List
      itemLayout='horizontal'
      size='large'
      loading={loading}
      dataSource={problemSets ?? []}
      pagination={
        recent
          ? undefined
          : {
              position: 'bottom',
              pageSize: 5
            }
      }
      renderItem={(item): ReactNode => (
        <List.Item
          actions={[
            <ProblemSetStatusBadge
              unlockAt={item.unlockAt}
              dueAt={item.dueAt}
              lockAt={item.lockAt}
              key='status'
            />
          ]}
        >
          <Skeleton title={false} loading={loading} active>
            <List.Item.Meta
              title={
                <Link to={`/domain/${domainUrl}/problem-set/${item.id}`}>
                  <h2 className='text-2xl font-light'>{item.title}</h2>
                </Link>
              }
              description={
                item.dueAt
                  ? dayjs(item.dueAt).format('YYYY-MM-DD HH:mm')
                  : t('ProblemSetList.noDueDate')
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default Index

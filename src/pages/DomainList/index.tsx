import { useRequest } from 'ahooks'
import { List, Skeleton } from 'antd'
import Head from 'components/Head'
import ShadowCard from 'components/ShadowCard'
import { useMessage } from 'hooks'
import type React from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Horse } from 'utils/service'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const msg = useMessage()

  const { data, loading } = useRequest(
    async () => {
      const res = await Horse.domain.v1ListDomains()
      return res.data.data?.results ?? []
    },
    {
      onError: () => {
        msg.error.fetch(t('domain'))
      }
    }
  )

  return (
    <>
      <Head title='Home' />
      <ShadowCard noPadding>
        <List
          loading={loading}
          itemLayout='horizontal'
          dataSource={data}
          size='large'
          renderItem={(item): ReactNode => (
            <List.Item
              actions={[
                <Link to={`/domain/${item.url ?? ''}`} key='visit'>
                  {t('DomainList.visit')}
                </Link>,
                <Link
                  to={`/domain/${item.url ?? ''}/settings/profile`}
                  key='manage'
                >
                  {t('DomainList.manage')}
                </Link>
              ]}
            >
              <Skeleton title={false} loading={loading} active>
                <List.Item.Meta
                  title={
                    <Link
                      to={`/domain/${item.url ?? item.id}`}
                      className='text-lg'
                    >
                      {item.name}
                    </Link>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </ShadowCard>
    </>
  )
}

export default Index

import React, { useEffect } from 'react';
import { Link, useIntl, useModel } from 'umi';
import { useRequest } from 'ahooks';
import { message, List, Skeleton } from 'antd';
import { Horse } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const intl = useIntl();
  const { setHeader } = useModel('pageHeader');

  useEffect(() => {
    setHeader({
      titleI18nKey: 'DOMAIN.DOMAINS',
    });
  }, [setHeader]);

  const { data, loading } = useRequest(
    async () => {
      const res = await Horse.domain.v1ListDomains();
      return res?.data?.data?.results ?? [];
    },
    {
      onError: () => {
        message.error(
          intl.formatMessage(
            { id: 'msg.error.fetch_item' },
            { data: intl.formatMessage({ id: 'domain' }) },
          ),
        );
      },
    },
  );

  return (
    <>
      <ShadowCard bodyStyle={{ padding: 0 }}>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={data}
          size="large"
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link to={`/domain/${item.url ?? ''}`} key="visit">
                  {intl.formatMessage({ id: 'VISIT' })}
                </Link>,
                <Link
                  to={`/domain/${item.url ?? ''}/settings/profile`}
                  key="manage"
                >
                  {intl.formatMessage({ id: 'MANAGE' })}
                </Link>,
              ]}
            >
              <Skeleton title={false} loading={loading} active>
                <List.Item.Meta
                  title={
                    <Link to={`/domain/${item.url ?? ''}`} className="text-lg">
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
  );
};

export default Index;

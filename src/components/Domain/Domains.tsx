import {
  Avatar,
  Button,
  List,
  PageHeader, Space,
  Spin,
  Typography,
  ConfigProvider,
} from 'antd';
import React, { useEffect } from 'react';
import { useIntl, Link } from 'umi';
import { useRequest } from 'ahooks';
import { DomainService } from '@/client';
import { gravatarImageUrl } from '@/utils';
import style from './style.css';

const { Text } = Typography;

const Index: React.FC = () => {
  const intl = useIntl();
  const { data, run } = useRequest(async () => {
    const res = await DomainService.listDomainsApiV1DomainsGet();
    return res.data?.results;
  }, { manual: true });

  useEffect(() => {
    (async () => {
      await run();
    })();
  }, []);

  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      <Spin spinning={!data}>
        <PageHeader
          title={intl.formatMessage({ id: 'DOMAIN.DOMAINS' })}
          className={style.domainsTitle}
          extra={[
            <Button key="domain-create">
              <Link to="/domain/create">
                {intl.formatMessage({ id: 'DOMAIN.NEW_DOMAIN' })}
              </Link>
            </Button>,
          ]}
        />
        <List
          itemLayout="horizontal"
          dataSource={data?.results || []}
          bordered
          split
          renderItem={(item) => (
            <List.Item
              className={style.domainListItem}
              actions={[
                <Button>
                  <Link to={`/domain/${item.url}/settings`}>
                    {intl.formatMessage({ id: 'DOMAIN.SETTINGS' })}
                  </Link>
                </Button>,
                <Button>
                  {intl.formatMessage({ id: 'DOMAIN.LEAVE' })}
                </Button>,
              ]}
            >
              <Space>
                <Avatar src={gravatarImageUrl(item.gravatar || '')} />
                <Link
                  to={`/domain/${item.url}`}
                >
                  <strong>{item.name}</strong>
                </Link>
                <Text type="secondary">
                  {item.name} Owner
                </Text>
              </Space>
            </List.Item>
          )}
        />
      </Spin>
    </ConfigProvider>
  );
};

export default Index;

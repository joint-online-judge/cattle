import { observer } from 'mobx-react';
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
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { DomainService } from '@/client';
import { gravatarImageUrl } from 'app/utils';
import style from './style.css';

const { Text } = Typography;
export const Domains = observer(() => {
  const { t } = useTranslation();
  const { data, run } = useRequest(async () => {
    return DomainService.listDomainsApiV1DomainsGet();
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
          title={t('DOMAIN.DOMAINS')}
          className={style.DomainsTitle}
          extra={[
            <Button key="domain-create">
              <Link to="/domain/create">
                {t('DOMAIN.NEW_DOMAIN')}
              </Link>
            </Button>,
          ]}
        />
        <List
          itemLayout="horizontal"
          dataSource={data}
          bordered
          split
          renderItem={(item) => (
            <List.Item
              className={style.DomainListItem}
              actions={[
                <Button>
                  <Link to={`/domain/${item.url}/settings`}>
                    {t('DOMAIN.SETTINGS')}
                  </Link>
                </Button>,
                <Button>
                  {t('DOMAIN.LEAVE')}
                </Button>,
              ]}
            >
              <Space>
                <Avatar src={gravatarImageUrl(item.gravatar)} />
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
});

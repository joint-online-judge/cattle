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
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { DomainService } from '@/client';
import * as style from './style.css';

const { Text } = Typography;
export const Domains = observer(() => {
  const { t } = useTranslation();
  const domainListHook = useRequest(async () => {
    return DomainService.listDomainsApiV1DomainsGet();
  });
  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      <Spin spinning={domainListHook.loading}>
        <PageHeader
          title={t('DOMAINS.DOMAINS')}
          className={style.SettingsHeader}
          extra={[
            <Button className={style.Button}>
              <Link to="/domains/create">
                {t('DOMAINS.NEW_DOMAIN')}
              </Link>
            </Button>,
          ]}
        />
        <List
          itemLayout="horizontal"
          dataSource={domainListHook.data}
          bordered
          split
          className={style.List}
          renderItem={(item) => (
            <List.Item
              className={style.ListItem}
              actions={[
                <Button className={style.Button}>
                  {t('DOMAINS.SETTINGS')}
                </Button>,
                <Button className={style.Button}>
                  {t('DOMAINS.LEAVE')}
                </Button>,
              ]}
            >
              <Space className={style.Space}>
                <Avatar src={item.gravatar} />
                <Link
                  to={`/domains/${item.url}`}
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

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
import { gravatarImageUrl } from 'app/utils';

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
          title={t('DOMAIN.DOMAINS')}
          className="SettingsHeader"
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
          dataSource={domainListHook.data}
          bordered
          split
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button>
                  {t('DOMAIN.SETTINGS')}
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

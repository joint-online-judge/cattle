import React from 'react';
import { useIntl, useParams } from 'umi';
import { PageHeader } from 'antd';
import SettingsStyleWrapper from '@/components/Settings/SettingsStyleWrapper';
import CreateUpdateDomainForm from '@/components/Domain/CreateUpdateDomainForm';
import style from './style.css';

const Index: React.FC = () => {
  const intl = useIntl();
  const { domainUrl } = useParams<{ domainUrl: string; }>();

  return (
    <>
      <PageHeader
        title={intl.formatMessage({ id: 'SETTINGS.DOMAIN.PROFILE' })}
        className={style.settingsTitle}
      />
      <SettingsStyleWrapper type="form">
        <CreateUpdateDomainForm domainUrl={domainUrl} />
      </SettingsStyleWrapper>
    </>
  );
};

export default Index;

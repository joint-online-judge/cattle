import { observer } from 'mobx-react';
import React from 'react';
import { CreateUpdateDomainForm, SettingsStyleWrapper } from 'app/components';
import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import style from './style.css';

export const UpdateDomain = observer(() => {
  const { t } = useTranslation();
  const { domainUrl } = useParams<{ domainUrl: string; }>();
  return (
    <>
      <PageHeader
        title={t('SETTINGS.DOMAIN.PROFILE')}
        className={style.settingsTitle}
      />
      <SettingsStyleWrapper type="form">
        <CreateUpdateDomainForm domainUrl={domainUrl} />
      </SettingsStyleWrapper>
    </>
  );
});

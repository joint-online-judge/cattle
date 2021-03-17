import { observer } from 'mobx-react';
import React from 'react';
import { CreateUpdateDomainForm } from 'app/components';
import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import style from './style.css';

export const UpdateDomain = observer(() => {
  const { t } = useTranslation();
  const { url } = useParams<{ url: string; }>();
  return (
    <>
      <PageHeader
        title={t('SETTINGS.DOMAIN.PROFILE')}
        className={style.SettingsTitle}
      />
      <CreateUpdateDomainForm domainUrl={url} />
    </>
  );
});

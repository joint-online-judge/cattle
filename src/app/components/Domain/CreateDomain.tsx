import { observer } from 'mobx-react';
import React from 'react';
import {
  Typography,
} from 'antd';
import { CreateUpdateDomainForm } from 'app/components/Domain/CreateUpdateDomainForm';
import { useTranslation } from 'react-i18next';
import style from './style.css';

const { Title } = Typography;

export const CreateDomain = observer(() => {
  const { t } = useTranslation();
  /* todo: add helper */
  /* todo: add onChange on URL/ID field to ensure unique field */
  return (
    <div className={style.CreateDomain}>
      <Title className={style.CreateTitle}>{t('DOMAIN.CREATE_A_NEW_DOMAIN')}</Title>
      <CreateUpdateDomainForm />
    </div>
  );
});

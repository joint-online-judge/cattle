import { observer } from 'mobx-react';
import React from 'react';
import {
  Row,
  Col,
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
    <Row justify="center" className={style.createDomain}>
      <Col
        xs={22}
        sm={18}
        md={13}
        lg={10}
        xl={9}
        xxl={7}
      >
        <Title className={style.createTitle}>
          {t(
            'DOMAIN.CREATE_A_NEW_DOMAIN',
          )}
        </Title>
        <CreateUpdateDomainForm />
      </Col>
    </Row>
  );
});

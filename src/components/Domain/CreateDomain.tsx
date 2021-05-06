import React from 'react';
import { Row, Col, Typography } from 'antd';
import { useIntl } from 'umi';
import CreateUpdateDomainForm from '@/components/Domain/CreateUpdateDomainForm';
import style from './style.css';

const { Title } = Typography;

const Index: React.FC = () => {
  const intl = useIntl();
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
          {intl.formatMessage({ id: 'DOMAIN.CREATE_A_NEW_DOMAIN' })}
        </Title>
        <CreateUpdateDomainForm />
      </Col>
    </Row>
  );
};

export default Index;

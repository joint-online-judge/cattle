import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
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
      <Col>
        <Card
          title={(
            <Title level={2}>
              {intl.formatMessage({ id: 'DOMAIN.CREATE_A_NEW_DOMAIN' })}
            </Title>
          )}
        >
          <CreateUpdateDomainForm />
        </Card>
      </Col>
    </Row>
  );
};

export default Index;

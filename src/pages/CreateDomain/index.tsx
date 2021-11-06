import React from 'react';
import { Col, Row } from 'antd';
import { useIntl } from 'umi';
import style from './style.css';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import ShadowCard from '@/components/ShadowCard';

const Index: React.FC = () => {
  const intl = useIntl();

  /* todo: add helper */
  /* todo: add onChange on URL/ID field to ensure unique field */
  return (
    <>
      <ShadowCard
        title={intl.formatMessage({ id: 'DOMAIN.CREATE_A_NEW_DOMAIN' })}
      >
        <Row justify="center" className={style.createDomain}>
          <Col span={12}>
            <UpsertDomainForm />
          </Col>
        </Row>
      </ShadowCard>
    </>
  );
};

export default Index;

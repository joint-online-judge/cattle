import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { useModel } from 'umi';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';

const Index: React.FC = () => {
  const { setHeader } = useModel('pageHeader');

  const breads = [
    {
      path: 'admin',
      breadcrumbI18nKey: 'menu.admin',
    },
    {
      path: 'domain',
      breadcrumbI18nKey: 'admin.menu.domain',
    },
  ];

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'DOMAIN.CREATE_A_NEW_DOMAIN',
    });
  }, []);

  /* Todo: add helper */
  /* todo: add onChange on URL/ID field to ensure unique field */
  return (
    <Row>
      <Col>
        <UpsertDomainForm />
      </Col>
    </Row>
  );
};

export default Index;

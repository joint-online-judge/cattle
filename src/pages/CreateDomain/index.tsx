import React from 'react';
import { Row, Col, Card } from 'antd';
import { useIntl, useLocation, useRouteMatch } from 'umi';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import PageHeaderIntl from '@/components/PageHeaderIntl';
import style from './style.css';

const routes = [
  {
    path: 'admin',
    breadcrumbName: 'ADMIN.ADMIN',
  },
  {
    path: 'domain',
    breadcrumbName: 'DOMAIN',
  },
  {
    path: 'create',
    breadcrumbName: 'CREATE',
  },
];

const Index: React.FC = () => {
  const intl = useIntl();
  console.log(useLocation());
  console.log(useRouteMatch());

  /* todo: add helper */
  /* todo: add onChange on URL/ID field to ensure unique field */
  return (
    <>
      <Row>
        <Col>
          <PageHeaderIntl
            title={'DOMAIN.CREATE_A_NEW_DOMAIN'}
            breadcrumb={{ routes }}
          />
        </Col>
      </Row>
      <Card title={213}>
        <Row justify="center" className={style.createDomain}>
          <Col span={12}>
            <UpsertDomainForm />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Index;

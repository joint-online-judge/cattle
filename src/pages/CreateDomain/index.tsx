import React from 'react';
import { Col, Row } from 'antd';
import { useIntl, useLocation, useRouteMatch } from 'umi';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import ShadowCard from '@/components/ShadowCard';
import style from './style.css';

//todo: delete it or uncomment it
// const routes = [
//   {
//     path: 'admin',
//     breadcrumbName: 'ADMIN.ADMIN',
//   },
//   {
//     path: 'domain',
//     breadcrumbName: 'DOMAIN',
//   },
//   {
//     path: 'create',
//     breadcrumbName: 'CREATE',
//   },
// ];

const Index: React.FC = () => {
  const intl = useIntl();
  console.log(useLocation());
  console.log(useRouteMatch());

  /* todo: add helper */
  /* todo: add onChange on URL/ID field to ensure unique field */
  return (
    <>
      <ShadowCard title={'创建域'}>
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

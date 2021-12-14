import React from 'react';
import { useParams } from 'umi';
import { message, Row, Col } from 'antd';
import { useRequest } from 'ahooks';
import UpsertDomainForm from '@/components/Domain/UpsertDomainForm';
import ShadowCard from '@/components/ShadowCard';
import { VERTICAL_GUTTER } from '@/constants';
import { Horse } from '@/utils/service';

interface IProps {
  refresh: () => void;
}

const Index: React.FC<IProps> = ({ refresh }) => {
  const { domainUrl } = useParams<{ domainUrl: string }>();

  const { data } = useRequest(
    async () => {
      const response = await Horse.domain.v1ListDomainInvitations(domainUrl);
      return response.data.data;
    },
    {
      onError: () => {
        message.error('fetch domain failed');
      },
    },
  );

  return (
    <Row gutter={VERTICAL_GUTTER}>
      <Col span={24}>
        <ShadowCard>
          <h1>Invitation</h1>
        </ShadowCard>
      </Col>
      <Col span={24}>
        <ShadowCard>
          <h1>Invitation</h1>
        </ShadowCard>
      </Col>
    </Row>
  );
};

export default Index;

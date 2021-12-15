import React, { useRef, useState } from 'react';
import mm from 'moment';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { message, Row, Col, Button, Collapse, Typography } from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import ShadowCard from '@/components/ShadowCard';
import CopyablePre from '@/components/CopyablePre';
import Horse, { DomainInvitation } from '@/utils/service';
import CreateInvitationModal from './CreateInvitationModal';
import { DOMAIN_HOST } from '@/constants';

const { Panel } = Collapse;
const { Paragraph } = Typography;

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const [modalVis, setModalVis] = useState<boolean>(false);
  const [editingInvitation, setEditingInvitation] = useState<
    DomainInvitation | undefined
  >(undefined);
  const formRef = useRef<ProFormInstance<DomainInvitation>>();

  const { data: invitations, refresh } = useRequest(
    async () => {
      const response = await Horse.domain.v1ListDomainInvitations(domainUrl);
      return response.data?.data?.results || [];
    },
    {
      onError: () => {
        message.error('fetch invitations failed');
      },
    },
  );

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <ShadowCard
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingInvitation(undefined);
                  setModalVis(true);
                  formRef.current?.resetFields();
                }}
              >
                创建邀请
              </Button>
            }
          >
            <Collapse defaultActiveKey={[0]}>
              {(invitations ?? []).map((o, index) => (
                <Panel
                  header={`Code: ${o.code}`}
                  key={index}
                  extra={genExtra()}
                >
                  <Typography>
                    <Paragraph>
                      <ul>
                        <li>角色分配: {o.role}</li>
                        <li>用户可以访问此链接来加入此域:</li>
                        <CopyablePre>
                          {`${DOMAIN_HOST}/domain/${domainUrl}/join`}
                        </CopyablePre>
                        <li>或者，这是可以自动填写邀请码的:</li>
                        <CopyablePre>
                          {`${DOMAIN_HOST}/domain/${domainUrl}/join?code=${o.code}`}
                        </CopyablePre>
                        <li>
                          过期时间:{' '}
                          {mm(o.expireAt).format('YYYY-MM-DD HH:mm:ss')}
                        </li>
                      </ul>
                    </Paragraph>
                  </Typography>
                </Panel>
              ))}
            </Collapse>
          </ShadowCard>
        </Col>
      </Row>

      <CreateInvitationModal
        visible={modalVis}
        onVisibleChange={setModalVis}
        formRef={formRef}
        domainUrl={domainUrl}
        onSuccess={refresh}
      />
    </>
  );
};

export default Index;

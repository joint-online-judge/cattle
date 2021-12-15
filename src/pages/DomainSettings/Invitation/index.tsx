import React, { useRef, useState } from 'react';
import mm from 'moment';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import {
  message,
  Row,
  Col,
  Button,
  Collapse,
  Typography,
  Spin,
  Space,
  Empty,
} from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ShadowCard from '@/components/ShadowCard';
import CopyablePre from '@/components/CopyablePre';
import Horse, { DomainInvitation, ErrorCode } from '@/utils/service';
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

  const { run: deleteInvitation, loading: deleting } = useRequest(
    async (invitationId: string) => {
      const response = await Horse.domain.v1DeleteDomainInvitation(
        domainUrl,
        invitationId,
      );
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.Success) {
          message.success('delete invitation success');
        } else {
          message.error('delete invitation failed');
        }
        refresh();
      },
      onError: () => {
        message.error('delete invitation failed');
      },
    },
  );

  const genExtra = (invitation: DomainInvitation) => (
    <Space>
      <EditOutlined
        onClick={(event) => {
          event.stopPropagation();
          setEditingInvitation(invitation);
          setModalVis(true);
        }}
      />
      <DeleteOutlined
        onClick={(event) => {
          event.stopPropagation();
          deleteInvitation(invitation.id);
        }}
      />
    </Space>
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
            {invitations && invitations.length > 0 ? (
              <Spin spinning={deleting}>
                <Collapse defaultActiveKey={[0]}>
                  {(invitations ?? []).map((o, index) => (
                    <Panel
                      header={`Code: ${o.code}`}
                      key={index}
                      extra={genExtra(o)}
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
                              {o.expireAt
                                ? mm(o.expireAt).format('YYYY-MM-DD HH:mm:ss')
                                : 'Never'}
                            </li>
                          </ul>
                        </Paragraph>
                      </Typography>
                    </Panel>
                  ))}
                </Collapse>
              </Spin>
            ) : (
              <Empty
                description={
                  'No invitations. Only administrators can invite members.'
                }
                style={{ margin: 48 }}
              />
            )}
          </ShadowCard>
        </Col>
      </Row>

      <CreateInvitationModal
        visible={modalVis}
        onVisibleChange={setModalVis}
        formRef={formRef}
        domainUrl={domainUrl}
        editingInvitation={editingInvitation}
        onSuccess={refresh}
      />
    </>
  );
};

export default Index;

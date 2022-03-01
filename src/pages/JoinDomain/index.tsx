import React, { useEffect, useMemo } from 'react';
import {
  useParams,
  useModel,
  useIntl,
  history,
  useLocation,
  Location,
} from 'umi';
import { useRequest } from 'ahooks';
import { Row, Col, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import Horse, { ErrorCode } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';

interface FormValues {
  code: string;
}

const Index: React.FC = () => {
  const intl = useIntl();
  const location: Location = useLocation();
  const { domainUrl } = useParams<{ domainUrl: string }>();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');

  const { run: joinDomain, loading: joining } = useRequest(
    async (code: string) => {
      const res = await Horse.domain.v1JoinDomainByInvitation(domainUrl, {
        invitationCode: code,
      });
      return res.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        switch (res.errorCode) {
          case ErrorCode.Success: {
            message.success('join success');
            history.push(`/domain/${domain?.url ?? domain?.id ?? ''}`);

            break;
          }

          case ErrorCode.DomainInvitationBadRequestError: {
            // TODO: improve error info
            message.error('wrong invitation code/link expired');

            break;
          }

          case ErrorCode.UserAlreadyInDomainBadRequestError: {
            message.error('you are already in domain');

            break;
          }

          default: {
            message.error('join failed');
          }
        }
      },
      onError: () => {
        message.error('join failed');
      },
    },
  );

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'join',
      },
    ],
    [domain],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'domain.invitation.join',
    });
  }, [breads]);

  useEffect(() => {
    if (location.query?.code && typeof location.query?.code === 'string') {
      joinDomain(location.query?.code);
    }
  }, [location]);

  const onFinish = async (values: FormValues) => {
    await joinDomain(values.code);
  };

  return (
    <Spin spinning={joining} indicator={<LoadingOutlined />} tip="Joining...">
      <ShadowCard>
        <Row justify="center" className="py-12">
          <Col xxl={10} xl={10} lg={10} md={14} sm={18} xs={22}>
            <h1 className="text-3xl">{`Join ${domain?.name ?? ''}`}</h1>
            <p className="mb-6">
              Fill in the invitation code to join {domain?.name ?? ''}
            </p>
            <ProForm<FormValues>
              layout="vertical"
              onFinish={onFinish}
              submitter={{
                searchConfig: {
                  submitText: intl.formatMessage({ id: 'join' }),
                },
                submitButtonProps: {
                  block: true,
                },
                resetButtonProps: false,
              }}
              dateFormatter="number"
              omitNil
            >
              <ProFormText
                name="code"
                label={intl.formatMessage({ id: 'domain.invitation.code' })}
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
            </ProForm>
          </Col>
        </Row>
      </ShadowCard>
    </Spin>
  );
};

export default Index;

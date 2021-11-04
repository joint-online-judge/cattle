import React, { useEffect } from 'react';
import { Button, Row, Col, Form, Input, message, Spin } from 'antd';
import { history, useIntl } from 'umi';
import { useRequest } from 'ahooks';
import style from './style.css';
import {
  Horse,
  Domain,
  DomainCreate,
  DomainEdit,
  ErrorCode,
} from '@/utils/service';
// import { MarkdownRender } from 'app/components/Editors';

export interface IProps {
  initialValues?: Partial<Domain>;
  onUpdateSuccess?: (domain?: Domain) => void;
  onCreateSuccess?: (domain?: Domain) => void;
}

const Index: React.FC<IProps> = (props) => {
  const { initialValues, onUpdateSuccess, onCreateSuccess } = props;
  const intl = useIntl();
  const [form] = Form.useForm();

  const { run: createDomain, loading: creatingDomain } = useRequest(
    async (domain: DomainCreate) =>
      Horse.domain.createDomainApiV1DomainsPost(domain),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.error_code === ErrorCode.Success) {
          if (res?.data?.data?.url) {
            history.push(`/domain/${res?.data?.data?.url}`);
          }

          message.success('create success');
          onCreateSuccess?.(res.data.data);
        } else if (res.data.error_code === ErrorCode.UrlNotUniqueError) {
          message.error('domain url already exists');
        }
      },
      onError: () => {
        message.error('create failed');
      },
    },
  );

  const { run: updateDomain, loading: updatingDomain } = useRequest(
    async (url: string, domain: DomainEdit) =>
      Horse.domain.updateDomainApiV1DomainsDomainPatch(url, domain),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.error_code === ErrorCode.Success) {
          message.success('update domain success');
          onUpdateSuccess?.(res.data.data);
        } else {
          message.error('update domain failed');
        }
      },
      onError: () => {
        message.error('update domain failed');
      },
    },
  );

  const onFinish = (values: Partial<Domain>) => {
    if (initialValues?.url) {
      updateDomain(initialValues.url, values);
    } else if (values.url) {
      createDomain(values as DomainCreate);
    }
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Spin spinning={updatingDomain || creatingDomain}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'DOMAIN.CREATE.NAME' })}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label={intl.formatMessage({ id: 'DOMAIN.CREATE.URL' })}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={Boolean(initialValues?.id)} />
        </Form.Item>
        <Form.Item
          name="gravatar"
          label={intl.formatMessage({ id: 'DOMAIN.CREATE.GRAVATAR' })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bulletin"
          label={intl.formatMessage({ id: 'DOMAIN.CREATE.BULLETIN' })}
        >
          {/* {MarkdownRender} */}
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col xs={9} sm={8} md={6}>
              <Button
                htmlType="submit"
                type="primary"
                className={initialValues?.url ? null : style.submitButtonCreate}
                loading={updatingDomain || creatingDomain}
                block
              >
                {intl.formatMessage({
                  id: initialValues?.url
                    ? 'SETTINGS.DOMAIN.UPDATE'
                    : 'DOMAIN.CREATE.CREATE',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Index;

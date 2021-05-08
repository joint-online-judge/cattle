import React from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { history, useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { Domain, DomainCreate, DomainEdit, DomainService, ErrorCode } from '@/client';
// import { MarkdownEditor } from 'app/components/Editors';
import style from './style.css';

export interface IProps {
  initialValues?: Partial<Domain>;
}

const Index: React.FC<IProps> = (props) => {
  const { initialValues } = props;
  const intl = useIntl();

  const { run: createDomain, loading: creatingDomain } = useRequest(
    (domain: DomainCreate) => DomainService.createDomainApiV1DomainsPost(domain),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.SUCCESS) {
          if (res.data?.url) {
            history.push(`/domain/${res.data.url}`);
          }
          message.success('create success');
        } else if (res.errorCode === ErrorCode.DOMAIN_URL_NOT_UNIQUE_ERROR) {
          message.error('domain url already exists');
        }
      },
      onError: () => {
        message.error('create failed');
      },
    },
  );

  const { run: updateDomain, loading: updatingDomain } = useRequest(
    (url: string, domain: DomainEdit) => DomainService.updateDomainApiV1DomainsDomainPatch(url, domain),
    {
      manual: true,
      onSuccess: () => {
      },
      onError: () => {
      },
    },
  );

  const onFinish = (values: Partial<Domain>) => {
    if (initialValues?.url) {
      return updateDomain(initialValues?.url, values);
    }
    if (values.url) {
      return createDomain(values as DomainCreate);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
    >
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
        <Input />
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
        getValueFromEvent={(value) => {
          console.log(value);
          return value?.text;
        }}
      >
        {/*{MarkdownEditor}*/}
        {'TODO: Here should be a markdown editor'}
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Row>
          <Col xs={9} sm={8} md={6}>
            <Button
              htmlType="submit"
              type="primary"
              className={initialValues?.url ? null : style.submitButtonCreate}
              size='large'
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
  );
};

export default Index;

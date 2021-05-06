import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { history, useIntl } from 'umi';
import { DomainService } from '@/client';
// import { MarkdownEditor } from 'app/components/Editors';
import style from './style.css';

export interface IProps {
  domainUrl?: string;
}

const Index: React.FC<IProps> = (props) => {
  const updateMode = Boolean(props.domainUrl);
  const intl = useIntl();
  const onFinish = async ({ url, name, gravatar, bulletin }) => {
    // redirect to the newly created form
    if (updateMode) {
      await DomainService.updateDomainApiV1DomainsDomainPatch(url,
        { gravatar, bulletin, name });
    } else {
      await DomainService.createDomainApiV1DomainsPost({
        url,
        name,
        bulletin,
        gravatar,
      });
      history.push(`/domain/${url}`);
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
              className={updateMode ? null : style.submitButtonCreate}
              size='large'
              block
            >
              {intl.formatMessage({
                id: updateMode
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

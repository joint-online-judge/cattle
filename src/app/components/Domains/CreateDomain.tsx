import { observer } from 'mobx-react';
import React from 'react';
import {
  Button, Form, Input, Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { DomainService } from '@/client';
import { useHistory } from 'react-router';
import style from './style.css';

const { Title } = Typography;

export const CreateDomain = observer((props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const onFinish = async ({
                            url, name, gravatar, bulletin,
                          }) => {
    await DomainService.createDomainApiV1DomainsPost(url, name,
      bulletin, gravatar);
    history.push(`/domain/${url}`);
  };
  /* todo: add helper */
  /* todo: add onChange on URL/ID field to ensure unique field */
  return (
    <div id={style.CreateDomain}>
      <Title id={style.CreateTitle}>{t('DOMAIN.CREATE_A_NEW_DOMAIN')}</Title>
      <Form
        onFinish={onFinish}
        layout="vertical"
        id={style.CreateForm}
        {...props}
      >
        <Form.Item
          name="name"
          label={t('DOMAIN.CREATE.NAME')}
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
          label={t('DOMAIN.CREATE.URL')}
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
          label={t('DOMAIN.CREATE.GRAVATAR')}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bulletin"
          label={t('DOMAIN.CREATE.BULLETIN')}
        >
          {/* todo: make it a markdown editor */}
          <Input.TextArea
            autoSize={{
              minRows: 5,
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            id={style.SubmitButton}
          >
            {t('DOMAIN.CREATE.CREATE')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

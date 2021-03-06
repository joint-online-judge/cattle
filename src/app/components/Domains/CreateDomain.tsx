import { observer } from 'mobx-react';
import React from 'react';
import {
  Button, Form, Input, Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { DomainService } from '@/client';
import * as style from './style.css';

const { Title } = Typography;

export const CreateDomain = observer(() => {
  const { t } = useTranslation();
  const onFinish = async ({ url, name }) => {
    await DomainService.createDomainApiV1DomainsPost(url, name);
  };
  /* todo: add helper */
  /* todo: finish i18n */
  return (
    <div id={style.CreateDomain}>
      <Title className={style.Title}>{t('DOMAINS.CREATE_A_NEW_DOMAIN')}</Title>
      <Form
        onFinish={onFinish}
        layout="vertical"
        id={style.CreateForm}
      >
        <Form.Item
          name="name"
          label={t('DOMAINS.CREATE.NAME')}
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
          label={t('DOMAINS.CREATE.URL')}
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
          label={t('DOMAINS.CREATE.GRAVATAR')}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bulletin"
          label={t('DOMAINS.CREATE.BULLETIN')}
        >
          {/* todo: make it a markdown editor */}
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className={style.Button}
            id={style.SubmitButton}
          >
            {t('DOMAINS.CREATE.SUBMIT')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

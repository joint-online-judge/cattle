import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';
import {
  Button, Form, Input,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { DomainService } from '@/client';
import { useHistory, useParams } from 'react-router';
import style from './style.css';

export interface CreateUpdateDomainFormProps {
  method: 'put' | 'post';
}

export const CreateUpdateDomainForm = observer(
  (props: CreateUpdateDomainFormProps): ReactElement<CreateUpdateDomainFormProps, any> => {
    const params = useParams<{ url: string }>();
    const updateMode = props.method === 'put' && Boolean(params.url);
    const { t } = useTranslation();
    const history = useHistory();
    const onFinish = async ({
                              url, name, gravatar, bulletin,
                            }) => {
      // redirect to the newly created form
      if (updateMode) {
        await DomainService.updateDomainApiV1DomainsDomainPatch(url,
          { gravatar, bulletin, name });
      } else {
        await DomainService.createDomainApiV1DomainsPost(url, name,
          bulletin, gravatar);
        history.push(`/domain/${url}`);
      }
    };
    return (
      <Form
        onFinish={onFinish}
        layout="vertical"
        id={updateMode ? style.UpdateForm : style.CreateForm}
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
            {t(updateMode ? 'SETTINGS.DOMAIN.UPDATE' : 'DOMAIN.CREATE.CREATE')}
          </Button>
        </Form.Item>
      </Form>
    );
  },
);

import React, { useRef, useEffect } from 'react';
import { Form, message } from 'antd';
import { history, useIntl } from 'umi';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { useRequest } from 'ahooks';
import {
  Horse,
  Domain,
  DomainCreate,
  DomainEdit,
  ErrorCode,
} from '@/utils/service';
import MarkdownEditor from '@/components/MarkdownEditor';

export interface IProps {
  initialValues?: Partial<Domain>;
  onUpdateSuccess?: (domain?: Domain) => void;
  onCreateSuccess?: (domain?: Domain) => void;
}

const Index: React.FC<IProps> = (props) => {
  const { initialValues, onUpdateSuccess, onCreateSuccess } = props;
  const intl = useIntl();
  const formRef = useRef<ProFormInstance<DomainCreate | DomainEdit>>();

  const { run: createDomain, loading: creatingDomain } = useRequest(
    async (domain: DomainCreate) => Horse.domain.v1CreateDomain(domain),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.errorCode === ErrorCode.Success) {
          if (res?.data?.data?.url) {
            history.push(`/domain/${res?.data?.data?.url}`);
          }

          message.success('create success');
          onCreateSuccess?.(res.data.data);
        } else if (res.data.errorCode === ErrorCode.InvalidUrlError) {
          message.error('domain url already exists');
        } else {
          message.error('create failed');
        }
      },
      onError: () => {},
    },
  );

  const { run: updateDomain, loading: updatingDomain } = useRequest(
    async (url: string, domain: DomainEdit) =>
      Horse.domain.v1UpdateDomain(url, domain),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.errorCode === ErrorCode.Success) {
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

  const onFinish = async (values: DomainCreate | DomainEdit) => {
    initialValues?.url
      ? await updateDomain(initialValues.url, values)
      : createDomain(values as DomainCreate);
  };

  useEffect(() => {
    formRef?.current?.setFieldsValue(initialValues ?? {});
  }, [formRef, initialValues]);

  return (
    <ProForm<DomainCreate | DomainEdit>
      formRef={formRef}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      dateFormatter="number"
      omitNil
    >
      <ProFormText
        width="lg"
        name="name"
        label={intl.formatMessage({ id: 'DOMAIN.CREATE.NAME' })}
        rules={[
          {
            required: true,
          },
        ]}
      />

      <ProFormText
        width="lg"
        name="url"
        label={intl.formatMessage({ id: 'DOMAIN.CREATE.URL' })}
        tooltip={'This will be displayed in the url of this domain.'}
      />

      <ProFormText
        width="lg"
        name="gravatar"
        label={intl.formatMessage({ id: 'DOMAIN.CREATE.GRAVATAR' })}
      />

      <ProFormText
        width="lg"
        name="tag"
        label={intl.formatMessage({ id: 'domain.create.tag' })}
        tooltip={
          'This field categorizes domains into groups. Admins can clone problems or manage problem groups within one domain group.'
        }
      />

      <Form.Item
        name="bulletin"
        label={intl.formatMessage({ id: 'DOMAIN.CREATE.BULLETIN' })}
      >
        <MarkdownEditor />
      </Form.Item>
    </ProForm>
  );
};

export default Index;

import React, { MutableRefObject, useEffect } from 'react';
import { useIntl } from 'umi';
import { message, Form } from 'antd';
import {
  ModalForm,
  ModalFormProps,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-form';
import {
  Horse,
  DomainInvitation,
  DomainInvitationCreate,
  DomainInvitationEdit,
  ErrorCode,
} from '@/utils/service';
import { useRequest } from 'ahooks';
import DomainRoleSelect from '@/components/DomainRoleSelect';

interface IProps extends ModalFormProps {
  domainUrl: string;
  onSuccess: () => void;
  formRef:
    | MutableRefObject<ProFormInstance<DomainInvitation> | undefined>
    | undefined;
  editingInvitation?: DomainInvitation;
}

const Index: React.FC<IProps> = ({
  domainUrl,
  onSuccess,
  visible,
  onVisibleChange,
  formRef,
  editingInvitation,
}) => {
  const intl = useIntl();

  const { run: createInvitation } = useRequest(
    async (values: DomainInvitationCreate) => {
      const response = await Horse.domain.v1CreateDomainInvitation(
        domainUrl,
        values,
      );
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.Success) {
          message.success('create invitation success');
        } else if (
          res.errorCode === ErrorCode.DomainInvitationBadRequestError
        ) {
          message.error('code already used');
        } else {
          message.error('create invitation failed');
        }
        onSuccess();
      },
      onError: () => {
        message.error('create invitation failed');
      },
    },
  );

  const { run: updateInvitation } = useRequest(
    async (invitationId: string, values: DomainInvitationEdit) => {
      const response = await Horse.domain.v1UpdateDomainInvitation(
        domainUrl,
        invitationId,
        values,
      );
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.Success) {
          message.success('update invitation success');
        } else if (
          res.errorCode === ErrorCode.DomainInvitationBadRequestError
        ) {
          message.error('code already used');
        } else {
          message.error('update invitation failed');
        }
        onSuccess();
      },
      onError: () => {
        message.error('update invitation failed');
      },
    },
  );

  useEffect(() => {
    if (editingInvitation) {
      formRef?.current?.setFieldsValue(editingInvitation);
    }
  }, [editingInvitation]);

  return (
    <ModalForm<DomainInvitation>
      title={editingInvitation ? '修改邀请' : '创建邀请'}
      width={520}
      isKeyPressSubmit
      onFinish={async (values) => {
        if (editingInvitation)
          await updateInvitation(editingInvitation.id, values);
        else await createInvitation(values);
        return true;
      }}
      visible={visible}
      onVisibleChange={onVisibleChange}
      formRef={formRef}
      dateFormatter="number"
    >
      <Form.Item
        name="role"
        label={intl.formatMessage({ id: 'Role' })}
        rules={[
          {
            required: true,
          },
        ]}
      >
        {/* TODO: Ban root option */}
        <DomainRoleSelect domainUrl={domainUrl} />
      </Form.Item>
      <ProFormText
        name="code"
        label={intl.formatMessage({ id: 'Code' })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormDateTimePicker
        name="expireAt"
        label={intl.formatMessage({ id: 'ExpireAt' })}
        help={'Empty means never expire'}
      />
    </ModalForm>
  );
};

export default Index;

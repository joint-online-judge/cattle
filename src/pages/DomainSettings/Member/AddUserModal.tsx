import React, { MutableRefObject, useEffect } from 'react';
import { useIntl } from 'umi';
import { message, Form } from 'antd';
import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from '@ant-design/pro-form';
import {
  Horse,
  DomainUserAdd,
  UserWithDomainRole,
  ErrorCode,
} from '@/utils/service';
import { useRequest } from 'ahooks';
import DomainRoleSelect from '@/components/DomainRoleSelect';
import UserSearchInput from '@/components/DomainCandidateSearchInput';
import Highlighter from 'react-highlight-words';

interface IProps extends ModalFormProps {
  domainUrl: string;
  onSuccess: () => void;
  formRef: MutableRefObject<ProFormInstance<DomainUserAdd>>;
  editingUser?: UserWithDomainRole;
}

const Index: React.FC<IProps> = ({
  domainUrl,
  onSuccess,
  visible,
  onVisibleChange,
  formRef,
  editingUser,
}) => {
  const intl = useIntl();

  const { run: addUser } = useRequest(
    async (values: DomainUserAdd) => {
      const response =
        await Horse.domain.addDomainUserApiV1DomainsDomainUsersPost(
          domainUrl,
          values,
        );
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.UserAlreadyInDomainBadRequestError) {
          message.error('user already in domain');
        } else if (ErrorCode.UserNotFoundError) {
          message.error('user not found');
        } else if (res.errorCode === ErrorCode.Success) {
          message.success('add user success');
        }
        onSuccess();
      },
      onError: () => {
        message.error('add domain user failed');
      },
    },
  );

  useEffect(() => {
    if (editingUser) {
      formRef?.current?.setFieldsValue({
        user: editingUser.id,
        role: editingUser.domainRole as any,
      });
    }
  }, [editingUser]);

  return (
    <ModalForm<DomainUserAdd>
      title="添加用户到域"
      width={520}
      isKeyPressSubmit
      onFinish={async (values) => {
        await addUser(values);
        return true;
      }}
      visible={visible}
      onVisibleChange={onVisibleChange}
      formRef={formRef}
    >
      <Form.Item
        name="user"
        label={intl.formatMessage({ id: 'User' })}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <UserSearchInput domainUrl={domainUrl} autoFocus />
      </Form.Item>
      <Form.Item
        name="role"
        label={intl.formatMessage({ id: 'Role' })}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DomainRoleSelect domainUrl={domainUrl} />
      </Form.Item>
    </ModalForm>
  );
};

export default Index;

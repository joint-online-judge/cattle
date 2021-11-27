import React from 'react';
import { useIntl } from 'umi';
import { Button, message, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ModalFormProps } from '@ant-design/pro-form';
import { Horse, DomainUserAdd, ErrorCode } from '@/utils/service';
import { useRequest } from 'ahooks';
import DomainRoleSelect from '@/components/DomainRoleSelect';
import UserSearchInput from '@/components/UserSearchInput';

interface IProps extends ModalFormProps {
  domainUrl: string;
  onSuccess: () => void;
}

const Index: React.FC<IProps> = ({ domainUrl, onSuccess }) => {
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
        } else {
          message.success('add user success');
        }
        onSuccess();
      },
      onError: () => {
        message.error('add domain user failed');
      },
    },
  );

  return (
    <ModalForm<DomainUserAdd>
      title="添加用户到域"
      width={520}
      trigger={
        <Button type="primary" icon={<PlusOutlined />}>
          添加用户
        </Button>
      }
      isKeyPressSubmit
      onFinish={async (values) => {
        await addUser(values);
        return true;
      }}
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <Form.Item
        name="user"
        label={'User'}
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

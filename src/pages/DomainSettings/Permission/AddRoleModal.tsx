import React, { useMemo, useRef } from 'react';
import { useIntl } from 'umi';
import { Button, message } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import {
  ProFormInstance,
  ModalForm,
  ModalFormProps,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import {
  Horse,
  DomainRoleCreate,
  ErrorCode,
  DomainRole,
} from '@/utils/service';
import { useRequest } from 'ahooks';

interface IProps extends ModalFormProps {
  domainUrl: string;
  roles: DomainRole[] | undefined;
  onSuccess: () => void;
}

interface RoleFormValue {
  role: string;
  template?: string;
}

const Index: React.FC<IProps> = ({ domainUrl, onSuccess, roles }) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();

  const { run: createRole } = useRequest(
    async (values: DomainRoleCreate) => {
      const response =
        await Horse.domain.createDomainRoleApiV1DomainsDomainRolesPost(
          domainUrl,
          values,
        );
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.DomainRoleNotUniqueError) {
          message.error('role name not unique');
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

  const onFinish = async (values: RoleFormValue) => {
    if (values.template) {
      const templateRole = roles?.find((r) => r.role === values.template);
      if (templateRole) {
        await createRole({
          role: values.role,
          permission: templateRole.permission,
        });
        return true;
      }
    }

    await createRole({
      role: values.role,
      permission: {},
    });
    return true;
  };

  const options = useMemo(() => {
    return (roles || []).map((role) => ({
      label: role.role,
      value: role.role,
    }));
  }, [roles]);

  return (
    <ModalForm<RoleFormValue>
      title="创建角色"
      width={520}
      formRef={formRef}
      trigger={
        <Button type="primary" key="create" icon={<TeamOutlined />}>
          创建角色
        </Button>
      }
      isKeyPressSubmit
      onFinish={onFinish}
      modalProps={{
        afterClose: () => {
          formRef.current?.resetFields();
        },
      }}
    >
      <ProFormText
        name="role"
        label={intl.formatMessage({ id: 'RoleName' })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormSelect
        name="template"
        label={intl.formatMessage({ id: 'RoleTemplate' })}
        options={options}
        placeholder={'Select a current role as template'}
        help={'Permissions of "user" will be applied by default'}
      />
    </ModalForm>
  );
};

export default Index;

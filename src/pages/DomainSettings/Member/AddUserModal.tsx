import React, { MutableRefObject, useEffect } from 'react';
import { useIntl } from 'umi';
import { message, Form, Row, Col, Card } from 'antd';
import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from '@ant-design/pro-form';
import {
  Horse,
  DomainUserAdd,
  DomainUserUpdate,
  UserWithDomainRole,
  ErrorCode,
} from '@/utils/service';
import { useRequest } from 'ahooks';
import DomainRoleSelect from '@/components/DomainRoleSelect';
import UserSearchInput from '@/components/DomainCandidateSearchInput';
import Gravatar from '@/components/Gravatar';

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
      const response = await Horse.domain.v1AddDomainUser(domainUrl, values);
      return response.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode === ErrorCode.UserAlreadyInDomainBadRequestError) {
          message.error('user already in domain');
        } else if (res.errorCode === ErrorCode.UserNotFoundError) {
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

  const { run: updateUser } = useRequest(
    async (userId: string, values: DomainUserUpdate) => {
      const response = await Horse.domain.v1UpdateDomainUser(
        domainUrl,
        userId,
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
          message.success('update user success');
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
      title={editingUser ? '修改用户角色' : '添加用户到域'}
      width={520}
      isKeyPressSubmit
      onFinish={async (values) => {
        if (editingUser) await updateUser(editingUser.id, values);
        else await addUser(values);
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
        {editingUser ? (
          <Card bodyStyle={{ padding: 12 }}>
            <Row wrap={false} gutter={12} align="middle">
              <Col flex="none">
                <Gravatar gravatar={editingUser.gravatar} />
              </Col>
              <Col flex="auto">
                <Row>
                  <Col span={24}>
                    <span>
                      {editingUser.realName
                        ? `${editingUser.username} (${editingUser.realName})`
                        : editingUser.username}
                    </span>
                  </Col>
                  <Col span={24}>
                    <span className="text-xs">
                      {(editingUser.studentId ?? '') +
                        (editingUser.email ? ` - ${editingUser.email}` : '')}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        ) : (
          <UserSearchInput domainUrl={domainUrl} autoFocus />
        )}
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

import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-form'
import { ModalForm } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Card, Col, Form, message, Row } from 'antd'
import UserSearchInput from 'components/DomainCandidateSearchInput'
import DomainRoleSelect from 'components/DomainRoleSelect'
import Gravatar from 'components/Gravatar'
import type React from 'react'
import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  DomainUserAdd,
  DomainUserUpdate,
  UserWithDomainRole
} from 'utils/service'
import { ErrorCode, Horse } from 'utils/service'

interface IProps extends ModalFormProps {
  domainUrl: string
  onSuccess: () => Promise<void>
  formRef:
           | MutableRefObject<ProFormInstance<DomainUserAdd> | undefined>
    | undefined
  editingUser?: UserWithDomainRole
}

const Index: React.FC<IProps> = ({
  domainUrl,
  onSuccess,
  open,
  onOpenChange,
  formRef,
  editingUser
}) => {
  const { t } = useTranslation()

  const { run: addUser } = useRequest(
    async (values: DomainUserAdd) => {
      const response = await Horse.domain.v1AddDomainUser(domainUrl, values)
      return response.data
    },
    {
      manual: true,
      onSuccess: res => {
        switch (res.errorCode) {
          case ErrorCode.Success: {
            message.success('add user success')
            break
          }

          case ErrorCode.UserAlreadyInDomainBadRequestError: {
            message.error('user already in domain')
            break
          }

          case ErrorCode.UserNotFoundError: {
            message.error('user not found')
            break
          }

          default: {
            message.error('add domain user failed')
          }
        }

        onSuccess()
      },
      onError: () => {
        message.error('add domain user failed')
      }
    }
  )

  const { run: updateUser } = useRequest(
    async (userId: string, values: DomainUserUpdate) => {
      const response = await Horse.domain.v1UpdateDomainUser(
        domainUrl,
        userId,
        values
      )
      return response.data
    },
    {
      manual: true,
      onSuccess: res => {
        switch (res.errorCode) {
          case ErrorCode.Success: {
            message.success('update user success')
            onSuccess()

            break
          }

          case ErrorCode.UserAlreadyInDomainBadRequestError: {
            message.error('user already in domain')

            break
          }

          case ErrorCode.UserNotFoundError: {
            message.error('user not found')

            break
          }

          default: {
            message.error('add domain user failed')
          }
        }
      },
      onError: () => {
        message.error('add domain user failed')
      }
    }
  )

  useEffect(() => {
    if (editingUser) {
      formRef?.current?.setFieldsValue({
        user: editingUser.id,
        role: editingUser.domainRole
      })
    }
  }, [editingUser, formRef])

  return (
    <ModalForm<DomainUserAdd>
      title={editingUser ? '修改用户角色' : '添加用户到域'}
      width={520}
      isKeyPressSubmit
      onFinish={async (values): Promise<void> =>
        editingUser ? updateUser(editingUser.id, values) : addUser(values)
      }
      open={open}
      onOpenChange={onOpenChange}
      formRef={formRef}
      dateFormatter='number'
    >
      <Form.Item
        name='user'
        label={t('AddUserModal.form.user')}
        rules={[
          {
            required: true
          }
        ]}
      >
        {editingUser ? (
          <Card bodyStyle={{ padding: 12 }}>
            <Row wrap={false} gutter={12} align='middle'>
              <Col flex='none'>
                <Gravatar gravatar={editingUser.gravatar} />
              </Col>
              <Col flex='auto'>
                <Row>
                  <Col span={24}>
                    <span>{editingUser.username}</span>
                  </Col>
                  {/* <Col span={24}>
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
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </Card>
        ) : (
          <UserSearchInput domainUrl={domainUrl} autoFocus />
        )}
      </Form.Item>
      <Form.Item
        name='role'
        label={t('AddUserModal.form.role')}
        rules={[
          {
            required: true
          }
        ]}
      >
        <DomainRoleSelect domainUrl={domainUrl} />
      </Form.Item>
    </ModalForm>
  )
}

export default Index

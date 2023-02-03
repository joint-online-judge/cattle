import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import {
  Button,
  Col,
  Collapse,
  Empty,
  message,
  Row,
  Space,
  Spin,
  Typography
} from 'antd'
import CopyablePre from 'components/CopyablePre'
import ShadowCard from 'components/ShadowCard'
import dayjs from 'dayjs'
import { isArray } from 'lodash-es'
import type React from 'react'
import type { ReactElement } from 'react'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN_HOST } from 'utils/constants'
import { NoDomainUrlError } from 'utils/exception'
import type { DomainInvitation } from 'utils/service'
import Horse, { ErrorCode } from 'utils/service'
import CreateInvitationModal from './CreateInvitationModal'

const { Panel } = Collapse
const { Paragraph } = Typography

const Index: React.FC = () => {
  const { domainUrl } = useParams<{ domainUrl: string }>()
  const [modalVis, setModalVis] = useState<boolean>(false)
  const [editingInvitation, setEditingInvitation] = useState<
    DomainInvitation | undefined
  >(undefined)
  const formRef = useRef<ProFormInstance<DomainInvitation>>()

  if (!domainUrl) {
    throw new NoDomainUrlError()
  }

  const { data: invitations, refresh } = useRequest(
    async () => {
      const response = await Horse.domain.v1ListDomainInvitations(domainUrl, {
        ordering: '-created_at'
      })
      // @chujie: there won't be many invitations. It's ok to sort at frontend.
      if (isArray(response.data.data?.results)) {
        return response.data.data?.results
      }

      return []
    },
    {
      onError: () => {
        message.error('fetch invitations failed')
      }
    }
  )

  const { run: deleteInvitation, loading: deleting } = useRequest(
    async (invitationId: string) => {
      const response = await Horse.domain.v1DeleteDomainInvitation(
        domainUrl,
        invitationId
      )
      return response.data
    },
    {
      manual: true,
      onSuccess: res => {
        if (res.errorCode === ErrorCode.Success) {
          message.success('delete invitation success')
        } else {
          message.error('delete invitation failed')
        }

        refresh()
      },
      onError: () => {
        message.error('delete invitation failed')
      }
    }
  )

  const genExtra = (invitation: DomainInvitation): ReactElement => (
    <Space>
      <EditOutlined
        onClick={(event): void => {
          event.stopPropagation()
          setEditingInvitation(invitation)
          setModalVis(true)
        }}
      />
      <DeleteOutlined
        onClick={(event): void => {
          event.stopPropagation()
          deleteInvitation(invitation.id)
        }}
      />
    </Space>
  )

  return (
    <>
      <Row>
        <Col span={24}>
          <ShadowCard
            extra={
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={(): void => {
                  setEditingInvitation(undefined)
                  formRef.current?.resetFields()
                  setModalVis(true)
                }}
              >
                创建邀请
              </Button>
            }
          >
            {invitations && invitations.length > 0 ? (
              <Spin spinning={deleting}>
                <Collapse defaultActiveKey={[invitations[0]?.id]}>
                  {invitations.map(o => (
                    <Panel
                      header={`Code: ${o.code}`}
                      key={o.id}
                      extra={genExtra(o)}
                    >
                      <Typography>
                        <Paragraph>
                          <ul>
                            <li>角色分配: {o.role}</li>
                            <li>用户可以访问此链接来加入此域:</li>
                            <CopyablePre>
                              {`${DOMAIN_HOST}/domain/${domainUrl}/join`}
                            </CopyablePre>
                            <li>或者，这是可以自动填写邀请码的:</li>
                            <CopyablePre>
                              {`${DOMAIN_HOST}/domain/${domainUrl}/join?code=${o.code}`}
                            </CopyablePre>
                            <li>
                              过期时间:{' '}
                              {o.expireAt
                                ? dayjs(o.expireAt).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                  )
                                : 'Never'}
                            </li>
                          </ul>
                        </Paragraph>
                      </Typography>
                    </Panel>
                  ))}
                </Collapse>
              </Spin>
            ) : (
              <Empty
                description='No invitations. Only administrators can invite members.'
                style={{ margin: 48 }}
              />
            )}
          </ShadowCard>
        </Col>
      </Row>

      <CreateInvitationModal
        open={modalVis}
        onOpenChange={setModalVis}
        formRef={formRef}
        domainUrl={domainUrl}
        editingInvitation={editingInvitation}
        onSuccess={refresh}
      />
    </>
  )
}

export default Index

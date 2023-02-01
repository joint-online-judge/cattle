import { EditOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Col, Form, Input, message, Modal, Row } from 'antd'
import Gravatar from 'components/Gravatar'
import { debounce } from 'lodash-es'
import { useAuth } from 'models'
import type React from 'react'
import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import { VERTICAL_GUTTER } from 'utils/constants'
import Horse, { ErrorCode } from 'utils/service'

const AvatarUpload: React.FC = () => {
  const { user, refresh } = useAuth()
  const [preview, setPreview] = useState(user?.gravatar ?? '')
  const [modalVisible, setModalVisible] = useState(false)
  const [okDisabled, setOkDisabled] = useState(false)
  const [form] = Form.useForm<{ gravatar: string }>()

  const { run: updateGravatar, loading } = useRequest(
    async (gravatar: string) => Horse.user.v1UpdateCurrentUser({ gravatar }),
    {
      manual: true,
      onSuccess: res => {
        if (res.data.errorCode === ErrorCode.Success) {
          message.success('change gravatar success')
          setModalVisible(false)
          Horse.auth.v1Refresh({ responseType: 'json' }).then(() => {
            refresh()
          })
        } else {
          message.error('change gravatar fails')
        }
      },
      onError: () => {
        message.error('change gravatar fails')
      }
    }
  )

  const debouncedSetPreview = debounce((value: string) => {
    setPreview(value)
  }, 500)

  const previewGravatar = useMemo(
    () => <Gravatar gravatar={preview} size={100} />,
    [preview]
  )

  const gravatarOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    form.validateFields().then(
      () => {
        debouncedSetPreview(e.target.value)
        setOkDisabled(false)
      },
      () => {
        if (preview) {
          setPreview('')
        }

        if (!okDisabled) {
          setOkDisabled(true)
        }
      }
    )
  }

  const initModal = (): void => {
    setModalVisible(true)
    setPreview(user?.gravatar ?? '')
    form.setFields([{ name: 'gravatar', value: user?.gravatar ?? '' }])
  }

  const submitPatch = (): void => {
    form.validateFields().then(values => updateGravatar(values.gravatar))
  }

  return (
    <>
      <Row justify='center' gutter={VERTICAL_GUTTER}>
        <Col span={24}>
          <Row justify='center'>
            <Gravatar gravatar={user?.gravatar} size={150} />
          </Row>
        </Col>
        <Button icon={<EditOutlined />} onClick={initModal}>
          Change Gravatar
        </Button>
      </Row>

      <Modal
        title='Change Gravatar'
        open={modalVisible}
        okButtonProps={{ loading, disabled: okDisabled }}
        cancelButtonProps={{ loading }}
        onOk={submitPatch}
        onCancel={(): void => {
          setModalVisible(false)
        }}
      >
        <Form
          layout='vertical'
          form={form}
          initialValues={{ gravatar: user?.gravatar }}
        >
          <Form.Item
            name='gravatar'
            label='Gravatar Email'
            rules={[{ required: true }, { type: 'email' }]}
          >
            <Input onChange={gravatarOnChange} />
          </Form.Item>

          <Row justify='center'>{previewGravatar}</Row>
        </Form>
      </Modal>
    </>
  )
}

export default AvatarUpload

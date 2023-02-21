import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useAuth } from 'models'
import type React from 'react'
import { DEFAULT_GUTTER } from 'utils/constants'
import AvatarUpload from './AvatarUpload'

const Index: React.FC = () => {
  const { user } = useAuth()

  return (
    <Card
      title={<span className='text-2xl font-semibold'>Basic Information</span>}
    >
      <Row gutter={DEFAULT_GUTTER}>
        <Col span={12}>
          <Form layout='vertical' initialValues={user}>
            <Form.Item
              name='realName'
              label='Real Name'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={12}>
          <AvatarUpload />
        </Col>
      </Row>
    </Card>
  )
}

export default Index

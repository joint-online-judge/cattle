import { Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import AvatarUpload from './AvatarUpload';
import { VERTICAL_GUTTER } from '@/constants';

const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <Card
      title={
        <span className="text-2xl font-semibold">
          Basic Information
        </span>
      }
    >
      <Row gutter={VERTICAL_GUTTER}>
        <Col span={12}>
          <Form
            layout="vertical"
            initialValues={initialState?.user}
          >
            <Form.Item
              name="realName"
              label="Real Name"
              rules={[
                { required: true },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
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
  );
};

export default Index;

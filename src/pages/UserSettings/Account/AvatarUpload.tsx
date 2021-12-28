import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import Gravatar from '@/components/Gravatar';
import { VERTICAL_GUTTER } from '@/constants';
import { useModel } from '@@/plugin-model/useModel';

const AvatarUpload: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [gravatar, setGravatar] = useState(initialState?.user?.gravatar ?? '');
  const [preview, setPreview] = useState(initialState?.user?.gravatar ?? '');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setGravatar(initialState?.user?.gravatar ?? '');
    setPreview(initialState?.user?.gravatar ?? '');
  }, [initialState?.user?.gravatar]);

  return (
    <>
      <Row justify="center" gutter={VERTICAL_GUTTER}>
        <Col span={24}>
          <Row justify="center">
            <Gravatar src={gravatar} size={150} />
          </Row>
        </Col>
        <Button icon={<MailOutlined />} onClick={() => {
          setModalVisible(true);
        }}>
          Update Gravatar
        </Button>
      </Row>

      <Modal
        title="Update Gravatar"
        visible={modalVisible}
        onOk={() => {
          // todo: update gravatar use imageUrl
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Row gutter={VERTICAL_GUTTER}>
          <Col span={24}>
            <Form
              layout="inline"
              onFinish={(value) => {
                setPreview(value.gravatar);
              }}>
              <Form.Item
                initialValue={preview}
                name="gravatar"
                label="Gravatar Email"
                rules={[{ required: true }, { type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Preview
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={24}>
            <Row justify="center">
              <Gravatar gravatar={preview} size={100} />
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AvatarUpload;

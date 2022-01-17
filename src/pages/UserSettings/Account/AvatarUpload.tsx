import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Gravatar from '@/components/Gravatar';
import { VERTICAL_GUTTER } from '@/constants';
import { useModel } from '@@/plugin-model/useModel';
import { useRequest } from 'ahooks';
import Horse from '@/utils/service';

const AvatarUpload: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [preview, setPreview] = useState(initialState?.user?.gravatar ?? '');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setPreview(initialState?.user?.gravatar ?? '');
  }, []);

  const { run: changeGravatar, loading } = useRequest(async (url) => {
    await Horse.user.v1UpdateCurrentUser({ gravatar: url });
    await Horse.auth.v1Refresh({
      responseType: 'redirect',
      redirectUrl: window.location.href,
    });
  }, {
    manual: true,
    onSuccess: async () => {
      message.success('change gravatar success');
      setModalVisible(false);
      window.location.reload();
    },
    onError: () => {
      message.error('change gravatar fails');
    },
  });

  return (
    <>
      <Row justify="center" gutter={VERTICAL_GUTTER}>
        <Col span={24}>
          <Row justify="center">
            <Gravatar gravatar={initialState?.user?.gravatar} size={150} />
          </Row>
        </Col>
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            setModalVisible(true);
          }}>
          Change Gravatar
        </Button>
      </Row>

      <Modal
        title="Change Gravatar"
        visible={modalVisible}
        okButtonProps={{ loading }}
        cancelButtonProps={{ loading }}
        onOk={async () => {
          const values = await form.validateFields();
          await changeGravatar(values.gravatar);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Row gutter={VERTICAL_GUTTER}>
          <Col span={24}>
            <Form
              layout="inline"
              form={form}
              onFinish={(value) => {
                setPreview(value.gravatar);
              }}>
              <Form.Item
                initialValue={preview}
                name="gravatar"
                label="Gravatar Email"
                rules={[
                  { required: true },
                  { type: 'email' },
                ]}>
                <Input style={{ minWidth: '200px' }} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">
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

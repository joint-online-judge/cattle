import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EditOutlined } from '@ant-design/icons';
import Gravatar from '@/components/Gravatar';
import { VERTICAL_GUTTER } from '@/constants';
import { useModel } from '@@/plugin-model/useModel';
import { useRequest } from 'ahooks';
import Horse from '@/utils/service';

const AvatarUpload: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [preview, setPreview] = useState(initialState?.user?.gravatar ?? '');
  const [modalVisible, setModalVisible] = useState(false);
  const [okDisabled, setOkDisabled] = useState(false);
  const [form] = Form.useForm();

  const { run: changeGravatar, loading } = useRequest(async (url) => {
    await Horse.user.v1UpdateCurrentUser({ gravatar: url });
  }, {
    manual: true,
    onSuccess: async () => {
      message.success('change gravatar success');
      await Horse.auth.v1Refresh({
        responseType: 'json',
      });
      await refresh();
    },
    onError: () => {
      message.error('change gravatar fails');
    },
  });

  const debouncedSetPreview = debounce((value: string) => {
    setPreview(value);
  }, 500);

  const previewGravatar = useMemo(() => (
    <Gravatar gravatar={preview} size={100} />
  ), [preview]);

  const gravatarOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.validateFields().then(() => {
      debouncedSetPreview(e.target.value);
      setOkDisabled(false);
    }, () => {
      if (preview) {
        setPreview('');
      }
      if (!okDisabled) {
        setOkDisabled(true);
      }
    });
  };

  const initModal = () => {
    setModalVisible(true);
    setPreview(initialState?.user?.gravatar ?? '');
    form.resetFields();
  };

  const submitPatch = async () => {
    const values = await form.validateFields();
    await changeGravatar(values.gravatar);
    setModalVisible(false);
  };

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
          onClick={initModal}
        >
          Change Gravatar
        </Button>
      </Row>

      <Modal
        title="Change Gravatar"
        visible={modalVisible}
        okButtonProps={{ loading, disabled: okDisabled }}
        cancelButtonProps={{ loading }}
        onOk={submitPatch}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{ gravatar: initialState?.user?.gravatar }}
        >
          <Form.Item
            name="gravatar"
            label="Gravatar Email"
            rules={[
              { required: true },
              { type: 'email' },
            ]}
          >
            <Input onChange={gravatarOnChange} />
          </Form.Item>

          <Row justify="center">
            {previewGravatar}
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AvatarUpload;

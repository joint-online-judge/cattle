import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useCallback, useState } from 'react';
import { EditOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import Gravatar from '@/components/Gravatar';
import { UploadFile } from 'antd/lib/upload/interface';
import { VERTICAL_GUTTER } from '@/constants';

export interface ImageUploadProps {
  defaultSrc?: string // src of the default image displayed
  onUpload?: (imageUrl: string) => void; // called when an image is uploaded, imageUrl is the url of the image uploaded
}

const AvatarUpload: React.FC<ImageUploadProps> = ({ defaultSrc, onUpload }) => {
  const [imageUrl, setImageUrl] = useState(defaultSrc ?? '');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const onChange = useCallback(async (param: { file: UploadFile }) => {
    let src = param.file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(param.file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    if (src) {
      setImageUrl(src);
      if (onUpload) {
        onUpload(src);
      }
    }
  }, [onUpload]);
  const menu = (
    <Menu>
      <Menu.Item key="0" icon={<UploadOutlined />}>
        <ImgCrop>
          <Upload
            onChange={onChange}
            showUploadList={false}
          >
            Upload from local
          </Upload>
        </ImgCrop>
      </Menu.Item>
      <Menu.Item key="1" icon={<MailOutlined />} onClick={() => {
        setModalVisible(true);
      }}>
        Use Gravatar
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row justify="center" gutter={VERTICAL_GUTTER}>
        <Col span={24}>
          <Row justify="center">
            <Gravatar src={imageUrl} size={150} />
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <Dropdown overlay={menu} trigger={['click']}>
              <Button icon={<EditOutlined />}>Edit</Button>
            </Dropdown>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Use Gravatar"
        visible={modalVisible}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <Form
          layout="vertical"
          style={{ width: '50%' }}
          form={form}
          onFinish={(value) => {
            // todo: update gravatar
            console.log(value);
            setModalVisible(false);
          }}>
          <Form.Item
            name="gravatar"
            label="Gravatar Email Address"
            rules={[{ required: true }, { type: 'email' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AvatarUpload;

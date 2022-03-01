import React from 'react';
import { Button, Col, Row, Tooltip } from 'antd';
import { history, Link } from 'umi';
import { EditOutlined, MailOutlined, ProfileOutlined } from '@ant-design/icons';
import { useModel } from '@@/plugin-model/useModel';
import Gravatar from '@/components/Gravatar';
import IconText from '@/components/IconText';
import { VERTICAL_GUTTER } from '@/constants';

const Index = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <Row align="middle" justify="center" gutter={VERTICAL_GUTTER}>
      <Col span={24}>
        <Row justify="center">
          <Tooltip title="Change your avatar" placement="bottom">
            <Link to="/settings/account">
              <Gravatar gravatar={initialState?.user?.gravatar} size={200} />
            </Link>
          </Tooltip>
        </Row>
      </Col>

      <Col span={24}>
        <Row align="middle">
          <Col span={24}>
            <span className="font-semibold text-2xl">
              {initialState?.user?.realName ?? initialState?.user?.username}
            </span>
          </Col>
          <Col span={24}>
            <span className="text-lg text-gray-400">
              {initialState?.user?.username}
            </span>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Button
          block
          icon={<EditOutlined />}
          onClick={() => {
            history.push('/settings/account');
          }}
        >
          Edit Profile
        </Button>
      </Col>

      <Col span={24}>
        <IconText
          icon={<MailOutlined />}
          text={initialState?.user?.email}
          className="text-sm"
        />
      </Col>

      {initialState?.user?.studentId && (
        <Col span={24}>
          <IconText
            icon={<ProfileOutlined />}
            text={initialState?.user?.studentId}
            className="text-sm"
          />
        </Col>
      )}
    </Row>
  );
};

export default Index;

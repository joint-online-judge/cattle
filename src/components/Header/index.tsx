import React, { useState } from 'react';
import { Button, Col, Menu, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import UserMenuItem from './UserMenuItem';
import Logo from '@/assets/logo.svg';
import style from './style.less';

const Index: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  return (
    <Row style={{ height: '100%' }} align="middle">
      <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
        <Row wrap={false} align="middle" gutter={12}>
          <Col flex={'none'}>
            <Row wrap={false} align="middle">
              <img src={Logo} alt="logo" className={style.pageTitleLogo} />
              <Link to="/" className={style.pageTitle}>
                Joint Online Judge
              </Link>
            </Row>
          </Col>
          <Col flex={'auto'}>
            <Menu
              mode="horizontal"
              className={style.menu}
            >
              <Menu.Item key="user" className={style.headerFloatRightItem}>
                <UserMenuItem />
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Col>

      <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
        <Row wrap={false} align="middle" justify="space-between">
          <Col>
            <Button
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
          </Col>
          <Col>
            <img src={Logo} alt="logo" className={style.pageTitleLogo} />
          </Col>
          <Col>
            <UserMenuItem mini={true} />
          </Col>
        </Row>
      </Col>

      {/*<Drawer*/}
      {/*  title={*/}
      {/*    <span className="block text-center text-xl">Joint Online Judge</span>*/}
      {/*  }*/}
      {/*  placement="left"*/}
      {/*  onClose={() => setDrawerVisible(false)}*/}
      {/*  visible={drawerVisible}*/}
      {/*  closeIcon={false}*/}
      {/*  bodyStyle={{ padding: 0 }}*/}
      {/*>*/}
      {/*  <Menu*/}
      {/*    mode="vertical"*/}
      {/*    className={style.menu}*/}
      {/*    selectedKeys={[current]}*/}
      {/*    onClick={(e) => {*/}
      {/*      if (e.key !== 'user') setCurrent(e.key);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {menuItems}*/}
      {/*  </Menu>*/}
      {/*</Drawer>*/}
    </Row>
  );
};

export default Index;

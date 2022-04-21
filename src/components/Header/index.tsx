import { MenuOutlined } from '@ant-design/icons'
import { Button, Col, Menu, Row } from 'antd'
import Logo from 'assets/logo.svg'
import type React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.less'
import UserMenuItem from './UserMenuItem'

const Index: React.FC = () => (
	// Const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

	<Row style={{ height: '100%' }} align='middle'>
		<Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
			<Row align='middle' justify='space-between'>
				<Col>
					<Link to='/'>
						<Row gutter={16} align='middle'>
							<Col>
								<img src={Logo} alt='logo' className={style.pageTitleLogo} />
							</Col>
							<Col>
								<div className={style.textContainer}>
									<span className='text-bold text-2xl text-black'>
										Joint Online Judge
									</span>
								</div>
							</Col>
						</Row>
					</Link>
				</Col>
				<Col>
					<Menu mode='horizontal' className={style.menu} selectedKeys={[]}>
						<Menu.Item key='user'>
							<UserMenuItem />
						</Menu.Item>
					</Menu>
				</Col>
			</Row>
		</Col>

		<Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
			<Row wrap={false} align='middle' justify='space-between'>
				<Col>
					<Button
						icon={<MenuOutlined />}
						// OnClick={() => {
						//   setDrawerVisible(true);
						// }}
					/>
				</Col>
				<Col>
					<img src={Logo} alt='logo' className={style.pageTitleLogo} />
				</Col>
				<Col>
					<UserMenuItem mini />
				</Col>
			</Row>
		</Col>

		{/* <Drawer */}
		{/*  title={ */}
		{/*    <span className="block text-center text-xl">Joint Online Judge</span> */}
		{/*  } */}
		{/*  placement="left" */}
		{/*  onClose={() => setDrawerVisible(false)} */}
		{/*  visible={drawerVisible} */}
		{/*  closeIcon={false} */}
		{/*  bodyStyle={{ padding: 0 }} */}
		{/* > */}
		{/*  <Menu */}
		{/*    mode="vertical" */}
		{/*    className={style.menu} */}
		{/*    selectedKeys={[current]} */}
		{/*    onClick={(e) => { */}
		{/*      if (e.key !== 'user') setCurrent(e.key); */}
		{/*    }} */}
		{/*  > */}
		{/*    {menuItems} */}
		{/*  </Menu> */}
		{/* </Drawer> */}
	</Row>
)
export default Index

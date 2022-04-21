import { Col, Row, Typography } from 'antd'
import type React from 'react'
import FooterLinks from './FooterLinks'
import style from './style.module.less'

const { Text } = Typography
const Index: React.FC = () => (
	<Row justify='center' className={style.footerLayout}>
		<Col span={16} xs={23} sm={23} md={20}>
			<Row justify='space-between' gutter={[0, 12]}>
				<Col>
					<Text type='secondary'>
						© 2021-{new Date().getFullYear()} Joint Online Judge
					</Text>
					<br />
					<a
						href='http://net.sjtu.edu.cn'
						target='_blank'
						rel='noopener noreferrer'
						className={style.link}
					>
						<Text type='secondary'>沪交ICP备20190085号</Text>
					</a>
				</Col>
				<Col>
					<Row>
						<FooterLinks />
					</Row>
				</Col>
			</Row>
		</Col>
	</Row>
)

export default Index

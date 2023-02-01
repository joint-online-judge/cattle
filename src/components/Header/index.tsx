import { Col, Row, Select } from 'antd'
import Logo from 'assets/logo.svg'
import { useAuth, useDomainList } from 'models'
import type React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import style from './style.module.css'
import UserMenuItem from './UserMenuItem'

const Index: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { domainList, fetchDomainList } = useDomainList()
  const { domainUrl } = useParams<{ domainUrl: string }>()

  useEffect(() => {
    fetchDomainList() // Fetch domains when login/logout
  }, [auth.user, fetchDomainList])

  const options = (domainList ?? []).map(d => ({
    value: d.url ?? d.id,
    label: d.name
  }))

  return (
    <Row style={{ height: '100%' }} align='middle'>
      <Col span={24}>
        <div className='flex'>
          <Row gutter={16} align='middle'>
            <Col>
              <Link to='/'>
                <img src={Logo} alt='logo' className={style.pageTitleLogo} />
              </Link>
            </Col>
            <Col>
              <Select
                style={{ width: 200 }}
                value={domainUrl}
                onChange={e => navigate(`/domain/${e}`)}
                options={options}
              />
            </Col>
          </Row>

          <div className='flex-1' />
          <UserMenuItem />
        </div>
      </Col>
    </Row>
  )
}
export default Index

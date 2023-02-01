import {
  BarsOutlined,
  FormOutlined,
  HomeOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Col, Row, theme } from 'antd'
import AccessMenu from 'components/AccessMenu'
import { useAccess } from 'models'
import type React from 'react'
import type { ReactElement } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Location } from 'react-router-dom'
import { Link, matchPath, useLocation, useParams } from 'react-router-dom'
import type { MenuItemsWithPermission } from 'types'
import { MAIN_CONTENT_GRID } from 'utils/constants'

const matchMenuKey = (location: Location): string => {
  if (matchPath('/domain/:domainUrl/settings/*', location.pathname)) {
    return 'domain_manage'
  }

  if (matchPath('/domain/:domainUrl/problem-set/*', location.pathname)) {
    return 'problem_set'
  }

  if (matchPath('/domain/:domainUrl/problem/*', location.pathname)) {
    return 'problem_list'
  }

  if (matchPath('/domain/:domainUrl', location.pathname)) {
    return 'overview'
  }

  return 'overview'
}

const Index: React.FC = () => {
  const location = useLocation()
  const [current, setCurrent] = useState(matchMenuKey(location))
  const { domainUrl } = useParams<{ domainUrl: string }>()
  const { t } = useTranslation()
  const access = useAccess()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  useEffect(() => {
    setCurrent(matchMenuKey(location))
  }, [location])

  const domainMenu: ReactElement | null = useMemo(() => {
    if (domainUrl === undefined) {
      return null
    }

    const items: MenuItemsWithPermission = [
      {
        key: 'overview',
        icon: <HomeOutlined />,
        label: (
          <Link to={`/domain/${domainUrl}`}>
            {t('DomainHeader.menu.overview')}
          </Link>
        )
      },
      {
        key: 'problem_set',
        icon: <FormOutlined />,
        label: (
          <Link to={`/domain/${domainUrl}/problem-set`}>
            {t('DomainHeader.menu.problemSet')}
          </Link>
        )
      },
      {
        key: 'problem_list',
        icon: <BarsOutlined />,
        label: (
          <Link to={`/domain/${domainUrl}/problem`}>
            {t('DomainHeader.menu.problem')}
          </Link>
        )
      },
      {
        key: 'domain_manage',
        icon: <SettingOutlined />,
        label: (
          <Link to={`/domain/${domainUrl}/settings`}>
            {t('DomainHeader.menu.domainManage')}
          </Link>
        ),
        access: access.isRoot // TODO: should be domain permission
      }
    ]

    return (
      <AccessMenu
        mode='horizontal'
        items={items}
        selectedKeys={[current]}
        onClick={(e): void => {
          setCurrent(e.key)
        }}
      />
    )
  }, [domainUrl, current, access.isRoot, t])

  return (
    <Row
      align='bottom'
      justify='center'
      style={{ background: colorBgContainer }}
      className='shadow'
    >
      <Col {...MAIN_CONTENT_GRID}>{domainMenu}</Col>
    </Row>
  )
}

export default Index

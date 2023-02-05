import type { MenuProps } from 'antd'
import { Col, Row } from 'antd'
import AccessMenu from 'components/AccessMenu'
import LoadingOrError from 'components/LoadingOrError'
import ShadowCard from 'components/ShadowCard'
import { last } from 'lodash-es'
import type React from 'react'
import type { PropsWithChildren } from 'react'
import { Suspense, useCallback, useEffect, useState } from 'react'
import type { Location } from 'react-router-dom'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import routes from 'routes'
import type { MenuItemsWithPermission } from 'types'
import { VERTICAL_GUTTER } from 'utils/constants'

interface IProps {
  menuItems: MenuItemsWithPermission
  defaultOpenKeys?: MenuProps['defaultOpenKeys']
  extra?: React.ReactElement | React.ReactNode // Extra component below SideBar
  defaultTab?: string // Default tab of menu
}

const Index: React.FC<PropsWithChildren<IProps>> = ({
  children,
  extra,
  defaultTab,
  menuItems,
  defaultOpenKeys
}) => {
  const navigate = useNavigate()
  const location: Location = useLocation()
  const matchedRoutes = matchRoutes(routes, location)
  const [key, setKey] = useState<string>()

  const parseMenuKeyFromUrl = useCallback((): string | undefined => {
    const lastRoute = last(matchedRoutes)
    return lastRoute && !lastRoute.route.index
      ? lastRoute.route.path
      : defaultTab
  }, [defaultTab, matchedRoutes])

  useEffect(() => {
    setKey(parseMenuKeyFromUrl())
  }, [parseMenuKeyFromUrl])

  /**
   * Menu click event: click the menu items will change the url.
   * @example /domain/test/settings/profile --> /domain/test/settings/member
   */
  const menuOnClick: MenuProps['onClick'] = useCallback(
    (event: { key: string; keyPath: string[] }) => {
      setKey(event.key)
      navigate(event.keyPath.join('/'))
    },
    [navigate]
  )

  return (
    <Row
      gutter={[{ xs: 16, sm: 16, lg: 24, xl: 24, xxl: 24 }, VERTICAL_GUTTER[1]]}
    >
      <Col xs={24} sm={24} md={8} lg={7} xl={7} xxl={6}>
        <Row gutter={VERTICAL_GUTTER}>
          <Col span={24}>
            <ShadowCard
              bodyStyle={{ padding: 0 }}
              style={{ overflow: 'hidden' }}
              className='w-full'
            >
              <AccessMenu
                mode='inline'
                items={menuItems}
                selectedKeys={key ? [key] : undefined}
                onClick={menuOnClick}
                defaultOpenKeys={defaultOpenKeys}
              />
            </ShadowCard>
          </Col>
          <Col span={24}>{extra}</Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={16} lg={17} xl={17} xxl={18}>
        <Suspense fallback={<LoadingOrError />}>{children}</Suspense>
      </Col>
    </Row>
  )
}

export default Index

import type { MenuProps } from 'antd'
import { Col, Row } from 'antd'
import LoadingOrError from 'components/LoadingOrError'
import SideMenuBar from 'components/SideMenuBar'
import { last } from 'lodash-es'
import type React from 'react'
import type { ReactElement } from 'react'
import { Suspense, useCallback, useEffect, useState } from 'react'
import type { Location } from 'react-router-dom'
import {
  matchRoutes,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import routes from 'routes'
import { VERTICAL_GUTTER } from 'utils/constants'

interface IProps {
  menu: React.ReactElement<MenuProps> // The side menu component (will override all other options)
  extra?: React.ReactElement | React.ReactNode // Extra component below SideBar
  defaultTab?: string // Default tab of menu
  routerMode?: 'param' | 'query' // Use query string or route parameters
  children: ReactElement
}

const Index: React.FC<IProps> = ({
  children,
  extra,
  defaultTab,
  menu,
  routerMode = 'param'
}) => {
  const navigate = useNavigate()
  const location: Location = useLocation()
  const matchedRoutes = matchRoutes(routes, location)
  const [searchParams, setSearchParams] = useSearchParams()
  const [key, setKey] = useState<string>()

  const parseMenuKeyFromUrl = useCallback((): string | undefined => {
    /**
     * Init the menu key.
     * If routerMode is 'query', the key should be loaded from the url query string.
     * @example /domain/test/settings?tab=profile --> tab='profile'
     * Note: 'query' mode won't support subTab.
     * If routerMode is 'param', the key should be loaded from the url parameter.
     * @example /domain/test/settings/permission/config --> tab='permission', subTab='config'
     */
    if (routerMode === 'query') {
      const subTab = searchParams.get('subTab')
      const tab = searchParams.get('tab')

      return subTab ?? tab ?? defaultTab
    }

    const lastRoute = last(matchedRoutes)
    return lastRoute && !lastRoute.route.index
      ? lastRoute.route.path
      : defaultTab
  }, [routerMode, searchParams, defaultTab, matchedRoutes])

  useEffect(() => {
    setKey(parseMenuKeyFromUrl())
  }, [parseMenuKeyFromUrl])

  /**
   * Menu click event: click the menu items will change the url.
   * @example /domain/test/settings?tab=profile --> /domain/test/settings?tab=member
   * @example /domain/test/settings/profile --> /domain/test/settings/member
   */
  const menuOnClick: MenuProps['onClick'] = useCallback(
    (event: { key: string; keyPath: string[] }) => {
      const [newTab, newSubTab] = event.keyPath.reverse()
      setKey(event.key)

      if (routerMode === 'query') {
        setSearchParams({ tab: newTab, subTab: newSubTab })
      } else if (event.key) {
        navigate(event.keyPath.join('/'))
      }
    },
    [routerMode, navigate, setSearchParams]
  )

  return (
    <Row
      gutter={[{ xs: 16, sm: 16, lg: 24, xl: 24, xxl: 24 }, VERTICAL_GUTTER[1]]}
    >
      <Col xs={24} sm={24} md={8} lg={7} xl={7} xxl={6}>
        <Row gutter={VERTICAL_GUTTER}>
          <Col span={24}>
            <SideMenuBar
              selectedKeys={key ? [key] : undefined}
              onClick={menuOnClick}
            >
              {menu}
            </SideMenuBar>
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

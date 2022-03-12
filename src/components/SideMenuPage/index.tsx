import React, { useMemo, useState, useCallback } from 'react';
import { generatePath } from 'react-router';
import { useLocation, history, Location, useParams, IRoute } from 'umi';
import { Row, Col, MenuProps } from 'antd';
import { isArray } from 'lodash';
import PageContent, { PageContentProps } from './PageContent';
import SettingsSideBar from '@/components/Settings/SettingsSideBar';
import ShadowCard from '@/components/ShadowCard';
import { VERTICAL_GUTTER } from '@/constants';

interface IProps {
  menu?: React.ReactElement<MenuProps>; // The side menu component (will override all other options)
  extra?: React.ReactElement | React.ReactNode; // Extra component below SideBar
  defaultTab?: string; // Default tab of menu
  route?: IRoute; // Route match object from parent components (in props of a layout component)
  routerMode?: 'param' | 'query'; // Use query string or route parameters
  matchMode?: 'route' | 'children'; // Use nested router or matching children directly
  shadowCard?: boolean; // Whether to wrap the children with ShadowCard automatically
  children: React.ReactElement | Array<React.ReactElement<PageContentProps>>;
}

const Index: React.FC<IProps> = ({
  children,
  extra,
  route,
  defaultTab = '',
  menu,
  routerMode = 'param',
  matchMode = 'route',
  shadowCard = true,
}) => {
  const location: Location = useLocation();
  const parameters = useParams<{ tab?: string; subTab?: string }>();

  const [key, setKey] = useState<string>(
    (() => {
      /**
       * Init the menu key.
       * If routerMode is 'query', the key should be loaded from the url query string.
       * @example /domain/test/settings?tab=profile --> tab='profile'
       * Note: 'query' mode won't support subTab.
       * If routerMode is 'param', the key should be loaded from the url parameter.
       * @example /domain/test/settings/permission/config --> tab='permission', subTab='config'
       */
      if (routerMode === 'query' && isArray(children)) {
        if (location.query?.tab && typeof location.query?.tab === 'string') {
          return location.query?.tab;
        }

        if (defaultTab) {
          return defaultTab;
        }

        const firstValidChild = children.find((o) => o.props.menuKey);
        return firstValidChild?.props?.menuKey ?? '';
      }

      return parameters.subTab ?? parameters.tab ?? defaultTab;
    })(),
  );

  /**
   * Menu click event: click the menu items will change the url.
   * @example /domain/test/settings?tab=profile --> /domain/test/settings?tab=member
   * @example /domain/test/settings/profile --> /domain/test/settings/member
   */
  const menuOnClick: MenuProps['onClick'] = useCallback(
    (event: { key: string; keyPath: string[] }) => {
      const [newTab, newSubTab] = event.keyPath.reverse();

      setKey(newSubTab ?? newTab);
      if (routerMode === 'query') {
        history.replace({
          pathname: location.pathname,
          query: { tab: newTab, subTab: newSubTab },
        });
      } else if (route?.path) {
        history.push(
          generatePath(route.path, {
            ...parameters,
            tab: newTab,
            subTab: newSubTab,
          }),
        );
      }
    },
    [routerMode, location, route, parameters],
  );

  const mainContent = useMemo(() => {
    if (matchMode === 'children') {
      if (isArray(children)) {
        return children.find((o) => o.props.menuKey === key) ?? null;
      }

      return children;
    }

    if (isArray(children)) {
      return (
        <Row gutter={VERTICAL_GUTTER}>
          {children.map((c, index) => (
            <Col span={24} key={index}>
              {shadowCard ? <ShadowCard>{c}</ShadowCard> : c}
            </Col>
          ))}
        </Row>
      );
    }

    return shadowCard ? <ShadowCard>{children}</ShadowCard> : children;
  }, [children, matchMode, key, shadowCard]);

  return (
    <Row
      gutter={[{ xs: 16, sm: 16, lg: 24, xl: 24, xxl: 24 }, VERTICAL_GUTTER[1]]}
    >
      <Col xs={24} sm={24} md={8} lg={7} xl={7} xxl={6}>
        <Row gutter={VERTICAL_GUTTER}>
          <Col span={24}>
            <SettingsSideBar
              menu={menu}
              selectedKeys={[key]}
              onClick={menuOnClick}
            />
          </Col>
          <Col span={24}>{extra}</Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={16} lg={17} xl={17} xxl={18}>
        {mainContent}
      </Col>
    </Row>
  );
};

export default Index;
export { PageContent };

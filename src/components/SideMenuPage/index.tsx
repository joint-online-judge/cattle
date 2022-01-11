import React, { useMemo, useState, useCallback } from 'react';
import { generatePath } from 'react-router';
import { useLocation, history, Location, useParams, IRoute } from 'umi';
import { Row, Col, MenuProps } from 'antd';
import PageContent, { PageContentProps } from './PageContent';
import SettingsSideBar, {
  SettingsMenuItem,
} from '@/components/Settings/SettingsSideBar';
import ShadowCard from '@/components/ShadowCard';
import { VERTICAL_GUTTER } from '@/constants';
import { isArray } from 'lodash';

interface IProps {
  menuItems?: SettingsMenuItem[];
  menu?: React.ReactElement<MenuProps>;
  extra?: React.ReactElement | React.ReactNode; // extra component below SideBar
  defaultTab?: string;
  route?: IRoute;
  routerMode?: 'param' | 'query'; // use query string or parameters
  matchMode?: 'route' | 'children'; // use nested router or matching children directly
  shadowCard?: boolean;
  children: React.ReactElement | Array<React.ReactElement<PageContentProps>>;
}

const Index: React.FC<IProps> = ({
  children,
  extra,
  route,
  defaultTab = '',
  menuItems,
  menu,
  routerMode = 'param',
  matchMode = 'route',
  shadowCard = true,
}) => {
  const location: Location = useLocation();
  const params = useParams<{ tab?: string }>();

  const [key, setKey] = useState<string>(
    (() => {
      if (routerMode === 'query' && isArray(children)) {
        if (location.query?.tab && typeof location.query?.tab === 'string')
          return location.query?.tab;

        if (defaultTab) return defaultTab;

        const firstValidChild = children.find((o) => o.props.menuKey);
        return firstValidChild?.props?.menuKey ?? '';
      }

      return params.tab ?? defaultTab;
    })(),
  );

  const finalMenuItems = useMemo<SettingsMenuItem[]>(() => {
    if (menuItems) return menuItems;

    if (matchMode === 'children') {
      return React.Children.map(
        children,
        (child: React.ReactElement<PageContentProps>) => {
          if (typeof child === 'object' && child?.props?.menuKey) {
            return {
              menuKey: child.props.menuKey,
              i18nKey: child.props.i18nKey,
              text: child.props.text,
              path: child.props.path,
              node: child.props.node,
              menuItemProps: child.props.menuItemProps,
            };
          }
          return undefined;
        },
      ).filter((o) => !!o);
    }

    // else if matchMode === 'route'
    const items =
      route?.routes
        ?.map((r) => {
          if (r.unaccessible !== true && r.menuKey) {
            return {
              menuKey: r.menuKey,
              i18nKey: r.i18nKey,
              text: r.text,
              path: r.path,
            };
          }
        })
        .filter((o) => !!o) || [];

    return items as SettingsMenuItem[];
  }, [children, menuItems, matchMode]);

  const menuOnClick = useCallback(
    (event) => {
      setKey(event.key);

      if (routerMode === 'query') {
        history.replace({
          pathname: location.pathname,
          query: { tab: event.key.toString() },
        });
      } else if (route && route.path) {
        history.push(
          generatePath(route.path, {
            ...params,
            tab: event.key,
          }),
        );
      }
    },
    [routerMode, history, location, route],
  );

  const mainContent = useMemo(() => {
    if (matchMode === 'children') {
      if (isArray(children))
        return children.find((o) => o.props.menuKey === key) ?? null;
      return children;
    } else {
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
    }
  }, [children]);

  return (
    <>
      <Row
        gutter={[
          { xs: 16, sm: 16, lg: 24, xl: 24, xxl: 24 },
          VERTICAL_GUTTER[1],
        ]}
      >
        <Col xs={24} sm={24} md={8} lg={7} xl={7} xxl={6}>
          <Row gutter={VERTICAL_GUTTER}>
            <Col span={24}>
              <SettingsSideBar
                menu={menu}
                items={finalMenuItems}
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
    </>
  );
};

export default Index;
export { PageContent };

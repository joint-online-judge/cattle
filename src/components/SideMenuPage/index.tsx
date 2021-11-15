import React, { useMemo, useState, useCallback } from 'react';
import { generatePath } from 'react-router';
import { useLocation, history, Location, useParams, IRoute } from 'umi';
import { Row, Col } from 'antd';
import PageContent, { PageContentProps } from './PageContent';
import SettingsSideBar, {
  SettingsMenuItem,
} from '@/components/Settings/SettingsSideBar';
import ShadowCard from '@/components/ShadowCard';
import { isArray } from 'lodash';

interface IProps {
  children: React.ReactElement | Array<React.ReactElement<PageContentProps>>;
  extra?: React.ReactElement | React.ReactNode; // extra component below SideBar
  urlQuery?: boolean; // whether to use the url query mode
  route?: IRoute;
}

const Index: React.FC<IProps> = ({
  children,
  extra,
  route,
  urlQuery = false,
}) => {
  const location: Location = useLocation();
  const params = useParams<{ tabs?: string }>();

  const [key, setKey] = useState<string>(
    (() => {
      if (urlQuery && isArray(children)) {
        if (location.query?.tab && typeof location.query?.tab === 'string')
          return location.query?.tab;
        const firstValidChild = children.find((o) => o.props.menuKey);
        return firstValidChild?.props?.menuKey ?? '';
      }
      return params.tabs || '';
    })(),
  );

  const menuItems = useMemo<SettingsMenuItem[]>(() => {
    if (urlQuery) {
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
              component: child,
            };
          }
          return undefined;
        },
      ).filter((o) => !!o);
    }

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
  }, [children]);

  const menuOnClick = useCallback(
    (event) => {
      setKey(event.key);

      if (urlQuery) {
        history.replace({
          pathname: location.pathname,
          query: { tab: event.key.toString() },
        });
      } else if (route && route.path) {
        history.push(
          generatePath(route.path, {
            ...params,
            tabs: event.key,
          }),
        );
      }
    },
    [urlQuery, history, location, route],
  );

  return (
    <>
      <Row gutter={[{ lg: 24, xl: 24 }, 24]}>
        <Col xs={24} sm={6} xl={6}>
          <SettingsSideBar
            items={menuItems}
            selectedKeys={[key]}
            onClick={menuOnClick}
            className="shadow-md"
          />
          {extra}
        </Col>
        <Col xs={24} sm={18} xl={18}>
          {isArray(children) ? (
            children.find((o) => o.props.menuKey === key) ?? null
          ) : (
            <ShadowCard>{children}</ShadowCard>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Index;
export { PageContent };

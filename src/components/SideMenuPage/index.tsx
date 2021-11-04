import React, { useMemo, useState } from 'react';
import { useLocation, history, Location } from 'umi';
import { Row, Col } from 'antd';
import PageContent, { PageContentProps } from './PageContent';
import SettingsSideBar, {
  SettingsMenuItem,
} from '@/components/Settings/SettingsSideBar';
import globalStyle from '@/global.less';

interface IProps {
  children: Array<React.ReactElement<PageContentProps>>;
  extra?: React.ReactElement | React.ReactNode; // extra component below SideBar
  urlQuery?: boolean; // whether to modify url query on switching
}

const Index: React.FC<IProps> = ({ children, extra, urlQuery = true }) => {
  const location: Location = useLocation();

  const [key, setKey] = useState<string>(
    (() => {
      if (
        urlQuery &&
        location.query?.tab &&
        typeof location.query?.tab === 'string'
      )
        return location.query?.tab;
      const firstValidChild = children.find((o) => o.props.menuKey);
      return firstValidChild?.props?.menuKey ?? '';
    })(),
  );

  const menuItems = useMemo<SettingsMenuItem[]>(() => {
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
    ).filter((o) => Boolean(o));
  }, [children]);

  return (
    <>
      <Row gutter={[{ lg: 24, xl: 24 }, 24]}>
        <Col
          xs={{ span: 24, order: 0 }}
          sm={{ span: 6, order: 0 }}
          xl={{ span: 6, order: 0 }}
        >
          <SettingsSideBar
            items={menuItems}
            selectedKeys={[key]}
            onClick={(event) => {
              setKey(event.key);
              if (urlQuery) {
                history.replace({
                  pathname: location.pathname,
                  query: { tab: event.key.toString() },
                });
              }
            }}
            className={globalStyle.mainBoxShadow}
          />
          {extra}
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 18, order: 1 }}
          xl={{ span: 18, order: 1 }}
        >
          {children.find((o) => o.props.menuKey === key) ?? null}
        </Col>
      </Row>
    </>
  );
};

export default Index;
export { PageContent };

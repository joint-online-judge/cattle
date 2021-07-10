import React, { useMemo } from 'react';
import {useLocation,useHistory} from 'react-router-dom';
import { Row, Col } from 'antd';
import SettingsSideBar, { SettingsMenuItem } from '@/components/Settings/SettingsSideBar';
import ContentCard from './ContentCard';
import PageContent, { PageContentProps } from './PageContent';

interface IProps {
  children: React.ReactElement<PageContentProps>[];
  extra?: React.ReactElement | React.ReactNode;
}


const Index: React.FC<IProps> = ({ children, extra }) => {
  const location:any = useLocation();
  const history = useHistory();
  const firstValidChild = children.find(o => o.props.menuKey);
  const defaultSideKey = firstValidChild && firstValidChild.props.menuKey ? firstValidChild.props.menuKey : '';
  const key = location.query?.tab ? location.query?.tab : defaultSideKey;
  const menuItems = useMemo<SettingsMenuItem[]>(() => {
    return React.Children.map(children, (child: React.ReactElement<PageContentProps>) => {
      if (typeof child === 'object' && child?.props?.menuKey) {
        return {
          menuKey: child.props.menuKey,
          i18nKey: child.props.i18nKey,
          text: child.props.text,
          path: child.props.path,
          node: child.props.node,
          component: child,
        };
      }
      return undefined;
    }).filter(o => !!o);
  }, [children]);

  return (
    <>
      <Row gutter={[{ lg: 24, xl: 32 }, 24]}>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 18, order: 1 }}
          xl={{ span: 18, order: 0 }}
        >
          {children.find(o => o.props.menuKey === key) || null}
        </Col>
        <Col
          xs={{ span: 24, order: 0 }}
          sm={{ span: 6, order: 1 }}
          xl={{ span: 6, order: 1 }}
        >
          <SettingsSideBar
            items={menuItems}
            selectedKeys={[key]}
            onClick={(e) => {
              history.push({
                pathname:location.pathname,
                query:{tab:e.key.toString()},
              } as any);
            }}
          />
          {extra}
        </Col>
      </Row>
    </>
  );
};

export default Index;
export { ContentCard, PageContent };

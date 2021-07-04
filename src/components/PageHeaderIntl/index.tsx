import React from 'react';
import { PageHeader, PageHeaderProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { Link, useIntl, useModel } from 'umi';

function itemRender(
  route: Route,
  params: any,
  routes: Route[],
  paths: string[],
) {
  // console.log(routes, paths, paths.join('/'));
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
  );
}

/***
 * @param {PageHeaderProps} props - Antd PageHeader props
 * @param {string} props.title - i18n key of title
 * @param {string} props.breadcrumb.routes.breadcrumbName - i18n key of breadcrumb title
 * @description This component translate title and breadcrumb text automatically by
 * passing in their keys directly. If routes is not defined in breadcrumb,
 * it will generate the breadcrumb according to current url
 */
const Index: React.FC<PageHeaderProps> = (props) => {
  const { title, breadcrumb, ...otherProps } = props;
  const intl = useIntl();
  const location = useLocation();
  const paths = location.pathname.split('/').slice(1);
  const isHome = location.pathname === '/';
  const { currentLang } = useModel('lang');

  const breadCrumbProps = React.useMemo(() => {
    if (isHome) {
      return undefined;
    }
    if (breadcrumb && breadcrumb?.routes) {
      return {
        ...breadcrumb,
        routes: breadcrumb.routes.map((route) => ({
          ...route,
          breadcrumbName: intl.formatMessage({ id: route.breadcrumbName }),
        })),
        itemRender,
      };
    } else if (breadcrumb) {
      const routes = paths.map((path) => {
        return {
          path,
          // assume that the default key is the upper case of the url path
          breadcrumbName: intl.formatMessage({ id: path.toUpperCase() }),
        };
      });
      return {
        ...breadcrumb,
        routes,
        itemRender,
      };
    } else {
      return breadcrumb;
    }
  }, [currentLang, location]);

  return (
    <PageHeader
      breadcrumb={breadCrumbProps}
      {...otherProps}
    />
  );
};

export default Index;

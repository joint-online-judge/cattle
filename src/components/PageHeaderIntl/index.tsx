import React from 'react';
import { PageHeader, PageHeaderProps } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useIntl, useModel, Link } from 'umi';

function itemRender(route: Route, params: any, routes: Route[], paths: string[]) {
  console.log(routes, paths, paths.join('/'));
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
 * passing in their keys directly.
 */
const Index: React.FC<PageHeaderProps> = props => {
  const { title, breadcrumb, ...otherProps } = props;
  const intl = useIntl();
  const { currentLang } = useModel('lang');

  const breadCrumbProps = React.useMemo(() => {
    if (breadcrumb && breadcrumb?.routes) {
      return {
        ...breadcrumb,
        routes: breadcrumb.routes.map(route => ({
          ...route,
          breadcrumbName: intl.formatMessage({ id: route.breadcrumbName }),
        })),
        itemRender,
      };
    } else if (breadcrumb) {
      return {
        ...breadcrumb,
        itemRender,
      };
    } else {
      return breadcrumb;
    }
  }, [currentLang]);

  return (
    <PageHeader
      title={title && typeof title === 'string' ? intl.formatMessage({ id: title }) : undefined}
      breadcrumb={breadCrumbProps}
      {...otherProps}
    />
  );
};

export default Index;

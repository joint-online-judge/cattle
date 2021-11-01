import React, { useEffect, useState } from 'react';
import { PageHeader, PageHeaderProps } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useModel, useIntl, Link } from 'umi';

function itemRender(
  route: Route,
  params: any,
  routes: Route[],
  paths: string[],
) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
  );
}

const Index: React.FC<PageHeaderProps> = (props) => {
  const { ...otherProps } = props;
  const intl = useIntl();
  const [pageHeaderProps, setPageHeaderProps] = useState<PageHeaderProps>({});
  const { header, headerVisible } = useModel('pageHeader');

  useEffect(() => {
    setPageHeaderProps({
      title: header.titleI18nKey
        ? intl.formatMessage({ id: header.titleI18nKey })
        : header.title,
      subTitle: header.subTitleI18nKey
        ? intl.formatMessage({ id: header.subTitleI18nKey })
        : header.subTitle,
      breadcrumb: {
        routes: header.routes
          ? header.routes.map((r) => ({
              ...r,
              breadcrumbName: r.breadcrumbI18nKey
                ? intl.formatMessage({ id: r.breadcrumbI18nKey })
                : (r.breadcrumbName as string),
            }))
          : header.routes,
        itemRender,
      },
    });
  }, [header]);

  return headerVisible ? (
    <PageHeader {...pageHeaderProps} {...otherProps} />
  ) : null;
};

export default Index;

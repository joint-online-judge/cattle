import React, { useEffect, useState } from 'react';
import { PageHeader, PageHeaderProps, Skeleton } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useModel, useIntl, Link } from 'umi';

function itemRender(
  route: Route,
  parameters: any,
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
      title: header.titleI18nKey ? (
        <h1 className="m-0 text-3xl font-light">
          {intl.formatMessage({ id: header.titleI18nKey })}
        </h1>
      ) : header.title ? (
        <h1 className="m-0 text-3xl font-light">{header.title}</h1>
      ) : (
        <Skeleton.Input active={true} style={{ width: 240 }} />
      ),
      subTitle: header.subTitleI18nKey
        ? intl.formatMessage({ id: header.subTitleI18nKey })
        : header.subTitle,
      breadcrumb: {
        routes: header.routes
          ? header.routes.map((r) => ({
              ...r,
              breadcrumbName: r.breadcrumbI18nKey
                ? intl.formatMessage({ id: r.breadcrumbI18nKey })
                : r.breadcrumbName!,
            }))
          : header.routes,
        itemRender,
      },
    });
  }, [header, intl]);

  return headerVisible ? (
    <PageHeader
      style={{ paddingLeft: 0, paddingRight: 0 }}
      {...pageHeaderProps}
      {...otherProps}
    />
  ) : null;
};

export default Index;

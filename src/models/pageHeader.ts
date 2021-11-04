import { useState } from 'react';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';

type BasicHeader = {
  title?: string;
  titleI18nKey?: string;
  subTitle?: string;
  subTitleI18nKey?: string;
  routes?: Array<Partial<Route> & { path: string; breadcrumbI18nKey?: string }>;
};

/**
 * Global pageHeader data model.
 * Note that we only provide a minimal PageHeader supporting only text here.
 * If you want to use a more advanced PageHeader, please set this as null,
 * and add a new PageHeader to your page.
 */
export default function PageHeaderModel() {
  const [header, setHeaderValue] = useState<BasicHeader>({});
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);

  const removeHeader = () => {
    setHeaderValue({});
    setHeaderVisible(false);
  };

  const setHeader = (h: BasicHeader) => {
    setHeaderValue(h);
    setHeaderVisible(true);
  };

  return {
    header,
    setHeader,
    removeHeader,
    headerVisible,
  };
}

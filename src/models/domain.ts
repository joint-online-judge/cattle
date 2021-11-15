import { useState } from 'react';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { Horse } from '@/utils/service';

/**
 * Global domain data model.
 * Every page below a domain and uses domain data should use this model.
 * Data are initialized in the domain layout component.
 * Specially, you can consider this model as loading the `domainUrl`
 * in the site URL.
 */
export default function DomainModel() {
  const [domainUrl, setDomainUrl] = useState<string>();

  const {
    data: domain,
    run: fetchDomain,
    loading,
    refresh,
  } = useRequest(
    async (domainUrl: string | undefined | null) => {
      if (typeof domainUrl === 'string' && domainUrl.length > 0) {
        setDomainUrl(domainUrl);
        const res = await Horse.domain.getDomainApiV1DomainsDomainGet(
          domainUrl,
        );
        return res.data.data;
      } else {
        setDomainUrl(undefined);
        return undefined;
      }
    },
    {
      manual: true,
      onError: () => {
        // TODO: i18n message
        message.error('failed to fetch domain info');
      },
    },
  );

  return {
    domainUrl,
    domain,
    fetchDomain,
    refresh,
    loading,
  };
}

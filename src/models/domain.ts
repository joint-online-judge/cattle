import { useState } from 'react';
import { AxiosError } from 'axios';
import { useModel } from 'umi';
import { useRequest } from 'ahooks';
import Horse, { ErrorCode } from '@/utils/service';

/**
 * Global domain data model.
 * Every page below a domain and uses domain data should use this model.
 * Data are initialized in the domain layout component.
 * Specially, you can consider this model as loading the `domainUrl`
 * in the site URL.
 */
export default function DomainModel() {
  const [domainUrl, setDomainUrl] = useState<string>();
  const [errorCode, setErrorCode] = useState<ErrorCode | 403>();
  const { initialState, setInitialState } = useModel('@@initialState');

  const {
    data,
    run: fetchDomain,
    loading,
    refresh,
  } = useRequest(
    async (domainUrl: string | undefined | null) => {
      if (typeof domainUrl === 'string' && domainUrl.length > 0) {
        setDomainUrl(domainUrl);
        const res = await Horse.domain.v1GetDomain(domainUrl);

        if (res.data.errorCode !== ErrorCode.Success) {
          setErrorCode(res.data.errorCode);
          return;
        }

        const perm = await Horse.domain.v1GetDomainUserPermission(
          domainUrl,
          'me',
        );

        if (perm.data.errorCode === ErrorCode.Success) {
          // All requests succeeded
          setErrorCode(undefined);
        } else {
          // Note: possible that user is root but not in the domain
          setErrorCode(perm.data.errorCode);
        }

        return {
          domain: res.data.data,
          role: perm.data.data?.role,
          permission: perm.data.data?.permission,
        };
      }

      setDomainUrl(undefined);
      return undefined;
    },
    {
      manual: true,
      onSuccess: (res) => {
        // @ts-expect-error
        setInitialState({
          ...initialState,
          domainPermission: {
            role: res?.role,
            permission: res?.permission,
          },
        }); // For access.ts to get permissions
      },
      onError: (error) => {
        if ((error as AxiosError)?.response?.status === 403) {
          setErrorCode(403);
        }
      },
    },
  );

  return {
    domainUrl,
    domain: data?.domain,
    role: data?.role,
    permission: data?.permission,
    fetchDomain,
    refresh,
    loading,
    errorCode,
  };
}

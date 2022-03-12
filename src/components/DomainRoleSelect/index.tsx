import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Select, SelectProps } from 'antd';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';

interface IProps extends SelectProps<string> {
  domainUrl: string;
}

const Index: React.FC<IProps> = (props) => {
  const { domainUrl, ...otherProps } = props;
  const intl = useIntl();
  const [disabled, setDisabled] = useState<boolean>(false);

  const { data, loading } = useRequest(
    async () => {
      const response = await Horse.domain.v1ListDomainRoles(domainUrl);
      return response.data.data?.results ?? [];
    },
    {
      refreshDeps: [domainUrl],
      onError: () => {
        setDisabled(true);
      },
    },
  );

  const options = React.useMemo(
    () =>
      (data ?? []).map((role) => ({
        label: role.role,
        value: role.role,
      })),
    [data],
  );

  return (
    <Select
      loading={loading}
      options={options}
      disabled={disabled}
      placeholder={
        disabled
          ? intl.formatMessage({
              id: 'form.domain_role_select.error_placeholder',
            })
          : intl.formatMessage({ id: 'form.domain_role_select.placeholder' })
      }
      {...otherProps}
    />
  );
};

export default Index;

import React, { useState } from 'react';
import { Select, SelectProps } from 'antd';
import { useRequest } from 'ahooks';
import { Horse } from '@/utils/service';

interface IProps extends SelectProps<string> {
  domainUrl: string;
}

const Index: React.FC<IProps> = (props) => {
  const { domainUrl, ...otherProps } = props;
  const [disabled, setDisabled] = useState<boolean>(false);

  const { data, loading } = useRequest(
    async () => {
      const response =
        await Horse.domain.listDomainRolesApiV1DomainsDomainRolesGet(domainUrl);
      return response.data.data?.results || [];
    },
    {
      refreshDeps: [domainUrl],
      onError: () => {
        setDisabled(true);
      },
    },
  );

  const options = React.useMemo(() => {
    return (data || []).map((role) => ({
      label: role.role,
      value: role.role,
    }));
  }, [data]);

  return (
    <Select
      loading={loading}
      options={options}
      disabled={disabled}
      placeholder={disabled ? '加载选项失败' : '请选择一个角色'}
      {...otherProps}
    />
  );
};

export default Index;

import React, { useState } from 'react';
import { useIntl, useModel } from 'umi';
import { useRequest } from 'ahooks';
import { Select, SelectProps, Spin, Empty, Space } from 'antd';
import Gravatar from '@/components/Gravatar';
import { Horse, UserWithDomainRole } from '@/utils/service';

interface IProps extends SelectProps<string> {
  domainUrl: string;
}

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

const { Option } = Select;
const Index: React.FC<IProps> = (props) => {
  const { domainUrl, ...otherProps } = props;

  const { data, run, loading } = useRequest(
    async (query: string) => {
      if (typeof query !== 'string') return [];
      if (query.length < 2) return [];

      const response =
        await Horse.domain.searchDomainCandidatesApiV1DomainsDomainCandidatesGet(
          domainUrl,
          { query },
        );
      return response.data.data?.results || [];
    },
    {
      manual: true,
      debounceInterval: 500,
      refreshDeps: [domainUrl],
      onSuccess: () => {},
      onError: () => {},
    },
  );

  const renderOptions = (userList: UserWithDomainRole[] | undefined) => {
    return (userList ?? []).map((u) => (
      <Option
        label={`${u.username} (${u.realName})`}
        value={u.id}
        disabled={!!u.domainRole}
      >
        <Space>
          <Gravatar gravatar={u.gravatar} size="small" />
          <span>{`${u.username} (${u.realName})`}</span>
          {u.studentId ? <span> - {u.studentId}</span> : null}
        </Space>
      </Option>
    ));
  };

  return (
    <Select<string>
      showArrow={false}
      allowClear={true}
      filterOption={false}
      showSearch={true}
      optionLabelProp="label"
      onSearch={run}
      notFoundContent={
        loading ? (
          <Spin size="small" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      {...otherProps}
    >
      {renderOptions(data)}
    </Select>
  );
};

export default Index;

import React, { useState } from 'react';
import { useIntl } from 'umi';
import { useRequest } from 'ahooks';
import { Select, SelectProps, Spin, Empty, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import Gravatar from '@/components/Gravatar';
import { Horse, UserWithDomainRole } from '@/utils/service';

interface IProps extends SelectProps<string> {
  domainUrl: string;
}

const { Option } = Select;
const Index: React.FC<IProps> = (props) => {
  const { domainUrl, ...otherProps } = props;
  const intl = useIntl();
  const [searchWord, setSearchWord] = useState<string>('');

  const { data, run, loading } = useRequest(
    async (query: string) => {
      if (typeof query !== 'string') {
        return [];
      }

      if (query.length < 2) {
        return [];
      }

      const response = await Horse.domain.v1SearchDomainCandidates(domainUrl, {
        query,
      });
      return response.data.data?.results ?? [];
    },
    {
      manual: true,
      debounceInterval: 500,
      refreshDeps: [domainUrl],
    },
  );

  const renderOptions = (userList: UserWithDomainRole[] | undefined) =>
    (userList ?? []).map((u) => (
      <Option
        label={`${u.username} (${u.realName})`}
        value={u.id}
        disabled={Boolean(u.domainRole)}
      >
        <Row wrap={false} gutter={12} align="middle">
          <Col flex="none">
            <Gravatar gravatar={u.gravatar} />
          </Col>
          <Col flex="auto">
            <Row>
              <Col span={24}>
                <Highlighter
                  highlightStyle={{ paddingLeft: 0, paddingRight: 0 }}
                  searchWords={[searchWord]}
                  autoEscape={false}
                  textToHighlight={
                    u.realName ? `${u.username} (${u.realName})` : u.username
                  }
                />
              </Col>
              <Col span={24}>
                <Highlighter
                  className="text-xs"
                  highlightStyle={{ paddingLeft: 0, paddingRight: 0 }}
                  searchWords={[searchWord]}
                  autoEscape={false}
                  textToHighlight={
                    (u.studentId ?? '') + (u.email ? ` - ${u.email}` : '')
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Option>
    ));

  return (
    <Select<string>
      showArrow={false}
      allowClear={true}
      filterOption={false}
      showSearch={true}
      optionLabelProp="label"
      onSearch={(query) => {
        setSearchWord(query);
        run(query);
      }}
      placeholder={intl.formatMessage({
        id: 'form.domain_candidate_search.placeholder',
      })}
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

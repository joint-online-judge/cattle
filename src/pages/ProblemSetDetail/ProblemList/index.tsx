import React from 'react';
import { List, Button, Empty, Space, Table } from 'antd';
import { history, Link, useParams, useIntl } from 'umi';
import { isArray, isNil } from 'lodash';
import { ProblemPreviewWithLatestRecord, RecordState } from '@/utils/service';

interface IProps {
  problems: ProblemPreviewWithLatestRecord[] | undefined;
}

const Index: React.FC<IProps> = ({ problems }) => {
  const intl = useIntl();
  const { domainUrl, problemSetId } =
    useParams<{ problemSetId: string; domainUrl: string }>();

  const a = (
    <List
      itemLayout="horizontal"
      size="large"
      dataSource={problems ?? []}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/domain/${domainUrl}/problem/${item.id ?? ''}`}>
            <strong>{item.title}</strong>
          </Link>
        </List.Item>
      )}
    />
  );

  const columns = [
    {
      title: intl.formatMessage({ id: 'PROBLEM.STATUS' }),
      dataIndex: 'recordState',
      width: 120,
      render: (_: any, row: ProblemPreviewWithLatestRecord) =>
        row.latestRecord?.state,
    },
    {
      title: intl.formatMessage({ id: 'PROBLEM' }),
      dataIndex: 'title',
      render: (_: any, row: ProblemPreviewWithLatestRecord) => (
        <Link
          to={`/domain/${domainUrl}/problem-set/${problemSetId}/p/${
            row.url ?? row.id
          }`}
        >
          {row.title}
        </Link>
      ),
    },
  ];

  return isArray(problems) && problems.length > 0 ? (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={problems}
      pagination={false}
    />
  ) : (
    <Empty description={<span>There are no problems</span>}>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            history.push(
              `/domain/${domainUrl}/problem-set/${problemSetId}/settings`,
            );
          }}
        >
          Add or Clone
        </Button>
      </Space>
    </Empty>
  );
};

export default Index;

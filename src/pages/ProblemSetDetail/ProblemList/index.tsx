import { List, Button, Empty, Space } from 'antd';
import React from 'react';
import { Link, useParams, useAccess } from 'umi';
import { ProblemPreview } from '@/utils/service';
import { isArray } from 'lodash';

interface IProps {
  problems: ProblemPreview[] | undefined;
}

const Index: React.FC<IProps> = ({ problems }) => {
  const access = useAccess();
  const { domainUrl } =
    useParams<{ problemSetId: string; domainUrl: string }>();

  return isArray(problems) && problems.length > 0 ? (
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
  ) : (
    <Empty description={<span>There are not problems</span>}>
      <Space>
        <Button type="primary">Add Existed</Button>
        <span>or</span>
        <Button type="primary">Clone</Button>
      </Space>
    </Empty>
  );
};

export default Index;

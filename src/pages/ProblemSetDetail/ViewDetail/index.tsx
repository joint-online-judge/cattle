import React from 'react';
import { useIntl } from 'umi';
import {
  message,
  Typography,
  Spin,
  Button,
  Row,
  Col,
  Progress,
  Menu,
} from 'antd';
import { ProblemSetDetail } from '@/utils/service';
import { VERTICAL_GUTTER } from '@/constants';

import ProblemList from '../ProblemList';
import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

interface IProps {
  problemSet: ProblemSetDetail | undefined;
  loading: boolean;
}

const Index: React.FC<IProps> = ({ problemSet, loading }) => {
  const intl = useIntl();

  return (
    <Row gutter={VERTICAL_GUTTER}>
      {problemSet?.content ? (
        <Col span={24}>
          <ShadowCard
            title={intl.formatMessage({ id: 'PROBLEM_SET.INTRODUCTION' })}
          >
            <Spin spinning={!problemSet}>
              {problemSet ? (
                <Typography>
                  <MarkdownRender>{problemSet.content ?? ''}</MarkdownRender>
                </Typography>
              ) : null}
            </Spin>
          </ShadowCard>
        </Col>
      ) : null}

      <Col span={24}>
        <ShadowCard
          loading={loading}
          title={intl.formatMessage({ id: 'PROBLEM' })}
          bodyStyle={
            problemSet?.problems && problemSet.problems.length > 0
              ? {
                  padding: 0,
                }
              : undefined
          }
        >
          <ProblemList problems={problemSet?.problems} />
        </ShadowCard>
      </Col>
    </Row>
  );
};

export default Index;

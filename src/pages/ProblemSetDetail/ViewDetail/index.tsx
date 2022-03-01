import React from 'react';
import { useIntl, useModel } from 'umi';
import { Typography, Spin, Row, Col } from 'antd';
import ProblemList from '../ProblemList';
import { VERTICAL_GUTTER } from '@/constants';

import ShadowCard from '@/components/ShadowCard';
import MarkdownRender from '@/components/MarkdownRender';

const Index: React.FC = () => {
  const intl = useIntl();
  const { problemSet, loading } = useModel('problemSet');

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

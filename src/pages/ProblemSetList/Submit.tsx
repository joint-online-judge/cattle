import React, { useMemo } from 'react';
import { Table, Select, Row, Col, Form, Button, Upload } from 'antd';
import { useIntl } from 'umi';
import { InboxOutlined } from '@ant-design/icons';
import { isArray } from 'lodash';
import { Problem, Horse } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';

interface IProps {
  problem: Problem | undefined;
}

const Index: React.FC<IProps> = (props) => {
  const intl = useIntl();
  const { problem } = props;

  const columns = [
    {
      title: intl.formatMessage({ id: 'PROBLEM.STATUS' }),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: intl.formatMessage({ id: 'PROBLEM.MEMORY_KB' }),
      dataIndex: 'memory_kb',
      key: 'memory_kb',
    },
    {
      title: intl.formatMessage({ id: 'PROBLEM.TIME_MS' }),
      dataIndex: 'time_ms',
      key: 'time_ms',
    },
    {
      title: intl.formatMessage({ id: 'PROBLEM.SUBMIT_AT' }),
      dataIndex: 'submit_at',
      key: 'submit_at',
    },
  ];

  const data = [
    {
      id: '1',
      status: 'ac',
      memory_kb: '1kb',
      time_ms: '1ms',
      submit_at: '2019',
    },
  ];

  const onFinish = (values: any) => {
    Horse.problem.v1SubmitSolutionToProblem(problem?.id ?? '', values);
    // submitProblem(problem?.id || '', values);
    console.log(values);
  };

  const languageOptions = useMemo(() => {
    return isArray(problem?.languages)
      ? problem?.languages.map((lang) => (
          <Select.Option value={lang} key={lang}>
            {lang}
          </Select.Option>
        ))
      : null;
  }, [problem]);

  return (
    <>
      <ShadowCard title={intl.formatMessage({ id: 'PROBLEM.RECENT_RECORD' })}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </ShadowCard>
      <br />
      <br />
      <ShadowCard title={intl.formatMessage({ id: 'PROBLEM.SUBMIT' })}>
        <Row>
          <Col span={10}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={intl.formatMessage({ id: 'PROBLEM.LANGUAGES' })}
                name="language"
                required={true}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder={intl.formatMessage(
                    { id: 'FORM.SELECT_PLACEHOLDER' },
                    { field: intl.formatMessage({ id: 'PROBLEM.LANGUAGES' }) },
                  )}
                >
                  {languageOptions}
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ id: 'PROBLEM.UPLOAD_FILE' })}
                getValueFromEvent={({ file }) => {
                  return file;
                }}
                name="file"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'PROBLEM.UPLOAD_FILE.MISSING',
                    }),
                  },
                ]}
              >
                <Upload.Dragger
                  maxCount={1}
                  beforeUpload={() => false}
                  accept="text/*,.zip,.rar,.tar"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {intl.formatMessage({ id: 'PROBLEM.UPLOAD_HELP_CLICK' })}
                  </p>
                  <p className="ant-upload-hint">
                    {intl.formatMessage({ id: 'PROBLEM.UPLOAD_HELP_DRAG' })}
                  </p>
                </Upload.Dragger>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {intl.formatMessage({ id: 'PROBLEM.SUBMIT' })}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </ShadowCard>
    </>
  );
};

export default Index;

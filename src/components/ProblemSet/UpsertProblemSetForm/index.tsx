import React from 'react';
import {
  Form,
  Input,
  DatePicker,
  Switch,
  Row,
  Col,
  Button,
  message,
} from 'antd';
import { useIntl, history } from 'umi';
import { useRequest } from 'ahooks';
import style from './style.css';
import {
  Horse,
  ProblemSet,
  ProblemSetCreate,
  ProblemSetEdit,
} from '@/utils/service';

export interface IProps {
  initialValues?: Partial<ProblemSet>;
}

export const UpsertProblemSetForm: React.FC<IProps> = (props) => {
  const { initialValues } = props;
  const intl = useIntl();

  const { run: createProblemSet, loading: creatingProblemSet } = useRequest(
    (problemSet: ProblemSetCreate) =>
      Horse.problemSet.createProblemSetApiV1ProblemSetsPost(problemSet),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.data?.data?.id) {
          message.success('create success');
          history.push(`/problem-set/${res.data.data.id}`);
        }
      },
    },
  );

  const { run: updateProblemSet, loading: updatingProblemSet } = useRequest(
    (id: string, problemSet: ProblemSetEdit) =>
      Horse.problemSet.updateProblemSetApiV1ProblemSetsProblemSetPatch(
        id,
        problemSet,
      ),
    {
      manual: true,
      onSuccess: (res) => {
        // todo: add errCode
        message.success('update success');
      },
    },
  );

  const onFinish = (values: Partial<ProblemSet>) => {
    if (initialValues?.domain) {
      values.domain = initialValues.domain;
      if (initialValues?.id) {
        return updateProblemSet(initialValues?.id, values);
      } else {
        return createProblemSet(values as ProblemSetCreate);
      }
    }
  };

  console.log(initialValues)

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        name="title"
        label={intl.formatMessage({ id: 'TITLE' })}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="url"
        label={intl.formatMessage({ id: 'PROBLEM_SET.CREATE.FORM.URL' })}
        tooltip={'The url of a problem set must be unique within a domain.'}
      >
        <Input />
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item
            name="available_time"
            label={intl.formatMessage({
              id: 'PROBLEM_SET.CREATE.FORM.AVAILABLE_TIME',
            })}
            rules={[{ required: true }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="due_time"
            label={intl.formatMessage({
              id: 'PROBLEM_SET.CREATE.FORM.DUE_TIME',
            })}
            rules={[{ required: true }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="hidden"
            valuePropName="checked"
            label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.HIDDEN' })}
            rules={[{ required: true }]}
          >
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="scoreboard_hidden"
            valuePropName="checked"
            label={intl.formatMessage({
              id: 'PROBLEM_SET.CREATE.FORM.SCOREBOARD_HIDDEN',
            })}
            rules={[{ required: true }]}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="content"
        label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.CONTENT' })}
        extra={'TODO: there should be a markdown editor here.'}
      >
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item>
        <Row justify="center">
          <Col xs={9} sm={8} md={6}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              className={style.submitButton}
            >
              {intl.formatMessage({
                id: 'PROBLEM.SUBMIT',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

import React from 'react';
import {
  Form,
  Input,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Button,
  message,
} from 'antd';
import { useIntl, history } from 'umi';
import { useRequest } from 'ahooks';
import style from './style.css';
import { ProblemSetService, ProblemSet, ProblemSetCreate, ProblemSetEdit } from '@/client';

export interface IProps {
  initialValues?: Partial<ProblemSet>;
}

export const UpsertProblemSetForm: React.FC<IProps> = (props) => {
  const { initialValues } = props;
  const intl = useIntl();

  const { run: createProblemSet, loading: creatingProblemSet } = useRequest(
    (problemSet: ProblemSetCreate) =>
      ProblemSetService.createProblemSetApiV1ProblemSetsPost(problemSet),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data?.id) {
          message.success('create success');
          history.push(`/problem-set/${res.data.id}`);
        }
      },
    });

  const { run: updateProblemSet, loading: updatingProblemSet } = useRequest(
    (id: string, problemSet: ProblemSetEdit) =>
      ProblemSetService.updateProblemSetApiV1ProblemSetsProblemSetPatch(id, problemSet),
    {
      manual: true,
      onSuccess: (res) => {
        // todo: add errCode
        message.success('update success');
      },
    });

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

  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
    >
      <Form.Item
        name='title'
        label={intl.formatMessage(
          { id: 'PROBLEM.CREATE.FORM.TITLE' })}
      >
        <Input />
      </Form.Item>
      <Row>
        <Col span={8}>
          <Form.Item
            name='hidden'
            label={intl.formatMessage(
              { id: 'PROBLEM.CREATE.FORM.HIDDEN' })}
            valuePropName='checked'
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            name='scoreboard_hidden'
            label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.SCOREBOARD_HIDDEN' })}
            valuePropName='checked'
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="available_time" label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.AVAILABLE_TIME' })}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item name="due_time" label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.DUE_TIME' })}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item
        name='url'
        label={intl.formatMessage(
          { id: 'PROBLEM.CREATE.FORM.URL' })}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='content'
        label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.CONTENT' })}
        extra={'TODO: there should be a markdown editor here.'}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Row justify='center'>
          <Col xs={9} sm={8} md={6}>
            <Button
              htmlType="submit"
              type="primary"
              size='large'
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

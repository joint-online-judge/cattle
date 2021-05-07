import React from 'react';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Row,
  Col,
  Button,
} from 'antd';
import { useIntl } from '@@/plugin-locale/localeExports';
import { SUPPORT_PROGRAMMING_LANGUAGE } from '@/constants';
import { useRequest } from 'ahooks';
import style from './style.css';
import { ProblemService, ProblemCreate, Problem, ProblemEdit } from '@/client';

export interface IProps {
  initialValues?: Partial<Problem>;
}

export const CreateUpdateProblem: React.FC<IProps> = (props) => {
  const { initialValues } = props;
  const intl = useIntl();
  const languageOptions = SUPPORT_PROGRAMMING_LANGUAGE.map((lang) => {
    return (
      {
        value: lang,
      }
    );
  });

  const { run: createProblem, loading: creatingProblem } = useRequest(
    (problem: ProblemCreate) => ProblemService.createProblemApiV1ProblemsPost(
      problem), {
      manual: true,
      onSuccess: (res) => {
        console.log('create success');
      },
    });

  const { run: updateProblem, loading: updatingProblem } = useRequest(
    (
      id: string,
      problem: ProblemEdit) => ProblemService.updateProblemApiV1ProblemsProblemPatch(
      id, problem), {
      manual: true,
      onSuccess: (res) => {
        // todo: add errCode
        console.log('update success');
      },
    });

  const onFinish = (values: Partial<Problem>) => {
    if (initialValues?.domain) {
      values.domain = initialValues.domain;
      if (initialValues?.id) {
        return updateProblem(initialValues?.id, values);
      } else {
        return createProblem(values as ProblemCreate);
      }
    }
  };
  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
    >
      <Row>
        <Col span={16}>
          <Form.Item
            name='title'
            label={intl.formatMessage(
              { id: 'PROBLEM.CREATE.FORM.TITLE' })}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col push={2}>
          <Form.Item
            name='hidden'
            label={intl.formatMessage(
              { id: 'PROBLEM.CREATE.FORM.HIDDEN' })}
            valuePropName='checked'
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name='languages'
        label={intl.formatMessage(
          { id: 'PROBLEM.CREATE.FORM.LANGUAGES' })}
      >
        <Select
          allowClear
          mode='multiple'
          showArrow
          options={languageOptions}
        />
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
                id: 'PROBLEM.CREATE.FORM.SUBMIT',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

import React from 'react';
import { Form, Input, Select, Checkbox, Row, Col, Button, message } from 'antd';
import { useIntl, history } from 'umi';
import { useRequest } from 'ahooks';
import style from '../style.css';
import { SUPPORT_PROGRAMMING_LANGUAGE } from '@/constants';
import { Horse, ProblemCreate, Problem, ProblemEdit } from '@/utils/service';

export interface IProps {
  initialValues?: Partial<Problem>;
  domainUrl: string;
}

export const UpsertProblemForm: React.FC<IProps> = (props) => {
  const { domainUrl, initialValues } = props;
  const intl = useIntl();
  const languageOptions = SUPPORT_PROGRAMMING_LANGUAGE.map((lang) => {
    return {
      value: lang,
    };
  });

  const { run: createProblem } = useRequest(
    async (problem: ProblemCreate) =>
      Horse.problem.createProblemApiV1DomainsDomainProblemsPost(
        domainUrl,
        problem,
      ),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.data?.data?.id) {
          message.success('create success');
          history.push(`/domain/${domainUrl}/problem/${res.data.data.id}`);
        }
      },
    },
  );

  const { run: updateProblem } = useRequest(
    async (id: string, problem: ProblemEdit) =>
      Horse.problem.updateProblemApiV1DomainsDomainProblemsProblemPatch(
        domainUrl,
        id,
        problem,
      ),
    {
      manual: true,
      onSuccess: (res) => {
        // todo: add errCode
        console.log(res);
      },
    },
  );

  const onFinish = async (values: Partial<Problem>) => {
    return initialValues?.id
      ? updateProblem(initialValues?.id, values)
      : createProblem(values as ProblemCreate);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Row>
        <Col span={16}>
          <Form.Item name="title" label={intl.formatMessage({ id: 'TITLE' })}>
            <Input />
          </Form.Item>
        </Col>
        <Col push={2}>
          <Form.Item
            name="hidden"
            label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.HIDDEN' })}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="languages"
        label={intl.formatMessage({ id: 'PROBLEM.LANGUAGES' })}
      >
        <Select
          allowClear
          mode="multiple"
          showArrow
          options={languageOptions}
        />
      </Form.Item>
      <Form.Item
        name="content"
        label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.CONTENT' })}
        extra={'TODO: there should be a markdown editor here.'}
      >
        <Input.TextArea />
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

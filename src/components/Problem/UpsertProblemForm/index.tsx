import React from 'react';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { Form, Input, Select, Checkbox, Row, Col, Button, message } from 'antd';
import { useIntl, history } from 'umi';
import { useRequest } from 'ahooks';
import { SUPPORT_PROGRAMMING_LANGUAGE } from '@/constants';
import {
  Horse,
  ProblemCreate,
  Problem,
  ProblemEdit,
  ErrorCode,
} from '@/utils/service';
import MarkdownEditor from '@/components/MarkdownEditor';
import style from '../style.css';

export interface IProps {
  initialValues?: Partial<Problem>;
  domainUrl: string;
}

export const UpsertProblemForm: React.FC<IProps> = (props) => {
  const { domainUrl, initialValues } = props;
  const intl = useIntl();
  const languageOptions = SUPPORT_PROGRAMMING_LANGUAGE.map((lang) => {
    return {
      label: lang,
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
        if (res.data.errorCode === ErrorCode.IntegrityError) {
          message.error('IntegrityError');
        } else if (res?.data?.data?.id) {
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
    initialValues?.id
      ? await updateProblem(initialValues?.id, values)
      : await createProblem(values as ProblemCreate);
  };

  return (
    <ProForm<ProblemCreate | ProblemEdit>
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      omitNil
    >
      <ProForm.Group>
        <ProFormText
          width="lg"
          name="title"
          label={intl.formatMessage({ id: 'TITLE' })}
          rules={[{ required: true }]}
        />
        <ProFormSwitch
          name="hidden"
          label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.HIDDEN' })}
          rules={[{ required: true }]}
        />
      </ProForm.Group>

      <ProFormText
        width="lg"
        name="url"
        label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.URL' })}
        tooltip={'The url of a problem must be unique within a domain.'}
      />

      <ProFormSelect
        width="lg"
        name="languages"
        label={intl.formatMessage({ id: 'PROBLEM.LANGUAGES' })}
        fieldProps={{
          showArrow: true,
          allowClear: true,
          mode: 'multiple',
          options: languageOptions,
        }}
      />

      <Form.Item
        name="content"
        label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.CONTENT' })}
      >
        <MarkdownEditor />
      </Form.Item>
    </ProForm>
  );
};

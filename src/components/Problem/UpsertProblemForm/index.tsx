import React from 'react';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { Form, message } from 'antd';
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

export interface IProps {
  domainUrl: string;
  initialValues?: Partial<Problem>;
  onCreateSuccess?: (problem: Problem) => void;
  onUpdateSuccess?: (problem: Problem) => void;
}

export const UpsertProblemForm: React.FC<IProps> = (props) => {
  const { domainUrl, initialValues, onCreateSuccess, onUpdateSuccess } = props;
  const intl = useIntl();
  const languageOptions = SUPPORT_PROGRAMMING_LANGUAGE.map((lang) => ({
    label: lang,
    value: lang,
  }));

  const { run: createProblem } = useRequest(
    async (problem: ProblemCreate) =>
      Horse.problem.v1CreateProblem(domainUrl, problem),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.errorCode === ErrorCode.IntegrityError) {
          message.error('problem url not unique');
        } else if (res?.data?.data?.id) {
          message.success(intl.formatMessage({ id: 'msg.success.create' }));
          if (onCreateSuccess) onCreateSuccess(res.data.data);
          history.push(
            `/domain/${domainUrl}/problem/${
              res.data.data.url ?? res.data.data.id
            }`,
          );
        }
      },
    },
  );

  const { run: updateProblem } = useRequest(
    async (id: string, problem: ProblemEdit) =>
      Horse.problem.v1UpdateProblem(domainUrl, id, problem),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.errorCode === ErrorCode.IntegrityError) {
          message.error('problem url not unique');
        } else if (res.data.data) {
          message.success(intl.formatMessage({ id: 'msg.success.update' }));
          if (onUpdateSuccess) onUpdateSuccess(res.data.data);
          history.push(
            `/domain/${domainUrl}/problem/${
              res.data.data?.url ?? res.data.data?.id
            }`,
          );
        }
      },
    },
  );

  const onFinish = async (values: Partial<Problem>) => {
    await (initialValues?.id
      ? updateProblem(initialValues.id, values)
      : createProblem(values as ProblemCreate));
  };

  return (
    <ProForm<ProblemCreate | ProblemEdit>
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      dateFormatter="number"
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

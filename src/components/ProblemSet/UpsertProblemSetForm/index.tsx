import React from 'react';
import { Form, Row, Col, message } from 'antd';
import ProForm, {
  ProFormText,
  ProFormDateTimePicker,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { useIntl, history } from 'umi';
import { useRequest } from 'ahooks';
import {
  Horse,
  ProblemSet,
  ProblemSetCreate,
  ProblemSetEdit,
} from '@/utils/service';
import MarkdownEditor from '@/components/MarkdownEditor';

export interface IProps {
  initialValues?: Partial<ProblemSet>;
  domainUrl: string;
}

const UpsertProblemSetForm: React.FC<IProps> = (props) => {
  const { domainUrl, initialValues } = props;
  const intl = useIntl();

  const { run: createProblemSet, loading: creatingProblemSet } = useRequest(
    async (problemSet: ProblemSetCreate) =>
      Horse.problemSet.createProblemSetApiV1DomainsDomainProblemSetsPost(
        domainUrl,
        problemSet,
      ),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.data?.data?.id) {
          message.success('create success');
          history.push(`/domain/${domainUrl}/problem-set/${res.data.data.id}`);
        }
      },
    },
  );

  const { run: updateProblemSet, loading: updatingProblemSet } = useRequest(
    async (id: string, problemSet: ProblemSetEdit) =>
      Horse.problemSet.updateProblemSetApiV1DomainsDomainProblemSetsProblemSetPatch(
        domainUrl,
        id,
        problemSet,
      ),
    {
      manual: true,
      onSuccess: (_res) => {
        // todo: add errCode
        message.success('update success');
      },
    },
  );

  const onFinish = async (values: ProblemSetCreate | ProblemSetEdit) => {
    initialValues?.id
      ? await updateProblemSet(initialValues?.id, values)
      : await createProblemSet(values as ProblemSetCreate);
  };

  return (
    <ProForm<ProblemSetCreate | ProblemSetEdit>
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      omitNil
    >
      <ProFormText
        width="lg"
        name="title"
        label={intl.formatMessage({ id: 'TITLE' })}
        rules={[{ required: true }]}
      />
      <ProFormText
        width="lg"
        name="url"
        label={intl.formatMessage({ id: 'PROBLEM_SET.CREATE.FORM.URL' })}
        tooltip={'The url of a problem set must be unique within a domain.'}
      />

      <ProForm.Group>
        <ProFormDateTimePicker
          width="sm"
          name="unlockAt"
          label={intl.formatMessage({
            id: 'PROBLEM_SET.CREATE.FORM.UNLOCK_AT',
          })}
          rules={[{ required: true }]}
        />
        <ProFormDateTimePicker
          width="sm"
          name="dueAt"
          label={intl.formatMessage({
            id: 'PROBLEM_SET.CREATE.FORM.DUE_AT',
          })}
          rules={[{ required: true }]}
        />
        <ProFormDateTimePicker
          width="sm"
          name="lockAt"
          label={intl.formatMessage({
            id: 'PROBLEM_SET.CREATE.FORM.LOCK_AT',
          })}
          rules={[{ required: true }]}
        />
      </ProForm.Group>

      <Row>
        <Col span={12}>
          <ProFormSwitch
            name="hidden"
            valuePropName="checked"
            label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.HIDDEN' })}
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={12}>
          <ProFormSwitch
            name="scoreboardHidden"
            valuePropName="checked"
            label={intl.formatMessage({
              id: 'PROBLEM_SET.CREATE.FORM.SCOREBOARD_HIDDEN',
            })}
            rules={[{ required: true }]}
          />
        </Col>
      </Row>

      <Form.Item
        name="content"
        label={intl.formatMessage({ id: 'PROBLEM.CREATE.FORM.CONTENT' })}
      >
        <MarkdownEditor />
      </Form.Item>
    </ProForm>
  );
};

export { UpsertProblemSetForm };

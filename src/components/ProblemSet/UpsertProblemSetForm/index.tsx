import ProForm, {
  ProFormDateTimePicker,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { useRequest } from 'ahooks';
import { Col, Form, message, Row } from 'antd';
import mm from 'moment';
import React from 'react';
import { history, useIntl } from 'umi';
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
  onUpdateSuccess?: () => void;
}

const UpsertProblemSetForm: React.FC<IProps> = (props) => {
  const { domainUrl, initialValues, onUpdateSuccess } = props;
  const intl = useIntl();

  const { run: createProblemSet, loading: creatingProblemSet } = useRequest(
    async (problemSet: ProblemSetCreate) =>
      Horse.problemSet.v1CreateProblemSet(domainUrl, problemSet),
    {
      manual: true,
      onSuccess: (res) => {
        if (res?.data?.data?.id) {
          message.success(intl.formatMessage({ id: 'msg.success.create' }));
          history.push(
            `/domain/${domainUrl}/problem-set/${
              res.data.data.url ?? res.data.data.id
            }`,
          );
        }
      },
    },
  );

  const { run: updateProblemSet, loading: updatingProblemSet } = useRequest(
    async (id: string, problemSet: ProblemSetEdit) =>
      Horse.problemSet.v1UpdateProblemSet(domainUrl, id, problemSet),
    {
      manual: true,
      onSuccess: (_res) => {
        // todo: add errCode
        message.success(intl.formatMessage({ id: 'msg.success.update' }));
        onUpdateSuccess && onUpdateSuccess();
      },
    },
  );

  const onFinish = async (values: ProblemSetCreate | ProblemSetEdit) => {
    console.log(values);
    console.log(mm(values.unlockAt));
    initialValues?.id
      ? await updateProblemSet(
          initialValues?.id,
          filterChanged(values, initialValues),
        )
      : await createProblemSet(values as ProblemSetCreate);
  };

  function filterChanged(
    problemSet: ProblemSetEdit,
    initial: Partial<ProblemSet>,
  ): ProblemSetEdit {
    return Object.fromEntries(
      Object.entries(problemSet).filter(
        ([key, value]) =>
          key in initial && initial[key as keyof ProblemSetEdit] !== value,
      ),
    );
  }

  return (
    <ProForm<ProblemSetCreate | ProblemSetEdit>
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      dateFormatter="number"
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
            label={intl.formatMessage({ id: 'PROBLEM_SET.CREATE.FORM.HIDDEN' })}
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
        label={intl.formatMessage({ id: 'PROBLEM_SET.CREATE.FORM.CONTENT' })}
      >
        <MarkdownEditor />
      </Form.Item>
    </ProForm>
  );
};

export { UpsertProblemSetForm };

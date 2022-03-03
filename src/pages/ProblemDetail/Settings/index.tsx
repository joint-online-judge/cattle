import React, { useRef, useMemo, useEffect, useContext } from 'react';
import { Button, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { useIntl, useParams, useModel } from 'umi';
import { useRequest } from 'ahooks';
import ProForm, {
  ProFormInstance,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import ProblemContext from '../context';
import Horse, { FileUpload, ErrorCode } from '@/utils/service';
import ShadowCard from '@/components/ShadowCard';

interface FormValues {
  file: UploadFile[];
}

const Index: React.FC = () => {
  const intl = useIntl();
  const { domain } = useModel('domain');
  const { setHeader } = useModel('pageHeader');
  const { domainUrl, problemId } =
    useParams<{ domainUrl: string; problemId: string }>();
  const formRef = useRef<ProFormInstance<FormValues>>();
  const problemContext = useContext(ProblemContext);

  const { run: downloadConfig } = useRequest(
    async () =>
      Horse.problemConfig.v1DownloadProblemConfigArchive(
        domainUrl,
        problemId,
        'latest',
      ),
    {
      manual: true,
      onError: () => {
        message.error('download failed');
      },
    },
  );

  const { run: uploadConfig } = useRequest(
    async (values: FileUpload) => {
      const res = await Horse.problemConfig.v1UpdateProblemConfigByArchive(
        problemId,
        domainUrl,
        values,
      );
      return res.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode !== ErrorCode.Success) {
          message.error('upload failed');
        }
      },
      onError: () => {
        message.error('upload failed');
      },
    },
  );

  const { run: commit } = useRequest(
    async () => {
      const res = await Horse.problemConfig.v1CommitProblemConfig(
        problemId,
        domainUrl,
        {},
      );
      return res.data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.errorCode !== ErrorCode.Success) {
          message.error('commit failed');
        }
      },
      onError: () => {
        message.error('commit failed');
      },
    },
  );

  const breads = useMemo(
    () => [
      {
        path: `domain/${domainUrl}`,
        breadcrumbName: domain?.name ?? 'unknown',
      },
      {
        path: 'problem',
        breadcrumbI18nKey: 'problem.problems',
      },
      {
        path: problemContext?.problem?.title ?? 'null',
        breadcrumbName: problemContext?.problem?.title,
      },
    ],
    [domainUrl, domain, problemContext?.problem],
  );

  useEffect(() => {
    setHeader({
      routes: breads,
      titleI18nKey: 'PROBLEM.SETTINGS',
    });
  }, [breads, setHeader]);

  const onFinish = async (values: FormValues) => {
    if (values?.file[0]?.originFileObj) {
      await uploadConfig({
        file: values.file[0].originFileObj,
      });
    }
  };

  return (
    <ShadowCard>
      <ProForm<FormValues>
        formRef={formRef}
        layout="vertical"
        onFinish={onFinish}
        dateFormatter="number"
        omitNil
      >
        <ProFormUploadButton
          width="md"
          name="file"
          label={intl.formatMessage({ id: 'PROBLEM.UPLOAD_FILE' })}
          max={1}
          fieldProps={{
            beforeUpload: () => false,
            accept: '.zip,.rar,.tar',
          }}
          rules={[
            {
              required: true,
            },
          ]}
        />
      </ProForm>
      <Button onClick={commit}>Commit</Button>
      <Button onClick={downloadConfig}>Download</Button>
    </ShadowCard>
  );
};

export default Index;

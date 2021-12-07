import React from 'react';
import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

const { Paragraph, Text } = Typography;

const Index: React.FC = () => {
  const intl = useIntl();

  return (
    <Result
      status="error"
      title="Load Data Failed"
      subTitle="Please refresh the page."
    >
      {/* <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="text-red-500" /> Your account has been
          frozen. <a>Thaw immediately &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="text-red-500" /> Your account is not yet
          eligible to apply. <a>Apply Unlock &gt;</a>
        </Paragraph>
      </div> */}
    </Result>
  );
};

export default Index;

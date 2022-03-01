import React from 'react';
import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import style from './style.less';

const Index: React.FC = ({ children }) => (
  <pre className={style.copyPre} style={{ padding: '0.6em 0.8em' }}>
    <Button
      className={style.hoverButton}
      icon={<CopyOutlined />}
      onClick={() => {
        if (typeof children === 'string') {
          copy(children, {
            onCopy: () => {
              message.success('Copied to clipboard!');
            },
          });
        }
      }}
    />
    {children}
  </pre>
);

export default Index;

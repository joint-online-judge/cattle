import React from 'react';
import { Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import style from './style.less';

const Index: React.FC = ({ children }) => {
  return (
    <pre className={style.copyPre}>
      <Button
        className={style.hoverButton}
        icon={<CopyOutlined />}
        onClick={() => {
          if (typeof children === 'string') {
            copy(children);
          }
        }}
      />
      {children}
    </pre>
  );
};

export default Index;

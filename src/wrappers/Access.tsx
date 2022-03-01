import React from 'react';
import { IRouteComponentProps, history } from 'umi';
import { Result, Button } from 'antd';

const Index: React.FC<IRouteComponentProps> = (props) => {
  const { route } = props;

  if (route.unaccessible === true) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.goBack();
            }}
          >
            Gp Back
          </Button>
        }
      />
    );
  }

  return props.children;
};

export default Index;

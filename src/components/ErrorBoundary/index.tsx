import React from 'react';
import { Result } from 'antd';

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(_error: Error) {
    // TODO: error reporting
    // console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          className="mt-20"
          status="error"
          title="Something went wrong"
          subTitle="The application has met some unexpected errors. You may contact the adminers for more information."
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

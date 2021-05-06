import React from 'react';
// import style from './global.less';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useRequest } from 'ahooks';

export const TodoContainer = observer(() => {
  const [count, setCount] = React.useState(0);

  const { loading, run } = useRequest(async () => {
    setCount(count + 1);
  }, { manual: true });

  // Note: useEffect with [] is similar to componentDidMount
  // React.useEffect(() => {
  //   run().then(res => {
  //     console.log(res);
  //   })
  // }, []);

  return (
    <>
      <Button type="primary" onClick={run} loading={loading}>
        useRequest
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
        }}
        loading={loading}
      >
        No useRequest
      </Button>
      <pre>{count}</pre>
    </>
  );
});

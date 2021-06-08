import { IRouteComponentProps } from 'umi';
import styles from './index.less';
import { Button } from 'antd';
import { useIntl, setLocale, useModel } from 'umi';
import LangSelect from '@/components/LangSelect';

export default function IndexPage({ history }: IRouteComponentProps) {
  const { initialState, loading, error } = useModel('@@initialState');
  const intl = useIntl();

  return (
    <div>
      <h1 className={styles.title}>{JSON.stringify(initialState?.user)}</h1>
      <h1>{intl.formatMessage({ id: 'TEST' })}</h1>
      <h1>{JSON.stringify(loading)}</h1>
      <h1>{JSON.stringify(error)}</h1>
      <Button type="primary" onClick={() => history.push('/logout')}>
        Logout
      </Button>
      <Button type="primary" onClick={() => setLocale('zh-CN', false)}>
        zh-CN
      </Button>
      <Button type="primary" onClick={() => setLocale('en-US', false)}>
        en-US
      </Button>
      <LangSelect style={{ width: 200 }} />
    </div>
  );
}

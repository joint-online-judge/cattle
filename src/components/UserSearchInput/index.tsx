import React from 'react';
import { Input, InputProps, Select, SelectProps } from 'antd';
import { useIntl, useModel } from 'umi';

interface IProps extends SelectProps<string> {}

const Index: React.FC<InputProps> = (props) => {
  const { ...otherProps } = props;
  const intl = useIntl();

  // const options = React.useMemo(() => {
  //   return (allLang || []).map((lang) => ({
  //     label: `${intl.formatMessage({ id: lang })} (${lang})`,
  //     value: lang,
  //   }));
  // }, [allLang, intl]);

  return <Input {...otherProps} />;
};

export default Index;

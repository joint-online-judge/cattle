import React from 'react';
import { Select, SelectProps } from 'antd';
import { useIntl, useModel } from 'umi';

interface IProps extends SelectProps<string> {
  changeOnSelect?: boolean;
}

/***
 * @param {SelectProps} props - Antd Select props
 * @param {boolean} props.changeOnSelect - whether to switch language on select, default to true
 * @description Language Select. Can be used alone, or be controlled by <Form.Item>.
 */
const Index: React.FC<IProps> = (props) => {
  const { value, onChange, changeOnSelect, ...otherProps } = props;
  const { currentLang, switchLang, allLang } = useModel('lang');
  const intl = useIntl();

  const options = React.useMemo(() => {
    return (allLang || []).map((lang) => ({
      label: `${intl.formatMessage({ id: lang })} (${lang})`,
      value: lang,
    }));
  }, [allLang, currentLang]);

  const onValueChange = (e: string, options: any) => {
    if (onChange) {
      onChange(e, options);
    } else if (changeOnSelect !== false) {
      switchLang(e);
    }
  };

  return (
    <Select
      onChange={onValueChange}
      value={value || currentLang}
      options={options}
      {...otherProps}
    />
  );
};

export default Index;

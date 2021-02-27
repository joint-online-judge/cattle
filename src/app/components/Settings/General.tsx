import { observer } from 'mobx-react';
import React from 'react';
import { Button, Form, Select } from 'antd';
import SettingsModel from 'app/models/SettingsModel';
import { useSettings } from './SettingsContext';
import * as style from './style.css';

const options = {
  i18nLang: [
    'en',
    'zh-CN',
  ],
  timeZone: [
    'Asia/Shanghai',
    'Asia/Urumqi',
  ],
};

export const General = observer(() => {
  const [form] = Form.useForm();
  const settings = useSettings();
  const onFinish = (values: SettingsModel) => {
    settings.updateSettings(values);
  };
  return (
    <Form
      form={form}
      name="general-settings"
      initialValues={settings.settings}
      layout="vertical"
      onFinish={onFinish}
    >
      {
        (Object.keys(settings.settings)).map((key) => (
          <Form.Item
            label={(
              <p className={style.SettingsLabel}>{key}</p>
            )}
            name={key}
            key={key}
          >
            <Select>
              {
                options[key].map((_optionValue) => (
                  <Select.Option
                    value={_optionValue}
                    key={_optionValue}
                  >
                    {_optionValue}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
        ))
      }
      <Form.Item>
        <Button type="primary" htmlType="submit">Update Settings</Button>
      </Form.Item>
    </Form>
  );
});

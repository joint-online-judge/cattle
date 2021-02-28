import { observer } from 'mobx-react';
import React from 'react';
import {
  Button, Form, PageHeader, Select,
} from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const settings = useSettings();
  const onFinish = (values: SettingsModel) => {
    settings.updateSettings(values);
  };
  return (
    <>
      <PageHeader
        title={t('SETTINGS.DISPLAY_SETTINGS')}
        className={style.SettingsHeader}
      />
      <Form
        form={form}
        name="general-settings"
        initialValues={settings.settings}
        layout="vertical"
        onFinish={onFinish}
        className={style.SettingsForm}
      >
        {
          (Object.keys(settings.settings)).map((key) => (
            <Form.Item
              label={(
                <b>
                  {t(`SETTINGS.${key.toUpperCase()}`)}
                </b>
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
          <Button type="primary" htmlType="submit" className={style.SaveButton}>
            {t('SETTINGS.UPDATE_SETTINGS')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});

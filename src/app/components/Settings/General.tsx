import { observer } from 'mobx-react';
import React from 'react';
import {
  Button, Form, PageHeader, Select,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { DisplaySettings } from 'app/models/SettingsModel';
import { SUPPORT_LANGUAGES } from 'app/constants/i18n';
import { useSettings } from 'app/contexts';
import { SettingsStyleWrapper } from 'app/components';
import style from './style.css';

const options = {
  i18nLang: [
    ...Object.keys(SUPPORT_LANGUAGES),
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
  const onFinish = (values: DisplaySettings) => {
    settings.updateDisplaySettings(values);
  };
  return (
    <>
      <PageHeader
        title={t('SETTINGS.DISPLAY_SETTINGS')}
        className={style.settingsTitle}
      />
      <SettingsStyleWrapper type="form">
        <Form
          form={form}
          name="general-settings"
          initialValues={settings.settings.displaySettings}
          layout="vertical"
          onFinish={onFinish}
        >
          {
            (Object.keys(settings.settings.displaySettings)).map((key) => (
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
            <Button type="primary" htmlType="submit">
              {t('SETTINGS.UPDATE_SETTINGS')}
            </Button>
          </Form.Item>
        </Form>
      </SettingsStyleWrapper>
    </>
  );
});

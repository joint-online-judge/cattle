import React from 'react';
import { Button, Form, PageHeader } from 'antd';
import { useIntl } from 'umi';

// Const options = {
//   i18nLang: [
//     ...Object.keys(SUPPORT_LANGUAGES),
//   ],
//   timeZone: [
//     'Asia/Shanghai',
//     'Asia/Urumqi',
//   ],
// };

const Index: React.FC = () => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const onFinish = (_values: any) => {
    // Settings.updateDisplaySettings(values);
  };

  return (
    <>
      <PageHeader
        title={intl.formatMessage({ id: 'SETTINGS.DISPLAY_SETTINGS' })}
      />
      <Form
        form={form}
        name="general-settings"
        // InitialValues={settings.settings.displaySettings}
        layout="vertical"
        onFinish={onFinish}
      >
        {/* { */}
        {/*  (Object.keys(settings.settings.displaySettings)).map((key) => ( */}
        {/*    <Form.Item */}
        {/*      label={( */}
        {/*        <b> */}
        {/*          {intl.formatMessage({ id: `SETTINGS.${key.toUpperCase()}` })} */}
        {/*        </b> */}
        {/*      )} */}
        {/*      name={key} */}
        {/*      key={key} */}
        {/*    > */}
        {/*      <Select> */}
        {/*        { */}
        {/*          options[key].map((_optionValue) => ( */}
        {/*            <Select.Option */}
        {/*              value={_optionValue} */}
        {/*              key={_optionValue} */}
        {/*            > */}
        {/*              {_optionValue} */}
        {/*            </Select.Option> */}
        {/*          )) */}
        {/*        } */}
        {/*      </Select> */}
        {/*    </Form.Item> */}
        {/*  )) */}
        {/* } */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'SETTINGS.UPDATE_SETTINGS' })}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Index;

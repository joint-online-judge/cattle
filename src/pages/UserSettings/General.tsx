import { Button, Form } from 'antd'
import type React from 'react'
import { useTranslation } from 'react-i18next'

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
	const [form] = Form.useForm()
	const { t } = useTranslation()

	return (
		<Form
			form={form}
			name='general-settings'
			// InitialValues={settings.settings.displaySettings}
			layout='vertical'
			onFinish={(): void => {
				// Settings.updateDisplaySettings(values);
			}}
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
				<Button type='primary' htmlType='submit'>
					{t('UserSettings.General.update')}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default Index

import type { SelectProps } from 'antd'
import { Select } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'
import { useLang } from 'models'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps extends SelectProps<string> {
	changeOnSelect?: boolean
}

/** *
 * @param {SelectProps} props - Antd Select props
 * @param {boolean} props.changeOnSelect - whether to switch language on select, default to true
 * @description Language Select. Can be used alone, or be controlled by <Form.Item>.
 */
const Index: React.FC<IProps> = props => {
	const { value, onChange, changeOnSelect, ...otherProps } = props
	const { t, i18n } = useTranslation()
	const { switchLang } = useLang()
	const currentLang = i18n.language
	const allLang = i18n.languages

	const options: DefaultOptionType[] = React.useMemo(
		() =>
			allLang.map(lang => ({
				label: `${t(`language.${lang}`)} (${lang})`,
				value: lang
			})),
		[allLang, t]
	)

	const onValueChange = (
		v: string,
		option: DefaultOptionType | DefaultOptionType[]
	): void => {
		if (onChange) {
			onChange(v, option) // Controlled components in <Form>
		} else if (changeOnSelect !== false) {
			switchLang(v)
		}
	}

	return (
		<Select
			onChange={onValueChange}
			value={value ?? currentLang}
			options={options}
			{...otherProps}
		/>
	)
}

export default Index

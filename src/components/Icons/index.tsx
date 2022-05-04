import { EyeInvisibleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export function HiddenFromUserIcon(): ReactElement {
	const { t } = useTranslation()

	return (
		<Tooltip title={t('Icons.hiddenFromUser')}>
			<EyeInvisibleOutlined />
		</Tooltip>
	)
}

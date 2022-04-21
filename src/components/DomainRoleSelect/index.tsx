import { useRequest } from 'ahooks'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Horse } from 'utils/service'

interface IProps extends SelectProps<string> {
	domainUrl: string
}

const Index: React.FC<IProps> = props => {
	const { domainUrl, ...otherProps } = props
	const { t } = useTranslation()
	const [disabled, setDisabled] = useState<boolean>(false)

	const { data, loading } = useRequest(
		async () => {
			const response = await Horse.domain.v1ListDomainRoles(domainUrl)
			return response.data.data?.results ?? []
		},
		{
			refreshDeps: [domainUrl],
			onError: () => {
				setDisabled(true)
			}
		}
	)

	const options = React.useMemo(
		() =>
			(data ?? []).map(role => ({
				label: role.role,
				value: role.role
			})),
		[data]
	)

	return (
		<Select
			loading={loading}
			options={options}
			disabled={disabled}
			placeholder={
				disabled
					? t('DomainRoleSelect.errorPlaceholder')
					: t('DomainRoleSelect.placeholder')
			}
			{...otherProps}
		/>
	)
}

export default Index

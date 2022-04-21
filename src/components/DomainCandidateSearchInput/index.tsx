// @ts-nocheck temporarily
/* eslint-disable */
// FIXME: temporarily no check
import { useRequest } from 'ahooks'
import type { SelectProps } from 'antd'
import { Col, Empty, Row, Select, Spin } from 'antd'
import Gravatar from 'components/Gravatar'
import type React from 'react'
import type { ReactElement } from 'react'
import { useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useTranslation } from 'react-i18next'
import type { UserWithDomainRole } from 'utils/service'
import { Horse } from 'utils/service'

interface IProperties extends SelectProps<string> {
	domainUrl: string
}

const { Option } = Select
const Index: React.FC<IProperties> = props => {
	const { domainUrl, ...otherProps } = props
	const { t } = useTranslation()
	const [searchWord, setSearchWord] = useState<string>('')

	const { data, run, loading } = useRequest(
		async (query: string) => {
			if (typeof query !== 'string') {
				return []
			}

			if (query.length < 2) {
				return []
			}

			const response = await Horse.domain.v1SearchDomainCandidates(domainUrl, {
				query
			})
			return response.data.data?.results ?? []
		},
		{
			manual: true,
			debounceWait: 500,
			refreshDeps: [domainUrl]
		}
	)

	const renderOptions = (
		userList: UserWithDomainRole[] | undefined
	): ReactElement[] =>
		(userList ?? []).map(u => (
			<Option
				key={u.id}
				label={`${u.username} (${u.realName})`}
				value={u.id}
				disabled={Boolean(u.domainRole)}
			>
				<Row wrap={false} gutter={12} align='middle'>
					<Col flex='none'>
						<Gravatar gravatar={u.gravatar} />
					</Col>
					<Col flex='auto'>
						<Row>
							<Col span={24}>
								<Highlighter
									highlightStyle={{ paddingLeft: 0, paddingRight: 0 }}
									searchWords={[searchWord]}
									autoEscape={false}
									textToHighlight={
										u.realName ? `${u.username} (${u.realName})` : u.username
									}
								/>
							</Col>
							<Col span={24}>
								<Highlighter
									className='text-xs'
									highlightStyle={{ paddingLeft: 0, paddingRight: 0 }}
									searchWords={[searchWord]}
									autoEscape={false}
									textToHighlight={
										(u.studentId ?? '') + (u.email ? ` - ${u.email}` : '')
									}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Option>
		))

	return (
		<Select<string>
			showArrow={false}
			allowClear
			filterOption={false}
			showSearch
			optionLabelProp='label'
			onSearch={(query): void => {
				setSearchWord(query)
				run(query)
			}}
			placeholder={t('DomainCandidateSearchInput.placeholder')}
			notFoundContent={
				loading ? (
					<Spin size='small' />
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)
			}
			{...otherProps}
		>
			{renderOptions(data)}
		</Select>
	)
}

export default Index

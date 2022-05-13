import {
	CheckOutlined,
	ClockCircleOutlined,
	CloseOutlined
} from '@ant-design/icons'
import { Space } from 'antd'
import { RecordState } from 'client'
import type React from 'react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
	record: {
		id: string
		state?: RecordState
		createdAt?: string
	}
	domainUrl?: string
}

interface StatusConfig {
	text: string
	color: string
	icon: ReactElement
}

const RecordStatusConfig: Record<RecordState, StatusConfig> = {
	[RecordState.Processing]: {
		text: 'Processing',
		color: '#8c8c8c',
		icon: <ClockCircleOutlined />
	},
	[RecordState.Queueing]: {
		text: 'Queueing',
		color: '#8c8c8c',
		icon: <ClockCircleOutlined />
	},
	[RecordState.Retrying]: {
		text: 'Retrying',
		color: '#8c8c8c',
		icon: <ClockCircleOutlined />
	},
	[RecordState.Fetched]: {
		text: 'Fetched',
		color: '#8c8c8c',
		icon: <ClockCircleOutlined />
	},
	[RecordState.Compiling]: {
		text: 'Compiling',
		color: '#8c8c8c',
		icon: <ClockCircleOutlined />
	},
	[RecordState.Running]: {
		text: 'Running',
		color: '#8c8c8c',
		icon: <ClockCircleOutlined />
	},
	[RecordState.Judging]: {
		text: 'Judging',
		color: '#8c8c8c',
		icon: <ClockCircleOutlined />
	},
	[RecordState.Accepted]: {
		text: 'Accepted',
		color: '#25ad40',
		icon: <CheckOutlined />
	},
	[RecordState.Rejected]: {
		text: 'Rejected',
		color: '#fb5555',
		icon: <CloseOutlined />
	},
	[RecordState.Failed]: {
		text: 'Failed',
		color: '#fb5555',
		icon: <CloseOutlined />
	}
}

const Index: React.FC<IProps> = ({ record, domainUrl }) => {
	const config = record.state ? RecordStatusConfig[record.state] : undefined
	const url = domainUrl ? `/domain/${domainUrl}/record/${record.id}` : record.id

	if (!config)
		return (
			<Link target='_blank' rel='noopener noreferrer' to={url}>
				{record.state}
			</Link>
		)

	return (
		<Link
			target='_blank'
			rel='noopener noreferrer'
			to={url}
			style={{ color: config.color }}
		>
			<Space>
				{config.icon}
				{config.text}
			</Space>
		</Link>
	)
}

export default Index

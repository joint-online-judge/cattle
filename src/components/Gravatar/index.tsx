import { UserOutlined } from '@ant-design/icons'
import type { AvatarProps } from 'antd'
import { Avatar } from 'antd'
import type React from 'react'
import { gravatarImageUrl } from 'utils/gravatar'

export interface GravatarProps extends AvatarProps {
	src?: string
	gravatar?: string // If gravatar is set, use gravatar regardless of src
}

const Index: React.FC<GravatarProps> = props => {
	const { gravatar, src, ...otherProps } = props
	const imageUrl: string | undefined = gravatar
		? gravatarImageUrl(gravatar, 300)
		: src

	return (
		<Avatar
			src={imageUrl}
			icon={<UserOutlined />}
			alt='avatar'
			{...otherProps}
		/>
	)
}

export default Index

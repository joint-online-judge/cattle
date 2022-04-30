import { Spin } from 'antd'
import type { ReactElement } from 'react'

interface Properties {
	error?: Error
	fullscreen?: boolean
	height?: number // rem
}
export default function LoadingOrError({
	error,
	fullscreen = false,
	height = 15
}: Properties): ReactElement {
	if (fullscreen) {
		return (
			<div
				className='flex min-h-screen items-center justify-center'
				data-testid='LoadingOrError'
			>
				{error ? (
					<h1 className='text-xl'>{error.message}</h1>
				) : (
					<Spin size='large' />
				)}
			</div>
		)
	}

	return (
		<div
			className='flex h-full items-center justify-center'
			style={{ minHeight: `${height}rem` }}
			data-testid='LoadingOrError'
		>
			{error ? <h1 className='text-xl'>{error.message}</h1> : <Spin />}
		</div>
	)
}
LoadingOrError.defaultProps = {
	error: undefined
}

import { useEffect } from 'react'

interface IProperties {
	title: string
}

export default function Head({ title }: IProperties): null {
	useEffect(() => {
		document.title = `${title} - JOJ v2`
	}, [title])

	return null
}

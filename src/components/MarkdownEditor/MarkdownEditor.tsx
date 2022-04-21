import MarkdownRender from 'components/MarkdownRender'
import type { Options } from 'easymde'
import { merge } from 'lodash-es'
import type React from 'react'
import { useMemo } from 'react'
import ReactDOMServer from 'react-dom/server'
import type { SimpleMDEReactProps } from 'react-simplemde-editor'
import SimpleMDE from 'react-simplemde-editor'
import './style.less'

const Index: React.FC<SimpleMDEReactProps> = ({
	options,
	...otherProperties
}) => {
	const presetOptions: Options = useMemo(
		() => ({
			autofocus: false,
			spellChecker: false,
			minHeight: '300px',
			maxHeight: '400px',
			previewRender: text =>
				ReactDOMServer.renderToString(<MarkdownRender>{text}</MarkdownRender>)
		}),
		[]
	)

	return (
		<SimpleMDE options={merge(presetOptions, options)} {...otherProperties} />
	)
}

export default Index

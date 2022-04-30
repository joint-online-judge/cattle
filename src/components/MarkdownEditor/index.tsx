import LoadingOrError from 'components/LoadingOrError'
import type React from 'react'
import { lazy, Suspense } from 'react'
import type { SimpleMDEReactProps } from 'react-simplemde-editor'

const MarkdownEditor = lazy(async () => import('./MarkdownEditor'))

const AsyncMarkdownEditor: React.FC<SimpleMDEReactProps> = props => (
	<Suspense fallback={<LoadingOrError />}>
		<MarkdownEditor {...props} />
	</Suspense>
)

export default AsyncMarkdownEditor

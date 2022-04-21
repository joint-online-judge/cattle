import type React from 'react'
import { lazy, Suspense } from 'react'

const MarkdownEditor = lazy(async () => import('./MarkdownEditor'))

const AsyncMarkdownEditor: React.FC = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<MarkdownEditor />
	</Suspense>
)

export default AsyncMarkdownEditor

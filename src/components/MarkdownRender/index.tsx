import type React from 'react'
import { lazy, Suspense } from 'react'

const MarkdownRenderer = lazy(async () => import('./MarkdownRenderer'))

const AsyncMarkdownRender: React.FC<{ children: string }> = ({ children }) => (
	<Suspense fallback={<div>Loading...</div>}>
		<MarkdownRenderer>{children}</MarkdownRenderer>
	</Suspense>
)

export default AsyncMarkdownRender

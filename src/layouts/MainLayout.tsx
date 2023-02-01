import LoadingOrError from 'components/LoadingOrError'
import type React from 'react'
import { Suspense } from 'react'
import MainContentLayout from './MainContentLayout'

const Index: React.FC = ({ children }) => (
  <MainContentLayout className='pb-16 pt-6'>
    <Suspense fallback={<LoadingOrError />}>{children}</Suspense>
  </MainContentLayout>
)

export default Index

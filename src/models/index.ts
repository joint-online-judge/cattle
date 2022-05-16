import { useContext } from 'react'
import type { AccessContextValue } from './access'
import { AccessContext } from './access'
import type { AuthContextValue } from './auth'
import { AuthContext } from './auth'
import type { DomainContextValue } from './domain'
import { DomainContext } from './domain'
import type { LangContextValue } from './lang'
import { LangContext } from './lang'
import type { PageHeaderContextValue } from './pageHeader'
import { PageHeaderContext } from './pageHeader'
import type { ProblemSetContextValue } from './problemSet'
import { ProblemSetContext } from './problemSet'

const useAuth = (): AuthContextValue =>
	useContext<AuthContextValue>(AuthContext)

const useDomain = (): DomainContextValue =>
	useContext<DomainContextValue>(DomainContext)

const useAccess = (): AccessContextValue =>
	useContext<AccessContextValue>(AccessContext)

const usePageHeader = (): PageHeaderContextValue =>
	useContext<PageHeaderContextValue>(PageHeaderContext)

const useLang = (): LangContextValue =>
	useContext<LangContextValue>(LangContext)

const useProblemSet = (): ProblemSetContextValue =>
	useContext<ProblemSetContextValue>(ProblemSetContext)

export { useAuth, useDomain, useAccess, usePageHeader, useLang, useProblemSet }

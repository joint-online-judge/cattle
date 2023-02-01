import { useContext } from 'react'
import type { AccessContextValue } from './access'
import { AccessContext } from './access'
import type { AuthContextValue } from './auth'
import { AuthContext } from './auth'
import type { DomainContextValue } from './domain'
import { DomainContext } from './domain'
import type { DomainListContextValue } from './domainList'
import { DomainListContext } from './domainList'
import type { LangContextValue } from './lang'
import { LangContext } from './lang'
import type { ProblemContextValue } from './problem'
import { ProblemContext } from './problem'
import type { ProblemSetContextValue } from './problemSet'
import { ProblemSetContext } from './problemSet'

const useAuth = (): AuthContextValue =>
  useContext<AuthContextValue>(AuthContext)

const useDomain = (): DomainContextValue =>
  useContext<DomainContextValue>(DomainContext)

const useDomainList = (): DomainListContextValue =>
  useContext<DomainListContextValue>(DomainListContext)

const useAccess = (): AccessContextValue =>
  useContext<AccessContextValue>(AccessContext)

const useLang = (): LangContextValue =>
  useContext<LangContextValue>(LangContext)

const useProblemSet = (): ProblemSetContextValue =>
  useContext<ProblemSetContextValue>(ProblemSetContext)

const useProblem = (): ProblemContextValue =>
  useContext<ProblemContextValue>(ProblemContext)

export {
  useAuth,
  useDomain,
  useDomainList,
  useAccess,
  useLang,
  useProblemSet,
  useProblem
}

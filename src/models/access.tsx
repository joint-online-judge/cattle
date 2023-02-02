import { mapValues } from 'lodash-es'
import type { FC } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { AuthContext } from './auth'
import { DomainContext } from './domain'

export interface AccessContextValue {
  // Site Permissions
  authenticated: boolean
  isRoot: boolean
  accepted: boolean
  denied: boolean
  // Domain Permissions
  canCreateProblemSet: boolean
  canCreateProblem: boolean
}

const AccessContext = createContext<AccessContextValue>({
  authenticated: false,
  isRoot: false,
  accepted: true,
  denied: false,
  canCreateProblem: false,
  canCreateProblemSet: false
})

const AccessContextProvider: FC = ({ children }) => {
  const { permission } = useContext(DomainContext)
  const { user } = useContext(AuthContext)

  const value = useMemo(() => {
    const access = {
      // Site Permissions
      authenticated: Boolean(user),
      isRoot: user?.role === 'root',
      accepted: true,
      denied: false,
      // Domain Permissions
      canCreateProblemSet: permission?.problemSet?.create === true,
      canCreateProblem: permission?.problem?.create === true
    }

    if (user?.role === 'root') {
      // Root shall have all permission
      return mapValues(access, () => true)
    }

    return access
  }, [user, permission])

  return (
    <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
  )
}

export { AccessContext, AccessContextProvider }

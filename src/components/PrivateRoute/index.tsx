import { useAccess, useAuth } from 'models'
import type { AccessContextValue } from 'models/access'
import { Navigate, useLocation } from 'react-router-dom'

interface IProps {
	children: JSX.Element
	access?: keyof AccessContextValue
}

const RequireAuth = ({ children, access: accessKey }: IProps): JSX.Element => {
	const auth = useAuth()
	const access = useAccess()
	const location = useLocation()

	if (!auth.user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login.
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	if (accessKey && !access[accessKey]) {
		return <h1>No Permission</h1>
	}

	return children
}

export default RequireAuth

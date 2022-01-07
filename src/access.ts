import { InitialState } from './app';
import { mapValues } from 'lodash';

function permissions(initialState: InitialState) {
  const { user, domainPermission } = initialState ?? {};

  const perms = {
    // Site Permissions
    authenticated: !!(user && user.sub && user.category === 'user'),
    isRoot: user?.role === 'root',
    accepted: true,
    denied: false,
    // Domain Permissions
    canCreateProblemSet:
      domainPermission?.permission?.problemSet?.create === true,
    canCreateProblem: domainPermission?.permission?.problem?.create === true,
  };

  if (user?.role === 'root') {
    // root shall have all permission
    return mapValues(perms, () => true);
  }

  return perms;
}

export default permissions;

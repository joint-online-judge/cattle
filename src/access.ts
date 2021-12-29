import { InitialState } from './app';

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
    for (const key in perms) {
      // @ts-ignore
      perms[key] = true;
    }
  }

  return perms;
}

export default permissions;

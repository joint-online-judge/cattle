import { InitialState } from './app';

function permissions(initialState: InitialState) {
  const { user, domainPermission } = initialState ?? {};

  return {
    authenticated: user && user.sub && user.category === 'user',
    isRoot: user?.role === 'root',
    accepted: true,
    denied: false,
    canCreateProblem: domainPermission?.permission?.problem?.create === true,
    // canUpdateFoo: role === 'admin',
    // canDeleteFoo: foo => {
    //   return foo.ownerId === userId;
    // },
  };
}

export default permissions;

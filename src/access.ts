import { InitialState } from './app';

function permissions(initialState: InitialState) {
  const { user } = initialState ?? {};

  return {
    authenticated: Boolean(user),
    isRoot: user?.role === 'root',
    // canUpdateFoo: role === 'admin',
    // canDeleteFoo: foo => {
    //   return foo.ownerId === userId;
    // },
  };
}

export default permissions;

import { InitialState } from './app';

function permissions(initialState: InitialState) {
  const { user } = initialState ?? {};

  return {
    authenticated: user && user.sub && user.category === 'user',
    isRoot: user?.role === 'root',
    accepted: true,
    denied: false,
    // canUpdateFoo: role === 'admin',
    // canDeleteFoo: foo => {
    //   return foo.ownerId === userId;
    // },
  };
}

export default permissions;

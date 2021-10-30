import { InitialState } from './app';

export default function (initialState: InitialState) {
  const { user } = initialState || {};

  return {
    authenticated: !!user,
    isRoot: user?.role === 'root',
    // canUpdateFoo: role === 'admin',
    // canDeleteFoo: foo => {
    //   return foo.ownerId === userId;
    // },
  };
}

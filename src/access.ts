import { InitialState } from './app';

export default function (initialState: InitialState) {
  const { user } = initialState || {};

  return {
    authenticated: !!user,
    // canUpdateFoo: role === 'admin',
    // canDeleteFoo: foo => {
    //   return foo.ownerId === userId;
    // },
  };
}

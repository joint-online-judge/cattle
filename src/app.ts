import { ErrorCode, User, UserService } from '@/client';

export interface InitialState {
  user: User | null
}

// will be run before render each route
// export function render(oldRender: any) {
//   // TODO: app-level auth
//   // fetch('/api/auth').then(auth => {
//   if (true) {
//     oldRender();
//   } else {
//     history.push('/login');
//     oldRender();
//   }
//   // });
// }

// export function onRouteChange({ location, routes, action, matchedRoutes }: any) {
//   // TODO: page-level auth
//   // if (matchedRoutes.length) {
//   //   document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
//   // }
// }

// modify root element
// export function rootContainer(container: any) {
//   return container;
//   // return React.createElement(ThemeProvider, null, container);
// }

export async function getInitialState(): Promise<InitialState> {
  try {
    const res = await UserService.getUserApiV1UserGet();
    if (res.error_code === ErrorCode.SUCCESS && res.data) {
      return { user: res.data };
    }
  } catch (e) {
    return { user: null };
  }
  return { user: null };
}

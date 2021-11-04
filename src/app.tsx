import { User, Horse } from '@/utils/service';

export interface InitialState {
  user: User | undefined;
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
    // const res = await Horse.user.getUserApiV1UserGet();
    const res = await Horse.auth.getTokenApiV1AuthTokenGet({
      response_type: 'json',
    });
    console.log(res);
    // if (res.data.error_code === ErrorCode.Success && res.data) {
    //   return { user: res.data.data };
    // }
  } catch {
    return { user: undefined };
  }

  return { user: undefined };
}

import jwt_decode from 'jwt-decode';
import {
  Horse,
  JWTAccessToken,
  ErrorCode,
  DomainPermission,
} from '@/utils/service';
import './i18n';

export interface InitialState {
  accessToken: string | undefined;
  user: JWTAccessToken | undefined; // actually a JWT not a User
  domainPermission?: {
    role: string | undefined;
    permission: DomainPermission | undefined;
  };
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
    const res = await Horse.auth.v1GetToken({
      responseType: 'json',
    });
    if (
      res.data.errorCode === ErrorCode.Success &&
      res.data?.data?.accessToken
    ) {
      const decoded: JWTAccessToken = jwt_decode(res.data?.data?.accessToken);
      return { user: decoded, accessToken: res.data?.data?.accessToken };
    }

    return { user: undefined, accessToken: undefined };
  } catch {
    return { user: undefined, accessToken: undefined };
  }
}

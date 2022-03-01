import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/login',
    component: '@/pages/Login',
    wrappers: ['@/wrappers/revAuth'],
  },
  {
    path: '/oauth-register',
    component: '@/pages/OAuthRegister',
    wrappers: ['@/wrappers/revAuth'],
  },
  { path: '/logout', component: '@/pages/Logout' },

  {
    path: '/',
    component: '@/layouts/index',
    wrappers: ['@/wrappers/Auth'],
    routes: [
      { exact: true, path: '/', component: '@/pages/DomainList' },

      {
        exact: true,
        path: '/settings/:tab',
        component: '@/pages/UserSettings',
        routes: [
          {
            path: '/settings/general',
            component: '@/pages/UserSettings/General',
            menuKey: 'general',
            i18nKey: 'settings.site.general',
          },
          {
            path: '/settings/account',
            component: '@/pages/UserSettings/Account',
            menuKey: 'account',
            i18nKey: 'settings.site.account',
          },
          {
            path: '/settings/domains',
            component: '@/pages/UserSettings/General',
            menuKey: 'domains',
            i18nKey: 'settings.site.domains',
          },
        ],
      },
      {
        exact: true,
        path: '/settings',
        redirect: '/settings/general',
      },

      {
        exact: false,
        path: '/domain/:domainUrl',
        component: '@/layouts/DomainLayout',
        wrappers: ['@/wrappers/Auth'],
        routes: [
          {
            path: '/domain/:domainUrl/create-problem-set',
            component: '@/pages/CreateProblemSet',
          },
          {
            path: '/domain/:domainUrl/create-problem',
            component: '@/pages/CreateProblem',
          },
          {
            path: '/domain/:domainUrl/join',
            component: '@/pages/JoinDomain',
          },

          {
            path: '/domain/:domainUrl/settings/:tab/:subTab?',
            component: '@/pages/DomainSettings',
            routes: [
              {
                path: '/domain/:domainUrl/settings/profile',
                component: '@/pages/DomainSettings/Profile',
                menuKey: 'profile',
              },
              {
                path: '/domain/:domainUrl/settings/invitation',
                component: '@/pages/DomainSettings/Invitation',
                menuKey: 'invitation',
              },
              {
                path: '/domain/:domainUrl/settings/member',
                component: '@/pages/DomainSettings/Member',
                menuKey: 'member',
              },
              {
                path: '/domain/:domainUrl/settings/permission/role',
                component: '@/pages/DomainSettings/Permission/Role',
                menuKey: 'permission',
              },
              {
                path: '/domain/:domainUrl/settings/permission/config',
                component: '@/pages/DomainSettings/Permission/Config',
                menuKey: 'permission',
              },
              {
                path: '/domain/:domainUrl/settings/permission',
                redirect: '/domain/:domainUrl/settings/permission/config',
              },
              { component: '@/pages/NotFound' },
            ],
          },
          {
            path: '/domain/:domainUrl/settings',
            redirect: '/domain/:domainUrl/settings/profile',
          },

          {
            path: '/domain/:domainUrl/problem-set/:problemSetId/p/:problemId',
            component: '@/pages/ProblemDetail',
          },
          {
            path: '/domain/:domainUrl/problem-set/:problemSetId/:tab?',
            component: '@/pages/ProblemSetDetail',
            routes: [
              {
                path: '/domain/:domainUrl/problem-set/:problemSetId/scoreboard',
                component: '@/pages/ProblemSetDetail/Scoreboard',
              },
              {
                path: '/domain/:domainUrl/problem-set/:problemSetId/system-test',
                component: '@/pages/ProblemSetDetail/SystemTest',
              },
              {
                path: '/domain/:domainUrl/problem-set/:problemSetId/settings',
                component: '@/pages/ProblemSetDetail/Settings',
              },
              {
                path: '/domain/:domainUrl/problem-set/:problemSetId/edit',
                component: '@/pages/ProblemSetDetail/EditDetail',
              },
              {
                path: '/domain/:domainUrl/problem-set/:problemSetId/detail',
                component: '@/pages/ProblemSetDetail/ViewDetail',
              },
              {
                path: '/domain/:domainUrl/problem-set/:problemSetId',
                component: '@/pages/ProblemSetDetail/ViewDetail',
              },
              { component: '@/pages/NotFound' },
            ],
          },
          {
            path: '/domain/:domainUrl/problem-set',
            component: '@/pages/ProblemSetList',
          },

          {
            path: '/domain/:domainUrl/problem/:problemId/settings',
            component: '@/pages/ProblemConfig',
          },
          {
            path: '/domain/:domainUrl/problem/:problemId/:tab?',
            component: '@/pages/ProblemDetail',
          },
          {
            path: '/domain/:domainUrl/problem',
            component: '@/pages/ProblemList',
          },
          {
            path: '/domain/:domainUrl',
            component: '@/pages/DomainHome',
          },
          { component: '@/pages/NotFound' },
        ],
      },
      { exact: true, path: '/domain', component: '@/pages/DomainList' },

      {
        path: '/user/:username',
        component: '@/pages/Profile',
      },

      {
        path: '/admin/:tab',
        component: '@/pages/SiteAdmin',
        access: 'isRoot',
        routes: [
          {
            path: '/admin/domain',
            component: '@/pages/SiteAdmin/CreateDomain',
            menuKey: 'domain',
            i18nKey: 'admin.menu.domain',
          },
        ],
      },
      { exact: true, path: '/admin', redirect: '/admin/domain' },

      {
        path: '/records',
        component: '@/pages/RecordList',
      },

      { component: '@/pages/NotFound' },
    ],
  },

  { component: '@/pages/NotFound' },
];

const recursiveInjectWrapper = (routes: IRoute[], wrapper: string) => {
  for (const route of routes) {
    if (Array.isArray(route.wrappers)) {
      route.wrappers.push(wrapper);
    } else {
      route.wrappers = [wrapper];
    }

    if (Array.isArray(route.routes))
      recursiveInjectWrapper(route.routes, wrapper);
  }
};

recursiveInjectWrapper(routes, '@/wrappers/Access');

export default routes;

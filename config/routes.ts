const routes = [
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
    path: '/domain/:domainUrl/problem-set/:problemSetId',
    component: '@/layouts/index',
    wrappers: ['@/wrappers/Auth'],
    routes: [
      {
        path: '/domain/:domainUrl/problem-set/:problemSetId/system-test',
        component: '@/pages/CreateProblem',
      },
      {
        path: '/domain/:domainUrl/problem-set/:problemSetId/scoreboard',
        component: '@/pages/CreateProblem',
      },
      {
        path: '/domain/:domainUrl/problem-set/:problemSetId/settings',
        component: '@/pages/CreateProblem',
      },
      {
        path: '/domain/:domainUrl/problem-set/:problemSetId/:problemId',
        component: '@/pages/Problem',
      },
      {
        path: '/domain/:domainUrl/problem-set/:problemSetId',
        component: '@/pages/ProblemSetDetail',
      },
      {
        path: '/domain/:domainUrl/problem-set',
        component: '@/pages/ProblemSetList',
      },
    ],
  },

  // @chujie: this route tree should be separated.
  // Otherwise, 'domainUrl' cannot be matched in the layout component.
  {
    path: '/domain/:domainUrl',
    component: '@/layouts/index',
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
        path: '/domain/:domainUrl/settings/:tabs',
        component: '@/pages/DomainSettings',
        routes: [
          {
            path: '/domain/:domainUrl/settings/profile',
            component: '@/pages/DomainSettings/Profile',
            menuKey: 'profile',
            i18nKey: 'SETTINGS.DOMAIN.PROFILE',
          },
          {
            path: '/domain/:domainUrl/settings/invitation',
            component: '@/pages/DomainSettings/Invitation',
            menuKey: 'invitation',
            i18nKey: 'SETTINGS.DOMAIN.INVITATION',
          },
          {
            path: '/domain/:domainUrl/settings/member',
            component: '@/pages/DomainSettings/Member',
            menuKey: 'member',
            i18nKey: 'SETTINGS.DOMAIN.MEMBERS',
          },
          {
            path: '/domain/:domainUrl/settings/permission',
            component: '@/pages/DomainSettings/Permission',
            menuKey: 'permission',
            i18nKey: 'SETTINGS.DOMAIN.PERMISSION',
          },
          {
            path: '/domain/:domainUrl/settings',
            component: '@/pages/DomainSettings/Profile',
          },
        ],
      },
      {
        path: '/domain/:domainUrl/problem/:problemId',
        component: '@/pages/Problem',
      },
      {
        path: '/domain/:domainUrl/problem',
        component: '@/pages/ProblemList',
      },
      {
        path: '/domain/:domainUrl',
        component: '@/pages/DomainHome',
      },
    ],
  },

  {
    path: '/',
    component: '@/layouts/index',
    wrappers: ['@/wrappers/Auth'],
    routes: [
      { exact: true, path: '/', component: '@/pages/DomainList' },
      { exact: true, path: '/settings', component: '@/pages/UserSettings' },
      { exact: true, path: '/domain', component: '@/pages/DomainList' },
      { exact: true, path: '/admin', redirect: '/admin/domain' },

      {
        path: '/admin/:tabs',
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

      {
        path: '/records',
        component: '@/pages/RecordList',
      },

      { component: '@/pages/NotFound' },
    ],
  },

  { component: '@/pages/NotFound' },
];

export default routes;

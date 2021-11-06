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

  // @chujie: this route tree should be separated.
  // Otherwise, 'domainUrl' cannot be matched in the layout component.
  {
    path: '/domain/:domainUrl',
    component: '@/layouts/index',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        exact: true,
        path: '/domain/:domainUrl/create-problem-set',
        component: '@/pages/CreateProblemSet',
      },
      {
        exact: true,
        path: '/domain/:domainUrl/settings',
        component: '@/pages/DomainSettings',
      },
      {
        exact: true,
        path: '/domain/:domainUrl/records',
        component: '@/pages/RecordList',
      },
      {
        exact: true,
        path: '/domain/:domainUrl',
        component: '@/pages/DomainHome',
      },
    ],
  },

  {
    path: '/',
    component: '@/layouts/index',
    wrappers: ['@/wrappers/auth'],
    routes: [
      { exact: true, path: '/', component: '@/pages/DomainList' },
      { exact: true, path: '/settings', component: '@/pages/UserSettings' },
      { exact: true, path: '/domain', component: '@/pages/DomainList' },

      {
        exact: true,
        path: '/domain/:domainUrl/problem-set/:problemSetId/create-problem',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/domain/:domainUrl/problem-set/:problemSetId/system-test',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/domain/:domainUrl/problem-set/:problemSetId/scoreboard',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/domain/:domainUrl/problem-set/:problemSetId/settings',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/domain/:domainUrl/problem-set/:problemSetId',
        component: '@/pages/ProblemSetDetail',
      },
      {
        exact: true,
        path: '/domain/:domainUrl/problem-set/:problemSetId/:problemId',
        component: '@/pages/Problem',
      },

      {
        exact: true,
        path: '/domain/:domainUrl/problem/:problemId',
        component: '@/pages/Problem',
      },

      {
        exact: true,
        path: '/admin/domain/create',
        component: '@/pages/CreateDomain',
      },
      { component: '@/pages/NotFound' },
    ],
  },

  { component: '@/pages/NotFound' },
];

export default routes;

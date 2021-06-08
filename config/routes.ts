export default [
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      { exact: true, path: '/', component: '@/pages/DomainList' },
      { exact: true, path: '/login', component: '@/pages/Login' },
      { exact: true, path: '/logout', component: '@/pages/Logout' },

      { exact: true, path: '/settings', component: '@/pages/UserSettings' },
      {
        exact: true,
        path: '/settings/domain',
        component: '@/pages/UserSettings',
      },

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
      { exact: true, path: '/domain', component: '@/pages/DomainList' },

      {
        exact: true,
        path: '/problem-set/:problemSetId/create-problem',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/problem-set/:problemSetId/system-test',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/problem-set/:problemSetId/scoreboard',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/problem-set/:problemSetId/settings',
        component: '@/pages/CreateProblem',
      },
      {
        exact: true,
        path: '/problem-set/:problemSetId',
        component: '@/pages/ProblemSetDetail',
      },

      // todo: decide the final route url
      {
        exact: true,
        path: '/problem/:problemId/submit',
        component: '@/pages/Problem',
      },
      {
        exact: true,
        path: '/problem/:problemId/edit',
        component: '@/pages/Problem',
      },
      {
        exact: true,
        path: '/problem/:problemId/settings',
        component: '@/pages/Problem',
      },
      {
        exact: true,
        path: '/problem/:problemId',
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
];

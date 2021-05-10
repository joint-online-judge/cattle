export default [
  {
    exact: false, path: '/', component: '@/layouts/index',
    routes: [
      { exact: true, path: '/', component: '@/pages/index' },
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
        path: '/test/:domainUrl',
        component: '@/pages/CreateProblem',
      },
      { exact: true, path: '/domain/:domainUrl/settings', component: '@/pages/DomainSettings' },
      { exact: true, path: '/domain/:domainUrl', component: '@/pages/DomainHome' },
      { exact: true, path: '/domain', component: '@/pages/DomainList' },

      // todo: decide the final route url
      { exact: true, path:'/problem/:problemId', component: '@/pages/ProblemHome' },

      { exact: true, path: '/admin/domain/create', component: '@/pages/CreateDomain' },

      { component: '@/pages/NotFound' },
    ],
  },
];

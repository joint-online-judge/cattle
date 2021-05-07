export default [
  {
    exact: false, path: '/', component: '@/layouts/index',
    routes: [
      { exact: true, path: '/', component: '@/pages/index' },
      { exact: true, path: '/login', component: '@/pages/Login' },
      { exact: true, path: '/logout', component: '@/pages/Logout' },

      { exact: true, path: '/settings', component: '@/pages/UserSettings' },
      { exact: true, path: '/settings/domain', component: '@/pages/UserSettings' },

      { exact: true, path: '/domain/:domainUrl/settings', component: '@/pages/DomainSettings' },
      { exact: true, path: '/domain/:domainUrl', component: '@/pages/DomainHome' },
      { exact: true, path: '/domain', component: '@/pages/DomainList' },

      { exact: true, path: '/admin/domain/create', component: '@/pages/CreateDomain' },

      { component: '@/pages/NotFound' },
    ],
  },
];

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
        path: '/domain/:domainUrl/settings/:tab',
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
          { component: '@/pages/NotFound' },
        ],
      },
      {
        path: '/domain/:domainUrl/settings',
        redirect: '/domain/:domainUrl/settings/profile',
      },

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
        path: '/domain/:domainUrl/problem-set/:problemSetId/p/:problemId',
        component: '@/pages/Problem',
      },
      {
        path: '/domain/:domainUrl/problem-set/:problemSetId/:tab?',
        component: '@/pages/ProblemSetDetail',
        wrappers: ['@/wrappers/Auth'],
        routes: [
          {
            path: '/domain/:domainUrl/problem-set/:problemSetId/scoreboard',
            menuKey: 'scoreboard',
            i18nKey: 'problem_set.side_menu.scoreboard',
          },
          {
            path: '/domain/:domainUrl/problem-set/:problemSetId/system-test',
            menuKey: 'system-test',
            i18nKey: 'problem_set.side_menu.system_test',
          },
          {
            path: '/domain/:domainUrl/problem-set/:problemSetId/settings',
            menuKey: 'settings',
            i18nKey: 'problem_set.side_menu.settings',
          },
          {
            path: '/domain/:domainUrl/problem-set/:problemSetId',
            component: '@/pages/ProblemSetDetail',
          },
          { component: '@/pages/NotFound' },
        ],
      },
      {
        path: '/domain/:domainUrl/problem-set',
        component: '@/pages/ProblemSetList',
        wrappers: ['@/wrappers/Auth'],
      },

      {
        path: '/domain/:domainUrl/problem/:problemId/settings',
        component: '@/pages/ProblemConfig',
        wrappers: ['@/wrappers/Auth'],
      },
      {
        path: '/domain/:domainUrl/problem/:problemId/:tab?',
        component: '@/pages/Problem',
        wrappers: ['@/wrappers/Auth'],
      },
      {
        path: '/domain/:domainUrl/problem',
        component: '@/pages/ProblemList',
        wrappers: ['@/wrappers/Auth'],
      },
      {
        path: '/domain/:domainUrl',
        component: '@/pages/DomainHome',
        wrappers: ['@/wrappers/Auth'],
      },
      { component: '@/pages/NotFound' },
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

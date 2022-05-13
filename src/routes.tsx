import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Login = lazy(async () => import('pages/Login'))
const OAuthRegister = lazy(async () => import('pages/OAuthRegister'))
const Logout = lazy(async () => import('pages/Logout'))

const MainLayout = lazy(async () => import('layouts/index'))
const DomainLayout = lazy(async () => import('layouts/DomainLayout'))

const DomainList = lazy(async () => import('pages/DomainList'))
const UserSettings = {
	Index: lazy(async () => import('pages/UserSettings')),
	General: lazy(async () => import('pages/UserSettings/General')),
	Account: lazy(async () => import('pages/UserSettings/Account'))
}

const DomainHome = lazy(async () => import('pages/DomainHome'))
const CreateProblemSet = lazy(async () => import('pages/CreateProblemSet'))
const CreateProblem = lazy(async () => import('pages/CreateProblem'))
const JoinDomain = lazy(async () => import('pages/JoinDomain'))
const DomainSettings = {
	Index: lazy(async () => import('pages/DomainSettings')),
	Profile: lazy(async () => import('pages/DomainSettings/Profile')),
	Member: lazy(async () => import('pages/DomainSettings/Member')),
	Invitation: lazy(async () => import('pages/DomainSettings/Invitation')),
	Permission: {
		Config: lazy(async () => import('pages/DomainSettings/Permission/Config')),
		Role: lazy(async () => import('pages/DomainSettings/Permission/Role'))
	}
}

const ProblemSetList = lazy(async () => import('pages/ProblemSetList'))
const ProblemSetDetail = {
	Index: lazy(async () => import('pages/ProblemSetDetail')),
	ViewDetail: lazy(async () => import('pages/ProblemSetDetail/ViewDetail')),
	Scoreboard: lazy(async () => import('pages/ProblemSetDetail/Scoreboard')),
	SystemTest: lazy(async () => import('pages/ProblemSetDetail/SystemTest')),
	EditDetail: lazy(async () => import('pages/ProblemSetDetail/EditDetail')),
	Settings: lazy(async () => import('pages/ProblemSetDetail/Settings'))
}

const ProblemList = lazy(async () => import('pages/ProblemList'))
const ProblemDetail = {
	Index: lazy(async () => import('pages/ProblemDetail')),
	Detail: lazy(async () => import('pages/ProblemDetail/Detail')),
	Submit: lazy(async () => import('pages/ProblemDetail/Submit')),
	Edit: lazy(async () => import('pages/ProblemDetail/Edit')),
	Settings: lazy(async () => import('pages/ProblemDetail/Settings'))
}

const Profile = lazy(async () => import('pages/Profile'))

const SiteAdmin = {
	Index: lazy(async () => import('pages/SiteAdmin')),
	CreateDomain: lazy(async () => import('pages/SiteAdmin/CreateDomain'))
}

const RecordList = lazy(async () => import('pages/RecordList'))

const NotFound = lazy(async () => import('pages/NotFound'))

const children: RouteObject[] = [
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/oauth-register',
		element: <OAuthRegister />
	},
	{
		path: '/logout',
		element: <Logout />
	},
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ index: true, element: <DomainList /> },

			{
				path: 'preference',
				element: <UserSettings.Index />,
				children: [
					{
						index: true,
						element: <Navigate to='general' replace />
					},
					{
						path: 'general',
						element: <UserSettings.General />
					},
					{
						path: 'account',
						element: <UserSettings.Account />
					},
					{
						path: 'domains',
						element: <UserSettings.General />
					}
				]
			},

			{
				path: 'domain',
				children: [
					{
						index: true,
						element: <DomainList />
					},
					{
						path: ':domainUrl',
						element: <DomainLayout />,
						children: [
							{
								index: true,
								element: <DomainHome />
							},
							{
								path: 'create-problem-set',
								element: <CreateProblemSet />
							},
							{
								path: 'create-problem',
								element: <CreateProblem />
							},
							{
								path: 'join',
								element: <JoinDomain />
							},
							{
								path: 'settings',
								element: <DomainSettings.Index />,
								children: [
									{
										index: true,
										element: <Navigate to='profile' replace />
									},
									{
										path: 'profile',
										element: <DomainSettings.Profile />
									},
									{
										path: 'invitation',
										element: <DomainSettings.Invitation />
									},
									{
										path: 'member',
										element: <DomainSettings.Member />
									},
									{
										path: 'permission',
										children: [
											{
												index: true,
												element: <Navigate to='config' replace />
											},
											{
												path: 'config',
												element: <DomainSettings.Permission.Config />
											},
											{
												path: 'role',
												element: <DomainSettings.Permission.Role />
											}
										]
									}
								]
							},
							{
								path: 'problem-set',
								children: [
									{
										index: true,
										element: <ProblemSetList />
									},
									{
										path: ':problemSetId',
										element: <ProblemSetDetail.Index />,
										children: [
											{
												index: true,
												element: <ProblemSetDetail.ViewDetail />
											},
											{
												path: 'scoreboard',
												element: <ProblemSetDetail.Scoreboard />
											},
											{
												path: 'system-test',
												element: <ProblemSetDetail.SystemTest />
											},
											{
												path: 'settings',
												element: <ProblemSetDetail.Settings />
											},
											{
												path: 'edit',
												element: <ProblemSetDetail.EditDetail />
											},
											{
												path: 'detail',
												element: <ProblemSetDetail.ViewDetail />
											}
										]
									}
								]
							},
							{
								path: 'problem',
								children: [
									{
										index: true,
										element: <ProblemList />
									},
									{
										path: ':problemId',
										element: <ProblemDetail.Index />,
										children: [
											{
												index: true,
												element: <ProblemDetail.Detail />
											},
											{
												path: 'detail',
												element: <ProblemDetail.Detail />
											},
											{
												path: 'submit',
												element: <ProblemDetail.Submit />
											},
											{
												path: 'edit',
												element: <ProblemDetail.Edit />
											},
											{
												path: 'settings',
												element: <ProblemDetail.Settings />
											}
										]
									}
								]
							},
							{
								path: 'record',
								element: <RecordList />
							}
						]
					}
					// 		{
					// 			path: '/domain/:domainUrl/problem-set/:problemSetId/p/:problemId',
					// 			element: '@/pages/ProblemDetail'
					// 		},
				]
			},
			{
				path: 'user/:username',
				element: <Profile />
			},
			{
				path: 'admin',
				element: <SiteAdmin.Index />,
				children: [
					{
						index: true,
						element: <Navigate to='/admin/domain' />
					},
					{
						path: 'domain',
						element: <SiteAdmin.CreateDomain />
					}
				]
			}
		]
	},
	{ path: '*', element: <NotFound /> }
]

export default children

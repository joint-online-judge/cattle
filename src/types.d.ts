import 'jest-dom/extend-expect'

export interface ProTablePagination {
	pageSize?: number
	current?: number
}

export interface HorsePagination {
	offset?: number
	limit?: number
}

export enum ProblemSetStatus {
	Unstarted, // now < unlockAt
	Ongoing, // unlockAt <= now < dueAt
	Overdue, // dueAt <= now < lockAt
	Locked // lockAt <= now
}

import { ProblemSetStatus } from 'types'

export function getProblemSetStatus(
	unlockAtString: string | undefined,
	dueAtString: string | undefined,
	lockAtString: string | undefined
): ProblemSetStatus {
	const now = Date.now()
	const unlockAt = unlockAtString
		? new Date(unlockAtString).getTime()
		: undefined
	const dueAt = dueAtString ? new Date(dueAtString).getTime() : undefined
	const lockAt = lockAtString ? new Date(lockAtString).getTime() : undefined

	if (unlockAt && now < unlockAt) {
		return ProblemSetStatus.Unstarted
	}

	if (lockAt && now >= lockAt) {
		return ProblemSetStatus.Locked
	}

	if (dueAt && now >= dueAt) {
		return ProblemSetStatus.Overdue
	}

	return ProblemSetStatus.Ongoing
}

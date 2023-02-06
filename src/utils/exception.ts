/* eslint-disable max-classes-per-file */
/**
 * Exceptions in this file are defined for the entire app.
 * They are used to identify error type at the error boundary.
 * Usually, these exceptions shall not occur under normal conditions,
 * and shall block the app rendering if they are thrown (fatal error).
 */

/**
 * Throw when no domainUrl is found in the current path.
 */
class NoDomainUrlError extends Error {
  public constructor() {
    super('No domain url found')
    this.name = 'NoDomainUrlError'
  }
}

/**
 * Throw when no problemSetId is found in the current path.
 */
class NoProblemSetIdError extends Error {
  public constructor() {
    super('No problem set id found')
    this.name = 'NoProblemSetIdError'
  }
}

/**
 * Throw when no problemId is found in the current path.
 */
class NoProblemIdError extends Error {
  public constructor() {
    super('No problem id found')
    this.name = 'NoProblemIdError'
  }
}

/**
 * Throw when no recordId is found in the current path.
 */
class NoRecordIdError extends Error {
  public constructor() {
    super('No record id found')
    this.name = 'NoRecordIdError'
  }
}

export {
  NoDomainUrlError,
  NoProblemSetIdError,
  NoProblemIdError,
  NoRecordIdError
}

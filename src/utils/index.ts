import { omitBy, isNil } from 'lodash';

export * from './gravatar';

export function transPagination(
  parameters: ProTablePagination,
): HorsePagination {
  const { current, pageSize } = parameters;
  const offset =
    !isNil(current) && !isNil(pageSize) ? (current - 1) * pageSize : undefined;
  return omitBy(
    {
      limit: pageSize,
      offset,
    },
    isNil,
  );
}

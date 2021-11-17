import { omitBy, isNil } from 'lodash';
export * from './gravatar';

export function transPagination(params: ProTablePagination): HorsePagination {
  const { current, pageSize } = params;
  const offset =
    !isNil(current) && !isNil(pageSize) ? (current - 1) * pageSize : undefined;
  return omitBy(
    {
      limit: pageSize,
      offset: offset,
    },
    isNil,
  );
}

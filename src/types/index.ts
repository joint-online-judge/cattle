import type {
  MenuDividerType,
  MenuItemGroupType,
  MenuItemType,
  SubMenuType
} from 'antd/es/menu/hooks/useItems'

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

export type MenuItemWithPermission = (
  | MenuItemType
  | SubMenuType
  | MenuItemGroupType
  | MenuDividerType
) & {
  access?: boolean
}

export type MenuItemsWithPermission = MenuItemWithPermission[]

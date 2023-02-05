import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { omit } from 'lodash-es'
import type { MenuItemsWithPermission } from 'types'

import type React from 'react'

interface IProps extends MenuProps {
  items: MenuItemsWithPermission
}

const Index: React.FC<IProps> = ({ items, ...rest }) => {
  // @Chujie: note this component only support access control on first layer menu
  // i.e. access on submenu will be ignored
  const filteredItems = items
    .filter(item => item.access !== false)
    .map(item => omit(item, ['access']))

  // @ts-expect-error type broken after lodash omit
  return <Menu items={filteredItems} {...rest} />
}

export default Index

import { useRequest } from 'ahooks'
import { Space } from 'antd'
import Gravatar from 'components/Gravatar'
import type React from 'react'
import { Link } from 'react-router-dom'
import Horse from 'utils/service'

export interface UserBadgeProps {
  userId: string
}

const Index: React.FC<UserBadgeProps> = ({ userId }) => {
  const { data: user, loading } = useRequest(async () => {
    const res = await Horse.user.v1GetUser(userId)
    return res.data.data
  })

  if (loading) return <span>Loading...</span> // TODO: better loading

  if (!user) return <span>N/A</span>

  return (
    <Space>
      <Gravatar gravatar={user.gravatar} size={20} />
      <Link to={`/user/${user.id}`}>{user.username}</Link>
    </Space>
  )
}

export default Index

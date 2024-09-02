import {Access, User} from 'payload'

export const isAdminOrCreatedBy: Access<User> = ({req: {user}}) => {
  if (user && user.role === 'admin') return true

  if (user) {
    return {
      createdBy: {
        equals: user.id,
      },
    }
  }
  return false
}

export const isAdmin: Access<User> = ({req: {user}}) => {
  return Boolean(user?.role === 'admin')
}
export const isAdminOrAuthor: Access<User> = ({ req: { user } }) => {
  if (user && user.role === 'admin') return true

  if (user) {
    return {
      author: {
        equals: user.id,
      },
    }
  }
  return false
}
export const isAdminOrEditor: Access<User> = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin' || user?.role === 'editor')
}

export const isAdminOrB2B: Access<User> = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin' || user?.role === 'b2b')
}
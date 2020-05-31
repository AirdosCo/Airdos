import _ from 'lodash/fp'

// eslint-disable-next-line no-unused-vars
import { IUserType } from '../UserType'
import { users, passwords } from '../../../dud-data'
import { getUserFromToken } from '../../../utils'

const userPaths = ['id', 'name', 'firstName', 'lastName', 'username', 'groups', 'collegeName', 'followers', 'following']

const publicPaths = ['id', 'name', 'firstName', 'lastName', 'username', 'collegeName']

export const getUserModels = ({ user }: {user: IUserType | undefined}) => ({
  getByUsername: (username: string) => {
    if (_.get('username', user) === username) {
      // TODO: have a list of public vs private paths
      return _.pick(userPaths, users[_.get('username', user)])
    }
    if (_.has(username, users)) {
      const foundUser = users[username]
      if (user) {
        return _.pick(userPaths, foundUser)
      }
      return _.pick(publicPaths, foundUser)
    }
    return undefined
  },
  getByToken: ({ token }: {token: string}) => {
    if (user) {
      return user
    }
    return getUserFromToken(token)
  },
  verifyAndReturnUser: ({ username, password }) => {
    if (user) {
      return user
    }
    if (_.get(username, passwords) === password) {
      return users[username]
    }
    return undefined
  },
})

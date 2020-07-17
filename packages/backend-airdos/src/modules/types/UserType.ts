import { gql } from 'apollo-server-lambda'

export interface IUserType {
  id: string
  name: string
  firstName: string
  lastName: string
  username: string
  groups: {label: string, value: string}[]
  chosenGroups: {label: string, value: string}[]
  collegeName: string
  followers: [string]
  following: [string]
}

export const typeDefs = gql`
  type ValueLabelNode {
    value: String
    label: String
  }
  type User implements Node {
    id: ID!
    name: String
    firstName: String
    lastName: String
    username: String
    groups: [ValueLabelNode] 
    chosenGroups: [ValueLabelNode]
    collegeName: String
    followers: [String]
    following: [String]
  }
`

export const resolvers = {
  Query: {
    userByUsername: (parent, { username }, context) => context.models.user.getByUsername(username),
    userByLogin: (parent, props, context) => context.models.user.verifyAndReturnUser(props),
    userByToken: (parent, props, context) => context.models.user.getByToken(props),
  },
}

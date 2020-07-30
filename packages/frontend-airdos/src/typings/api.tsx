export type Maybe<T> = T
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: "Query"
  posts?: Maybe<Array<Maybe<Post>>>
  userByUsername?: Maybe<User>
  userByLogin?: Maybe<User>
  userByToken?: Maybe<User>
  groupByName?: Maybe<Group>
  postById?: Maybe<Post>
}

export type QueryUserByUsernameArgs = {
  username: Scalars["String"]
}

export type QueryUserByLoginArgs = {
  username: Scalars["String"]
  password: Scalars["String"]
}

export type QueryUserByTokenArgs = {
  token: Scalars["String"]
}

export type QueryGroupByNameArgs = {
  name: Scalars["String"]
}

export type QueryPostByIdArgs = {
  id: Scalars["String"]
}

export type Post = Node & {
  __typename?: "Post"
  id: Scalars["ID"]
  childrenIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  parentId?: Maybe<Scalars["ID"]>
  group?: Maybe<ValueLabelNode>
  user?: Maybe<Scalars["String"]>
  text?: Maybe<Scalars["String"]>
  attachmentLink?: Maybe<Scalars["String"]>
  likes?: Maybe<Scalars["Int"]>
  timeCreated?: Maybe<Scalars["Int"]>
  replies?: Maybe<Array<Maybe<Post>>>
}

export type Node = {
  id: Scalars["ID"]
}

export type ValueLabelNode = {
  __typename?: "ValueLabelNode"
  value?: Maybe<Scalars["String"]>
  label?: Maybe<Scalars["String"]>
}

export type User = Node & {
  __typename?: "User"
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
  groups?: Maybe<Array<Maybe<ValueLabelNode>>>
  chosenGroups?: Maybe<Array<Maybe<ValueLabelNode>>>
  collegeName?: Maybe<Scalars["String"]>
  followers?: Maybe<Array<Maybe<Scalars["String"]>>>
  following?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type Group = Node & {
  __typename?: "Group"
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  displayName?: Maybe<Scalars["String"]>
  posts?: Maybe<Array<Maybe<Post>>>
  members?: Maybe<Array<Maybe<Scalars["String"]>>>
  admins?: Maybe<Array<Maybe<Scalars["String"]>>>
  private?: Maybe<Scalars["Boolean"]>
}

export enum PostTypeEnum {
  PublicizingResearch = "PUBLICIZING_RESEARCH",
  PrePeerReview = "PRE_PEER_REVIEW",
  DiscussionTopic = "DISCUSSION_TOPIC",
  ConferenceAwareness = "CONFERENCE_AWARENESS",
  None = "NONE",
}

import gql from 'graphql-tag'

// TODO: how to colocate this with graphql api?
enum PostTypeEnum {
  PUBLICIZING_RESEARCH = "PUBLICIZING_RESEARCH",
  PRE_PEER_REVIEW = "PRE_PEER_REVIEW",
  DISCUSSION_TOPIC = "DISCUSSION_TOPIC",
  CONFERENCE_AWARENESS = "CONFERENCE_AWARENESS",
  NONE = "NONE",
}

interface IPost {
  location: string,
  title: string,
  postType: PostTypeEnum,
  text: string,
}

export interface IGetPosts {
  posts: [IPost]
}

const GET_POSTS = gql`
  query getPosts { 
    posts {
      location
      title
      postType
      text
    }
  }
`

const VERIFY_AND_RETURN_USER = gql`
  query verifyAndReturnUser($username: String!, $password: String!) {
    verifyAndReturnUser(username: $username, password: $password) {
      id
      name
      firstName
      lastName
      username
      groups
      collegeName
      followers
      following
    }
  }
`

const GET_USER = gql`
  query getProfile($username: String!){ 
    user(username: $username) {
      id
      name
      firstName
      lastName
      username
      groups
      followers
      collegeName
    }
  }
`

export { GET_POSTS, VERIFY_AND_RETURN_USER, GET_USER }
import { makeExecutableSchema } from 'graphql-tools'

import { resolver } from './resolver'
const typeDefs = `
  type Query {
    hello: String!
    Users: [User!]
    Posts: [Post!]
  }

  type UserShort {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    name: String
    username: String
    email: String
    posts: [Post]
    password: String
  }

  type Tag {
    _id: ID
    name: String
  }

  type Post {
    _id: ID
    title: String
    slug: String
    body: String
    readingTime: String
    author: [UserShort]
    language: String
    image: String
    published: Boolean
    tags:[Tag]

  }
  
  type Mutation {
    createUser(input: UserInput): User
    deleteUser(_id:ID): User
    createPost(input: PostInput): Post
    deletePost(_id:ID): Post
  }

  input UserInput {
    name: String
    username: String
    email: String
    
    password: String
  }

  input PostInput {
    title: String!
    slug: String!
    body: String!
    author: ID
    tags:[TagInput]
  }

  input TagInput {
    name: String
  }
  
`

 //export default makeExecutableSchema({
    //typeDefs: typeDefs,
  //  resolvers:resolver
//})
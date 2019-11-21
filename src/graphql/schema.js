import { makeExecutableSchema } from 'graphql-tools'

import { resolver } from './resolver'
const typeDefs = `
  type Query {
    hello: String!
    Users: [User!]
  }

  type User {
    _id: ID
    name: String
    username: String
    email: String
    posts: [String]
    password: String
    signUpDate: Datetime!
    lastloginDate: Datetime!
  }

  type Mutation {
    createUser(input: UserInput): User
    deleteUser(_id:ID): User
  }

  input UserInput {
    name: String
    username: String
    email: String
    posts:[String]
    password: String
  }
`

 export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers:resolver
})
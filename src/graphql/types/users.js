export default `
type Query {
  Users: [User!]
  User(_id: ID): User!
}

type UserShort {
  _id: String
  name: String
  thumbnail: String
}

type User {
  _id: String
  name: String
  username: String
  email: String
  posts: [PostShort!]
  password: String
}


type Mutation {
  createUser(input: UserInput): User
  deleteUser(_id:ID): User

}

input UserInput {
  name: String
  username: String
  email: String
  password: String
}


`

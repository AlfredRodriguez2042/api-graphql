export default `
type Query {
  Users: [User!]
}

type UserShort {
  _id: ID
  name: String
  thumbnail: String
}

type User {
  _id: ID
  name: String
  username: String
  email: String
  posts: [Post!]
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





`;
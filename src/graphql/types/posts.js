export default `
  type Query {
    Posts: [Post!]
    Post(_id:ID): Post!
  }

  type Post {
    _id: String
    title: String
    slug: String
    body: String
    readingTime: String
    author: UserShort
    lenguage: String
    image: String
    published: Boolean
    createdAt: String
    tags: [Tags!]
  }
  type PostShort {
    _id: ID!
    title: String!
    slug: String!
  }

  type Mutation {
    createPost(input: PostInput): Post!
    deletePost(_id:ID): Post!
  }

  input PostInput {
    title: String!
    slug: String!
    body: String!
    author: ID!
    tags:[TagInput]!
  }

`

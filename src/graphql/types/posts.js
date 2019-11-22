export default `
type Query {
    Posts: [Post!]
  }
  
  type Post {
    _id: ID
    title: String
    slug: String
    body: String
    readingTime: String
    author: User
    language: String
    image: String
    published: Boolean
    tags: [Tag!]

  }
  
  type Mutation {
    createPost(input: PostInput): Post
    deletePost(_id:ID): Post
  }


  input PostInput {
    title: String!
    slug: String!
    body: String!
    author: ID
    tags:[TagInput]
  }

 

  
`;
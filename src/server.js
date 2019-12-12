import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import express from 'express'
import cookieParser from 'cookie-parser'
import { Connect } from './database'
import { config } from 'dotenv'
import { authMiddleware } from './middleware/auth'

config()
Connect()
const app = express()
const route = '/graphql'
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/types')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './graphql/resolvers'))
)
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
}
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(route, authMiddleware)
app.use(cookieParser())

export const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: request => ({ request })
})
apolloServer.applyMiddleware({ app, path: route, cors: corsOptions })
export default app

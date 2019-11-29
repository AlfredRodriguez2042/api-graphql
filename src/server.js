//  import express from 'express'
import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import { Connect } from './database'
import models from './models'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/types')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './graphql/resolvers'))
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

Connect()

export const apolloServer = new ApolloServer({
  schema,
  context: models
})

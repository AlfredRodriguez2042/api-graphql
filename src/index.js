//Dependencies
import express from 'express'
//import graphqlHTTP from 'express-graphql'
//import schema from './graphql/schema'
import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas'


import { Connect } from './database'
import models from './models'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname,'./graphql/types')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname,'./graphql/resolvers')))

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
    
})


const app = express()
Connect()


const apolloServer = new ApolloServer({
    schema:schema,
    context: models
})

apolloServer.listen(3000).then(({ url }) => {
    console.log(` >>> 🚀  Server ready at ${url}`);
  });

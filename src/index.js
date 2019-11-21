//Dependencies
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './graphql/schema'
import { ApolloServer, makeExecutableSchema } from 'apollo-server'

import { Connect } from './database'

const app = express()
Connect()


const apolloServer = new ApolloServer({
    schema
})

apolloServer.listen(3000).then(({ url }) => {
    console.log(` >>> 🚀  Server ready at ${url}`);
  });

import app, { apolloServer } from './server'

app.listen({ port: 3000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:3000${apolloServer.graphqlPath}`
  )
})

import app, { apolloServer } from './server'
import { createServer } from 'http'

const httpServer = createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)
const PORT = 3000

httpServer.listen(PORT, () => {
  console.log(
    `>>>   🚀   Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
  console.log(
    `>>>   🚀   Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
  )
})

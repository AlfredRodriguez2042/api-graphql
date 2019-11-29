import { apolloServer } from './server'

apolloServer.listen(3000).then(({ url }) => {
  console.log(` >>> 🚀  Server ready at ${url}`)
})

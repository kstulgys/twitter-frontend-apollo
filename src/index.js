import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import "./styles.css"

import React, { useEffect } from "react"
import ReactDOM from "react-dom"

import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { ApolloProvider } from "react-apollo-hooks"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import useAuth from "./useAuth"
import NavBar from "./NavBar"
import Wellcome from "./Wellcome"
import Container from "./Container"

// import Pages from './pages'
// import Login from './pages/login'
import { resolvers, typeDefs } from "./resolvers"
// import injectStyles from './styles'

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint

const cache = new InMemoryCache()
const authToken = localStorage.getItem("authToken")
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://jtwrt.sse.codesandbox.io",
    headers: {
      authorization: authToken
    }
  }),
  resolvers,
  typeDefs
})

// const state = { authToken: false }

function App() {
  // const [token, setToken] = useState(null)
  const token = useAuth()
  // const { state, setState } = store.useStore()

  // async function getUser() {
  //   const { user = {} } = await getUserInfo(state.authToken)
  //   const profile_image_url = user.profile_image_url.replace("_normal", "")
  //   setState(state => {
  //     state.user = user
  //     state.user.profile_image_url = profile_image_url
  //   })
  // }

  // useEffect(() => {
  //   if (token) {
  //     getUser()
  //   }
  // }, [token])

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <NavBar />
      {token ? <Container /> : <Wellcome />}
    </div>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

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

import { resolvers, typeDefs } from "./resolvers"

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

function App() {
  const token = useAuth()

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

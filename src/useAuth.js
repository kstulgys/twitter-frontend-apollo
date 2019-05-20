import { useEffect, useState } from "react"
// import store from "./Store"

export default function useAuth() {
  // const { state, setState } = store.useStore()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("authToken") || null
    const tokenFromURL = new URL(document.location).searchParams.get("token")

    if (tokenFromStorage) {
      setToken(JSON.parse(tokenFromStorage))
      // setState(state => {
      //   state.authToken = JSON.parse(tokenFromStorage)
      // })
      return
    }

    if (tokenFromURL) {
      localStorage.setItem("authToken", JSON.stringify(tokenFromURL))
      window.history.pushState(null, null, "/")
      window.location.reload()

      // setState(state => {
      //   state.authToken = tokenFromURL
      // })
      setToken(JSON.parse(tokenFromURL))
    }
  }, [])

  return token
}

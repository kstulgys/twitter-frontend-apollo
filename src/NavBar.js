import React, { useState, useEffect } from "react"
import Login from "./Login"
import { useQuery } from "react-apollo-hooks"
// import store from "./Store"
// import { searchTweets, createTweet, getTimelineTweets } from "./API"
import { Button, Modal, ModalBody, FormTextarea } from "shards-react"
import { GET_USER } from "./Query"

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data, error, loading } = useQuery(GET_USER)

  function handleSubmit(e) {
    e.preventDefault()
    alert(searchQuery)
  }

  function signout() {
    window.localStorage.removeItem("authToken")
    window.location.reload()
  }

  return (
    <nav className="shadow py-2 bg-white">
      <div className="container d-flex align-items-center justify-content-between">
        <span className="d-flex align-items-center">
          <i className="fab fa-twitter fa-2x" />
          <p>Apollo</p>
        </span>
        <div className="d-flex">
          {data.user && (
            <form onSubmit={handleSubmit}>
              <div className="input-group input-group-seamless">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-search" />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Text input with checkbox"
                  placeholder="search tweets"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          )}
          <div className="d-flex align-items-center">
            {data.user ? (
              <>
                <div className="nav-image">
                  <img
                    src={data.user.profile_image_url}
                    alt="..."
                    className="rounded-circle mx-4"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span
                    className="badge badge-dark nav-logout"
                    onClick={signout}
                  >
                    <p>Sign Out</p>
                  </span>
                </div>
                <TweetModal />
              </>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function TweetModal() {
  // const { state, setState } = store.useStore()
  const [open, toggle] = useState(false)
  const [value, setValue] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      // const res = await createTweet({
      //   authToken: state.authToken,
      //   update: value
      // })
      // setState(state => {
      //   state.userTweets.unshift(res.tweet)
      //   state.tweets.unshift(res.tweet)
      // })
      setValue("")
      toggle(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Button
        className="btn btn-outline-dark btn-pill"
        onClick={() => toggle(!open)}
      >
        tweet
      </Button>
      <Modal open={open} toggle={() => toggle(!open)}>
        <ModalBody>
          <div>
            <p className="mb-2">
              {!value && "🤔 Waiting for you to say something..."}
            </p>
            <FormTextarea onChange={e => setValue(e.target.value)} />
          </div>
          <Button
            className="btn btn-outline-dark btn-pill mt-4"
            onClick={handleSubmit}
          >
            submit
          </Button>
        </ModalBody>
      </Modal>
    </div>
  )
}

// async function handleSubmit(e) {
//   e.preventDefault()
//   if (searchQuery === "") {
//     await setUserTweets()
//   } else {
//     await setSearchTweets(searchQuery)
//   }
//   setSearchQuery("")
// }

// async function setSearchTweets(query) {
//   const { tweets = [] } = await searchTweets({
//     authToken: state.authToken,
//     query
//   })
//   setState(state => {
//     state.tweets = tweets.statuses
//   })
// }

// async function setUserTweets() {
//   try {
//     const res = await getTimelineTweets({ authToken: state.authToken })
//     console.log(res)
//     setState(state => {
//       state.tweets = res.tweets
//     })
//   } catch (e) {
//     console.log(e.message)
//   }
// }

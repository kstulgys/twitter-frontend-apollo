import React, { useState, useEffect } from "react"
import Tweet from "./Tweet"
import { useQuery } from "react-apollo-hooks"
import { GET_FEED } from "./Query"

export default function Feed() {
  const { data, error, loading } = useQuery(GET_FEED)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (data) {
    return (
      <div>
        <button className="btn btn-link">
          <h4 className="mb-4 font-weight-bold">feed</h4>
        </button>
        {data.tweets.length > 1 ? (
          data.tweets.map(tweet => {
            return <Tweet key={tweet.id} tweet={tweet} />
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

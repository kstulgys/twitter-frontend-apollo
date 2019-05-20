import React, { useState, useEffect } from "react"
import { useQuery } from "react-apollo-hooks"
import { GET_USER } from "./Query"

export default function Profile() {
  const { data, error, loading } = useQuery(GET_USER)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (data) {
    return (
      <div>
        <div>
          <img
            src={data.user.profile_image_url}
            alt="user-image"
            className="rounded-circle shadow profile-image"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <div className="mt-3">
          <h5>{data.user.name}</h5>
          <h6 className="font-weight-bold text-muted my-1">
            @{data.user.screen_name}
          </h6>
          <p className="text-muted">{data.user.location}</p>
        </div>
      </div>
    )
  }
}

import React, { useState, useEffect } from "react"

export default function Tweet({ tweet }) {
  async function handleFavorite() {
    console.log("handleFavorite")
  }

  async function handleUnFavorite() {
    console.log("handleUnFavorite")
  }

  return (
    <div className="shadow w-100 rounded d-flex p-3 mb-3 bg-white">
      <div className="mt-1">
        <img
          src={tweet.profile_image_url}
          alt="..."
          className="rounded-circle shadow"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
      <div className="d-flex flex-column  w-100">
        <div className="text-left ml-3 ">
          <div className="">
            <span
              style={{ fontSize: "14px" }}
              className="font-weight-bold mr-1"
            >
              {tweet.name}
            </span>
            <span
              style={{ fontSize: "14px" }}
              className="font-weight-bold text-muted"
            >
              @{tweet.screen_name}
            </span>
          </div>
          <div className="">
            <p className="text-left" style={{ fontSize: "14px" }}>
              {tweet.text}
            </p>
          </div>
        </div>
        <div className="ml-3 mt-3">
          <div className="d-flex w-50 align-items-center justify-content-between">
            <span>
              <i className="far fa-comment" />
            </span>
            <span>
              <i className="fas fa-retweet" />
            </span>
            {tweet.favorited ? (
              <span onClick={handleUnFavorite}>
                <i className="fas fa-heart" />
              </span>
            ) : (
              <span onClick={handleFavorite}>
                <i className="far fa-heart" />
              </span>
            )}
            <span>
              <i className="far fa-envelope" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

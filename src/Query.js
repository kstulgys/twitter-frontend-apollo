import gql from "graphql-tag"

export const GET_USER = gql`
  {
    user {
      id
      profile_image_url
      screen_name
      name
      location
    }
  }
`

export const GET_FEED = gql`
  {
    tweets {
      id
      profile_image_url
      name
      text
      screen_name
      favorited
    }
  }
`

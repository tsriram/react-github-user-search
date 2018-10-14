# GitHub User Search

This app uses GitHub's [GraphQL API](https://developer.github.com/v4/) to search
for users. There's a search box where user can input text and hit `Enter` (or
click on `Search` button) to see search results. User can also paginate through
the results.

Focus of this app is on delivering the search functionality and the UI design is
kept to minimal using simple CSS.

## Stack

This app was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app) and
uses [create-react-app-ts](https://github.com/wmonk/create-react-app-typescript)
for [TypeScript](http://typescriptlang.org/) support.

It uses [Apollo Client](https://www.apollographql.com/client) to work with
GraphQL API.

## Notes

- This app requires a valid GitHub access token to be set as an environment
  variable. You can generate a new access token by following
  [this article](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

  Once you have the token, set it as the value for the variable
  `REACT_APP_GITHUB_TOKEN` in `.env` file of the app.

- To keep things simple, default page size is set to `5`. This can be changed to
  a desired number in `/src/constants.ts`.

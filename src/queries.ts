import gql from "graphql-tag";

export const SearchUsersQuery = gql`
  query SearchUsers($query: String!) {
    search(type: USER, query: $query, first: 10) {
      userCount
      edges {
        node {
          ... on User {
            name
            email
            bio
            login
            avatarUrl
            location
            url
          }
        }
      }
    }
  }
`;

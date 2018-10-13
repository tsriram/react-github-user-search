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

interface SearchNode {
  readonly node: {
    readonly name: string;
    readonly email: string;
    readonly bio: string;
    readonly login: string;
    readonly avatarUrl: string;
    readonly location: string;
    readonly url: string;
  };
}

export interface SearchResults {
  readonly search: {
    readonly userCount: number | undefined;
    readonly edges: ReadonlyArray<SearchNode>;
  };
}

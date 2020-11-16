import { gql } from "@apollo/client";

export const ChangeTitle = gql`
  mutation($id: ID!, $title: String!) {
    changeTitle(id: $id, title: $title) {
      title
      _id
    }
  }
`;

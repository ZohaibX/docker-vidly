import { gql } from "@apollo/client";

export const DeleteTask = gql`
  mutation($id: ID!) {
    deleteTask(id: $id) {
      title
    }
  }
`;

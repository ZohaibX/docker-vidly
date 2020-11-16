import { gql } from "@apollo/client";

export const GetAllTasks = gql`
  query {
    getAllTasks {
      _id
      title
    }
  }
`;

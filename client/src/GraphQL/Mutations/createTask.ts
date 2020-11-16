import { gql } from "@apollo/client";

export const CreateTask = gql`
  mutation($title: String!) {
    createTask(taskData: { title: $title }) {
      title
      _id
      createdDate
    }
  }
`;

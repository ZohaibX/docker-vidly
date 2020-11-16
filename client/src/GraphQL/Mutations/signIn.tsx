import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

// mutation () {
//   signIn(email:"test1" , password:"test1") {
//     token
//   }
// }

/// <reference types="react-scripts" />

// to solve an error 
declare module "react/jsx-runtime" {
  export default any;
}
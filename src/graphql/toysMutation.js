import { gql } from "@apollo/client";
 

export const DELETE_ToyById = gql`
  mutation ($id: ID!) {
    removeToy(id: $id) {
      id
    }
  }
`;

export const UPDATE_Toy = gql`
  mutation ($id: ID!, $name: String, $price: Int, $imageUrl: String) {
    updateToy(id: $id, name: $name, price: $price, imageUrl: $imageUrl) {
      id
      name
      price
      imageUrl
    }
  }
`;

export const CREATE_NewToy = gql`
  mutation ($name: String!, $price: Int!, $imageUrl: String!) {
    createToy(name: $name, price: $price, imageUrl: $imageUrl) {
      id
      name
      price
      imageUrl
    }
  }
`;




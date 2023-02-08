import {gql} from '@apollo/client';

export const GET_AllToys = gql`
query{
    allToys{
       id
       name
       imageUrl
       price
    }
  }
`;

export const GET_ToyById = gql`
  query ($id: ID!) {
    Toy(id: $id) {
      id
      name
      price
      imageUrl
    }
  }
`;
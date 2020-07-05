import gql from 'graphql-tag';

export const addNumber = gql`
  mutation($ownerId: String!, $name: String!, $phone: String!) {
    addNumber(options: { ownerId: $ownerId, name: $name, phone: $phone }) {
      id
      ownerId
      name
      phone
    }
  }
`;

export const getNumberById = gql`
  query($ownerId: String!) {
    phoneNumbersPersonal(ownerId: $ownerId) {
      id
      name
      phone
    }
  }
`;

export const deleteNumber = gql`
  mutation deleteNumber($id: Int!) {
    deleteNumber(id: $id)
  }
`;

export const updateNumber = gql`
  mutation updateNumber($id: Int!, $input: PhoneNumberUpdateInput!) {
    updateNumber(id: $id, input: $input)
  }
`;

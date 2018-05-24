import gql from 'graphql-tag';

//create

export const CREATE_CHAT_MUTATION = gql`
  mutation CreateChatMutation($content: String!, $from: String!) {
    createChat(content: $content, from: $from) {
      id
      createdAt
      from
      content
    }
  }
`;


// update

export const UPDATE_CHAT_MUTATION = gql`
  mutation UpdateChat($id: ID!, $content: String!){
    updateChat(id: $id, content: $content) {
      content
    }
  }
`;


// fetch

export const ALL_CHATS_QUERY = gql`
  query AllChatsQuery {
    allChats {
      id
      createdAt
      from
      content
    }
  }
`;


//subscriptions

export const ALL_CHATS_SUBSCRIPTION = gql`
  subscription {
    Chat(filter: { mutation_in: [CREATED] }) {
      node {
        id
        from
        content
        createdAt
      }
    }
  }
`;

export const UPDATE_CHAT_SUBSCRIPTION = gql`
  subscription {
    Chat(filter: { mutation_in: [UPDATED] }) {
      mutation
      node {
        id
        from
        content
        createdAt
      }
    }
  }
`;

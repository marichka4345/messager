import gql from 'graphql-tag';

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

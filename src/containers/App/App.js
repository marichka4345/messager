import React, { Component } from 'react';

import { graphql, compose, withApollo } from 'react-apollo';
import {
  CREATE_CHAT_MUTATION,
  ALL_CHATS_QUERY,
  ALL_CHATS_SUBSCRIPTION
} from '../../queries/chat-queries';

import MessageList from '../MessageList/MessageList';
import AddMessageInput from '../../components/AddMessageInput/AddMessageInput';

import styles from './app.scss';
import './app.global.scss';

class App extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.loadChats();
    this.subscribeToNewChats();
  }

  loadChats = chats => {
    if (chats) {
      this.setState({
        messages: chats
      });
      return;
    }

    const { client } = this.props;
    client.query({ query: ALL_CHATS_QUERY }).then(response =>
      this.setState({
        messages: response.data.allChats || []
      })
    );

  };

  subscribeToNewChats = () => {
    this.props.allChatsQuery.subscribeToMore({
      document: ALL_CHATS_SUBSCRIPTION,
      updateQuery: (previous, { subscriptionData }) => {
        const newChatLinks = [
          ...previous.allChats,
          subscriptionData.data.Chat.node
        ];

        const result = {
          ...previous,
          allChats: newChatLinks
        };
        this.loadChats(newChatLinks);
        return result;
      }
    });
  };

  render() {
    const { createChatMutation } = this.props;
    const { messages } = this.state;

    return (
      <div className={styles.messagesContainer}>
        <MessageList messages={messages} />
        <AddMessageInput sendMessage={createChatMutation} />
      </div>
    );
  }
}

export default withApollo(
  compose(
    graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery' }),
    graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation' })
  )(App)
);

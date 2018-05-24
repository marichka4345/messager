import React, { Component, Fragment } from 'react';
import ReactLoading from 'react-loading';

import { graphql, compose, withApollo } from 'react-apollo';
import {
  CREATE_CHAT_MUTATION,
  ALL_CHATS_QUERY,
  ALL_CHATS_SUBSCRIPTION,
  UPDATE_CHAT_MUTATION
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
    this.subscribeToChats(this.props.allChatsQuery, ALL_CHATS_SUBSCRIPTION);
  }

  loadChats = chats => {
    if (chats) {
      this.setState({
        messages: chats
      });
      return;
    }

    const { client } = this.props;
    client.query({ query: ALL_CHATS_QUERY }).then(response => {
      this.setState({
        messages: response.data.allChats || []
      });
    });
  };

  updateChat = async message => {
    const { updateChatMutation } = this.props;

    const response = await updateChatMutation({ variables: message });

    this.loadChats();
    return response.data.updateChat.content;
  };

  updateQuery = (previous, { subscriptionData }) => {
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
  };

  subscribeToChats(query, document) {
    const { updateQuery } = this;
    query.subscribeToMore({
      document,
      updateQuery
    });
  }

  render() {
    const { allChatsQuery, createChatMutation } = this.props;
    const { messages } = this.state;

    return (
      <Fragment>
        {allChatsQuery.loading ? (
          <div className={styles.loader}>
            <ReactLoading type="bars" width={150} height={100} />
          </div>
        ) : (
          <div className={styles.messagesContainer}>
            <h1>Super Chat</h1>
            <MessageList messages={messages} updateChat={this.updateChat} />
            <AddMessageInput sendMessage={createChatMutation} />
          </div>
        )}
      </Fragment>
    );
  }
}

export default compose(
  withApollo,
  graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation' }),
  graphql(UPDATE_CHAT_MUTATION, { name: 'updateChatMutation' }),
  graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery' })
)(App);

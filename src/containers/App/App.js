import React, { Component, Fragment } from 'react';
import ReactLoading from 'react-loading';

import { graphql, compose, withApollo } from 'react-apollo';
import {
  CREATE_CHAT_MUTATION,
  ALL_CHATS_QUERY,
  ALL_CHATS_SUBSCRIPTION,
  UPDATE_CHAT_MUTATION,
  UPDATE_CHAT_SUBSCRIPTION
} from '../../queries/chat-queries';

import Modal from '../../components/Modal/Modal';
import MessageList from '../../components/MessageList/MessageList';
import AddMessageInput from '../AddMessageInput/AddMessageInput';

import styles from './app.scss';
import './app.global.scss';

class App extends Component {
  state = {
    messages: [],
    showModal: true,
    nameValue: '',
    name: ''
  };

  componentDidMount() {
    this.loadChats();
    this.subscribeToChats(this.props.allChatsQuery, ALL_CHATS_SUBSCRIPTION);
    this.subscribeToChats(this.props.allChatsQuery, UPDATE_CHAT_SUBSCRIPTION);
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

  updateChat = async message => {
    const { updateChatMutation } = this.props;

    const response = await updateChatMutation({
      variables: message,
      refetchQueries: [{ query: ALL_CHATS_QUERY }]
    });
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

  setName = ({ target }) =>
    this.setState({
      nameValue: target.value
    });

  saveName = () => {
    const { nameValue } = this.state;

    if (!nameValue) {
      return;
    }
    this.setState({
      name: nameValue,
      showModal: false
    });
  };

  render() {
    const { allChatsQuery, createChatMutation } = this.props;
    const { messages, nameValue, name, showModal } = this.state;

    const modal = (
      <Modal>
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <h2>Enter your name</h2>
            <input
              className={styles.nameInput}
              value={nameValue}
              onChange={this.setName}
            />
            <button className={styles.saveButton} onClick={this.saveName}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    );

    const chat = allChatsQuery.loading ? (
      <div className={styles.loader}>
        <ReactLoading type="bars" width={150} height={100} />
      </div>
    ) : (
      <div className={styles.messagesContainer}>
        <h1>Super Chat</h1>
        <MessageList
          messages={messages}
          updateChat={this.updateChat}
          name={name}
        />
        <AddMessageInput sendMessage={createChatMutation} name={name} />
      </div>
    );

    return <Fragment>{showModal ? modal : chat}</Fragment>;
  }
}

export default compose(
  withApollo,
  graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation' }),
  graphql(UPDATE_CHAT_MUTATION, { name: 'updateChatMutation' }),
  graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery' })
)(App);

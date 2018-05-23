import React, { Component } from 'react';

import Message from '../../components/Message/Message';

import styles from './messageList.scss';

export default class MessageList extends Component {
  render() {
    const { messages } = this.props;

    return (
      <div className={styles.list}>
        {messages.map(message => <Message key={message.id} {...message} />)}
      </div>
    );
  }
}

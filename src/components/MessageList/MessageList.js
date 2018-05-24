import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Message from '../../containers/Message/Message';

import './messageList.global.scss';
import styles from './messageList.scss';

export default class MessageList extends Component {
  render() {
    const { messages, updateChat, name } = this.props;

    return (
      <CSSTransitionGroup
        className={styles.list}
        transitionName="messages"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={500}>
        {messages.length > 0 ? (
          messages.map(message => (
            <Message
              key={message.id}
              updateChat={updateChat}
              name={name}
              {...message}
            />
          ))
        ) : (
          <p>Please start conversation</p>
        )}
      </CSSTransitionGroup>
    );
  }
}

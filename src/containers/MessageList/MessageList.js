import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Message from '../../components/Message/Message';

import './messageList.global.scss';
import styles from './messageList.scss';

export default class MessageList extends Component {
  render() {
    const { messages, updateChat } = this.props;

    return (
      <div className={styles.list}>
        <CSSTransitionGroup
          transitionName="messages"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          {messages.length > 0 ? (
            messages.map(message => (
              <Message key={message.id} updateChat={updateChat} {...message} />
            ))
          ) : (
            <p>Please start conversation</p>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}

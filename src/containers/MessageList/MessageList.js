import React, { Component } from 'react';

import Message from '../../components/Message/Message';

import styles from './messageList.scss';

export default class MessageList extends Component {
  render() {
    return (<div className={styles.list}>
      Message List
      <Message />
    </div>);
  }
}
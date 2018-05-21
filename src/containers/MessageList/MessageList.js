import React, { Component } from 'react';

import Message from '../../components/Message/Message';

import styles from './messageList.scss';

export default class MessageList extends Component {
  render() {
    return (
      <div className={styles.list}>
        <Message author="Mariia" text="aaaa" time="01/01/2018" />
        <Message author="Oleh" text="aaaa" time="01/01/2018" />
        <Message author="Mariia" text="aaaa" time="01/01/2018" />
        <Message author="Oleh" text="aaaa" time="01/01/2018" />
      </div>
    );
  }
}

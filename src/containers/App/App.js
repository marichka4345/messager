import React, { Component } from 'react';

import MessageList from '../MessageList/MessageList';
import AddMessageInput from '../../components/AddMessageInput/AddMessageInput';

import styles from './app.scss';
import './app.global.scss';

export default class App extends Component {
  state = {
    messages: [
      { author: 'Mariia', text: 'aaaa', time: '01/01/2018' },
      { author: 'Oleh', text: 'aaaa', time: '01/01/2018' },
      { author: 'Mariia', text: 'aaaa', time: '01/01/2018' },
      { author: 'Oleh', text: 'aaaa', time: '01/01/2018' }
    ]
  };
  sendMessage = message => {
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }));
  };

  render() {
    const { messages } = this.state;

    return (
      <div>
        <div className={styles.messagesContainer}>
          <MessageList messages={messages} />
          <AddMessageInput sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

import MessageActionButton from '../../components/MessageActionButton/MessageActionButton';

import { formatDateTime } from '../../utils/dateTime';

import styles from './message.scss';

export default class Message extends Component {
  state = {
    isEditIconVisible: false
  };

  toggleEditIconVisibility = () => {
    if (this.props.from === 'Mariia') {
      this.setState(prevState => ({
        isEditIconVisible: !prevState.isEditIconVisible
      }));
    }
  };

  render() {
    const { from, content, createdAt } = this.props;
    const { isEditIconVisible } = this.state;

    return (
      <section
          className={
            from === 'Mariia'
                ? styles.myMessageContainer
                : styles.otherPersonMessageContainer
          }
      >
        <p className={styles.author}>{from}</p>
        <main
            onMouseEnter={this.toggleEditIconVisibility}
            onMouseLeave={this.toggleEditIconVisibility}
            className={
              from === 'Mariia' ? styles.myMessage : styles.otherPersonMessage
            }>
          {content}
          <MessageActionButton isEditIconVisible={isEditIconVisible} />
        </main>
        <p className={styles.time}>{formatDateTime(createdAt)}</p>
      </section>
    );
  }
}

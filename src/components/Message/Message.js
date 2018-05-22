import React from 'react';

import styles from './message.scss';

export default ({ author, text, time }) => (
  <div
    className={
      author === 'Mariia'
        ? styles.myMessageContainer
        : styles.otherPersonMessageContainer
    }>
    <p className={styles.author}>{author}</p>
    <div
      className={
        author === 'Mariia' ? styles.myMessage : styles.otherPersonMessage
      }>
      <p>{text}</p>
    </div>
    <p className={styles.time}>{time}</p>
  </div>
);

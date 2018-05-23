import React from 'react';

import { formatDateTime } from '../../utils/dateTime';

import styles from './message.scss';

export default ({ from, content, createdAt }) => (
  <section
    className={
      from === 'Mariia'
        ? styles.myMessageContainer
        : styles.otherPersonMessageContainer
    }>
    <p className={styles.author}>{from}</p>
    <main
      className={
        from === 'Mariia' ? styles.myMessage : styles.otherPersonMessage
      }>
      {content}
    </main>
    <p className={styles.time}>{formatDateTime(createdAt)}</p>
  </section>
);

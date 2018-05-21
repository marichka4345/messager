import React from 'react';

import styles from './message.scss';

export default ({ author, text, time }) => (
  <div className={styles.message}>
    <p>{author}</p>
    <p>{text}</p>
    <p>{time}</p>
  </div>
);

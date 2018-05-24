import React from 'react';

import styles from './saveCancelPanel.scss';

export default ({save, cancel}) => (<div className={styles.panel}>
  <div className={ styles.saveButton } onClick={save}>
    <span>&#10003;</span>
  </div>
  <div className={styles.cancelButton } onClick={cancel}>
    <span>&times;</span>
  </div>
</div>);
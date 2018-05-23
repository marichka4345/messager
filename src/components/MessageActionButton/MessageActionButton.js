import React, { Fragment } from 'react';

import styles from './messageActionButton.scss';

export default({ isEditIconVisible }) => (
    <Fragment>
      { isEditIconVisible ? <div className={styles.edit}>&#9998;</div> : null }
    </Fragment>
);
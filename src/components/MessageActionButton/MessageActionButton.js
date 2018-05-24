import React, { Fragment } from 'react';

import SaveCancelPanel from '../SaveCancelPanel/SaveCancelPanel';

import styles from './messageActionButton.scss';

export default({ isEditMode, turnOnEditMode, save, cancel }) => (
  <Fragment>
    {
      isEditMode
        ? <SaveCancelPanel save={save} cancel={cancel}/>
        : <div className={styles.actionButton}>
            <span onClick={turnOnEditMode}>&#9998;</span>
        </div>
    }
  </Fragment>
);
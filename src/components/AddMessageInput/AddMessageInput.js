import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from './addMessageInput.scss';

export default class AddMessageInput extends Component {
  state = {
    messageText: ''
  };

  changeMessage = ({ target }) => {
    this.changeTextAreaHeight();

    const { value } = target;
    this.setState({
      messageText: value
    });
  };

  changeTextAreaHeight() {
    const textarea = document.getElementById('textarea');
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  render() {
    const { messageText } = this.state;

    return (
      <div className={styles.addMessage}>
        <div className={styles.message}>
          <Scrollbars autoHeight universal={true}>
            <ContentEditable
              id="textarea"
              className={styles.textArea}
              html={messageText}
              onChange={this.changeMessage}
              suppressContentEditableWarning={true}
            />
          </Scrollbars>
        </div>

        <button className={styles.sendButton}>Send</button>
      </div>
    );
  }
}

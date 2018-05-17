import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import styles from './addMessageInput.scss';

export default class AddMessageInput extends Component {
  state = {
    messageText: ''
  };

  changeMessage({ target }) {
    const { value } = target;
    this.setState({
      messageText: value
    });
  }

  render() {
    const { messageText } = this.state;

    return (<div className={styles.addMessage}>
      <ContentEditable 
        className={styles.textArea}
        html={messageText}
        onChange={this.changeMessage}
        suppressContentEditableWarning={true}/>
      <button>Send</button>
    </div>);
  }
}
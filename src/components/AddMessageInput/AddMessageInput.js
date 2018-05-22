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

  sendMessage = () => {
    const { sendMessage } = this.props;
    const message = {
      time: new Date().toLocaleDateString(),
      author: 'Mariia',
      text: this.removeRedundantSymbols(this.state.messageText)
    };
    sendMessage(message);

    this.setState({ messageText: '' });
    const textarea = document.getElementById('textarea');
    textarea.style.height = 50 + 'px';
  };

  removeRedundantSymbols(text) {
    return text.replace(/<div>/g, '').replace(/<\/div>/g, '\n');
  }

  render() {
    const { messageText } = this.state;
    const { sendMessage } = this.props;

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

        <button className={styles.sendButton} onClick={this.sendMessage}>
          Send
        </button>
      </div>
    );
  }
}

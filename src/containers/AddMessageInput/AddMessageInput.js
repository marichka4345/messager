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

  sendMessage = async () => {
    const content = this.removeRedundantSymbols(this.state.messageText);
    if (!content.trim()) {
      return;
    }
    const { sendMessage, name } = this.props;
    const message = {
      content,
      from: name
    };
    await sendMessage({ variables: message });

    this.setState({ messageText: '' });
    const textarea = document.getElementById('textarea');
    textarea.style.height = '50px';
  };

  changeTextAreaHeight() {
    const textarea = document.getElementById('textarea');
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  removeRedundantSymbols(text) {
    return text
      .replace(/&nbsp;/g, '')
      .replace(/<div>/g, ' ')
      .replace(/<\/div>/g, '\n');
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

        <button className={styles.sendButton} onClick={this.sendMessage}>
          Send
        </button>
      </div>
    );
  }
}

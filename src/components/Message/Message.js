import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import MessageActionButton from '../../components/MessageActionButton/MessageActionButton';

import { formatDateTime } from '../../utils/dateTime';

import styles from './message.scss';

export default class Message extends Component {
  state = {
    isActionButtonVisible: false,
    isEditMode: false,
    isMessageEmpty: false,
    message: ''
  };

  componentDidMount() {
    this.setState({
      message: this.props.content
    });
  }

  toggleActionIconVisibility = () => {
    const { name, from } = this.props;
    if (from === name && !this.state.isEditMode) {
      this.setState(prevState => ({
        isActionButtonVisible: !prevState.isActionButtonVisible
      }));
    }
  };

  turnOnEditMode = () => {
    this.setState({
      isEditMode: true
    });
  };

  changeMessage = ({ target }) => {
    this.setState({
      message: target.value
    });
  };

  saveMessage = () => {
    const { message: content } = this.state;

    if (!content) {
      this.setState({
        isMessageEmpty: true
      });
      return;
    }

    const { updateChat, id } = this.props;
    const message = {
      id,
      content
    };
    updateChat(message).then(message => {
      this.setState({
        message,
        isEditMode: false
      });
    });
  };

  cancelChanges = () => {
    const { content: message } = this.props;
    this.setState({
      message,
      isEditMode: false,
      isActionButtonVisible: false
    });
  };

  render() {
    const { from, createdAt, name } = this.props;
    const {
      isActionButtonVisible,
      isEditMode,
      isMessageEmpty,
      message
    } = this.state;

    return (
      <section
        className={
          from === name
            ? styles.myMessageContainer
            : styles.otherPersonMessageContainer
        }>
        <p className={styles.author}>{from}</p>
        <div
          className={`${
            from === name ? styles.myMessage : styles.otherPersonMessage
          }
          ${isMessageEmpty ? styles.hasError : ''}
          ${isEditMode ? styles.editableMessage : ''}`}
          onMouseEnter={this.toggleActionIconVisibility}
          onMouseLeave={this.toggleActionIconVisibility}
          onAnimationEnd={() => this.setState({ isMessageEmpty: false })}>
          <ContentEditable
            html={message}
            disabled={!isEditMode}
            onChange={this.changeMessage}
            suppressContentEditableWarning={true}
            spellCheck="false"
          />
          {isActionButtonVisible || isEditMode ? (
            <MessageActionButton
              isEditMode={isEditMode}
              turnOnEditMode={this.turnOnEditMode}
              save={this.saveMessage}
              cancel={this.cancelChanges}
            />
          ) : null}
        </div>
        <p className={styles.time}>{formatDateTime(createdAt)}</p>
      </section>
    );
  }
}

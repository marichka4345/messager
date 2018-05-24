import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import MessageActionButton from '../../components/MessageActionButton/MessageActionButton';

import { formatDateTime } from '../../utils/dateTime';

import styles from './message.scss';

export default class Message extends Component {
  state = {
    isActionButtonVisible: false,
    isEditMode: false,
    message: ''
  };

  componentDidMount() {
    this.setState({
      message: this.props.content
    });
  }

  toggleActionIconVisibility = () => {
    if (this.props.from === 'Mariia') {
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

  changeMessage = ({target}) => {
    this.setState({
      message: target.value
    });
  };

  saveMessage = () => {
    const { updateChat, id } = this.props;
    const {message: content} = this.state;

    const message = {
      id,
      content
    };
    updateChat(message).then(message =>  {
      this.setState({
        message,
        isEditMode: false
      })
    });
  };

  cancelChanges = () => {
    const { content: message } = this.props;
    this.setState({
      message,
      isEditMode: false
    });
  };

  render() {
    const { from, createdAt } = this.props;
    const { isActionButtonVisible, isEditMode, message } = this.state;

    return (
      <section
          className={
            from === 'Mariia'
                ? styles.myMessageContainer
                : styles.otherPersonMessageContainer
          }
      >
        <p className={styles.author}>{from}</p>
        <div className={ from === 'Mariia' ? styles.myMessage : styles.otherPersonMessage }
             onMouseEnter={this.toggleActionIconVisibility}
             onMouseLeave={this.toggleActionIconVisibility}
        >
          <ContentEditable
              className={isEditMode ? styles.editableMessage : ''}
              html={message}
              disabled={!isEditMode}
              onChange={this.changeMessage}
              suppressContentEditableWarning={true}
              spellCheck="false"
          />
          {
            isActionButtonVisible || isEditMode
                ? <MessageActionButton
                    isEditMode={isEditMode}
                    turnOnEditMode={this.turnOnEditMode}
                    save={this.saveMessage}
                    cancel={this.cancelChanges}
                />
                : null
          }
        </div>
        <p className={styles.time}>{formatDateTime(createdAt)}</p>
      </section>
    );
  }
}

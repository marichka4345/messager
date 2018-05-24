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
    //update query: update real message entity with value from state
    console.log('save');
  };

  cancelChanges = () => {
    //state = value from props.content
    console.log('cancel');
  };

  render() {
    const { from, content, createdAt } = this.props;
    const { isActionButtonVisible, isEditMode } = this.state;

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
              html={content}
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

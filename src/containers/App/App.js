import React from 'react';

import MessageList from '../MessageList/MessageList';
import AddMessageInput from '../../components/AddMessageInput/AddMessageInput';

import './app.global.scss';

export default () => (
  <div>
    <MessageList />
    <AddMessageInput />
  </div>
);

import React, { useState } from 'react';
import { Container } from './styled';

const { ipcRenderer } = window.require('electron');

export default function Main() {
  const [topicText, setTopicText] = useState('');

  const handleExit = () => {
    ipcRenderer.send('closeAddTopic', '');
  };

  const handleSubmit = () => {
    if (topicText === '') return;
    ipcRenderer.send('addTopic', { text: topicText });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label htmlFor="topictext">
          Insert New Topic
          <input
            autoFocus
            type="text"
            id="topictext"
            onChange={(e) => setTopicText(e.currentTarget.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleExit}>
          Cancel
        </button>
      </form>
    </Container>
  );
}

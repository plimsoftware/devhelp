import React, { useState, useEffect } from 'react';
import EllipsisText from 'react-ellipsis-text';

import { Container } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');
const myCategoy = remote.getGlobal('electroncategory').category;

export default function Main() {
  const [topics, setTopics] = useState([]);
  const [topicName, setTopicName] = useState('');
  const [topSelected, setTopSelected] = useState('');

  useEffect(() => {
    dbInstance.readTopic(myCategoy).then((allTopicslists) => {
      setTopics(allTopicslists);
    });
  }, []);

  const handleClick = (topic) => {
    setTopicName(topic.topictext);
    setTopSelected(topic);
  };

  const handleSubmit = () => {
    ipcRenderer.send('updateTopic', {
      _id: topSelected._id,
      topictext: topicName,
      oldtext: topSelected.topictext,
    });
  };

  return (
    <Container>
      {topSelected === '' ? (
        <div>
          <h2>Select topic to modify</h2>
          {topics.length !== 0 ? (
            topics.map((topic) => (
              <button
                type="button"
                key={topic._id}
                onClick={() => handleClick(topic)}
              >
                <EllipsisText text={topic.topictext} length={60} />
              </button>
            ))
          ) : (
            <div>Without topics to modify</div>
          )}
        </div>
      ) : (
        <div>
          <h2>Insert new name</h2>
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.currentTarget.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </Container>
  );
}

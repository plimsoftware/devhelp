import React, { useState, useEffect } from 'react';
import { Container } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');
const myCategoy = remote.getGlobal('electroncategory').category;

export default function Main() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    dbInstance.readTopic(myCategoy).then((allTopicslists) => {
      setTopics(allTopicslists);
    });
  }, []);

  const handleClick = (_id) => {
    ipcRenderer.send('deleteTopic', _id);
  };

  return (
    <Container>
      <form>
        <h2>Select topic to delete</h2>
        {topics.length !== 0 ? (
          topics.map((topic) => (
            <button
              type="button"
              key={topic._id}
              onClick={() => handleClick(topic._id)}
            >
              {topic.topictext}
            </button>
          ))
        ) : (
          <div />
        )}
      </form>
    </Container>
  );
}

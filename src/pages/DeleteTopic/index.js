import React, { useState, useEffect } from 'react';
import EllipsisText from 'react-ellipsis-text';

import { Container, Button, ButtonConfirm } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');
const myCategoy = remote.getGlobal('electroncategory').category;

export default function Main() {
  const [topics, setTopics] = useState([]);
  const [askDelete, setAskDelete] = useState(false);

  useEffect(() => {
    dbInstance.readTopic(myCategoy).then((allTopicslists) => {
      setTopics(allTopicslists);
    });
  }, []);

  const askDeleteTop = () => {
    setAskDelete(true);
  };

  const handleClick = (_id) => {
    ipcRenderer.send('deleteTopic', _id);
  };

  return (
    <Container>
      <form>
        <h2>Select topic to delete</h2>
        {topics.length !== 0 ? (
          topics.map((topic) =>
            askDelete === false ? (
              <Button type="button" key={topic._id} onClick={askDeleteTop}>
                <EllipsisText text={topic.topictext} length={60} />
              </Button>
            ) : (
              <ButtonConfirm
                type="button"
                key={topic._id}
                onClick={() => handleClick(topic._id)}
              >
                <EllipsisText text={topic.topictext} length={60} />
              </ButtonConfirm>
            )
          )
        ) : (
          <div>Without topics to delete</div>
        )}
      </form>
    </Container>
  );
}

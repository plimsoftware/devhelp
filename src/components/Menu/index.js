import React, { useEffect, useState } from 'react';
import EllipsisText from 'react-ellipsis-text';

import { Container, Button } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function Menu({ setPage, setCategory }) {
  const [myCategory, setMyCategory] = useState([]);

  useEffect(() => {
    dbInstance.readBT().then((allCategorylists) => {
      setMyCategory(allCategorylists);
    });
  }, []);

  const handleClick = (category) => {
    setCategory(category);
    setPage('ListTopics');
    ipcRenderer.send('activateTopicMenu', category);
  };

  return (
    <Container>
      {myCategory.length !== 0 ? (
        myCategory.map((topic) => (
          <Button
            type="button"
            key={topic._id}
            onClick={() => handleClick(topic.topictext)}
          >
            <EllipsisText text={topic.topictext} length={25} />
          </Button>
        ))
      ) : (
        <div />
      )}
    </Container>
  );
}

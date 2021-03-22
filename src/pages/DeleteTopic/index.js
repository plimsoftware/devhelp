import React, { useState, useEffect } from 'react';

import DetailTopicDelete from '../../components/DetailTopicDelete';
import { Container } from './styled';

const { remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');
const myCategoy = remote.getGlobal('electroncategory').category;

export default function Main() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    dbInstance.readTopic(myCategoy).then((allTopicslists) => {
      setTopics(allTopicslists);
    });
  }, []);

  return (
    <Container>
      <form>
        <h2>Select topic to delete</h2>
        {topics.length !== 0 ? (
          topics.map((topic) => <DetailTopicDelete topic={topic} />)
        ) : (
          <div>Without topics to delete</div>
        )}
      </form>
    </Container>
  );
}

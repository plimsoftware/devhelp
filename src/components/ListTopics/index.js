import React, { useEffect, useState } from 'react';
import Proptype from 'prop-types';

import { MainContainer } from './styled';

const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function ListTopics({
  category,
  setPage,
  setTitle,
  setID,
  setTopicGroup,
}) {
  const [topicList, setTopicList] = useState([]);
  const [runOnce, setRunOnce] = useState(false);

  useEffect(() => {
    ipcRenderer.on('reload', () => setRunOnce(false));
    if (runOnce === false)
      dbInstance.readTopic(category).then((allTopics) => {
        setTopicList(allTopics);
        setRunOnce(true);
      });
  }, [category, runOnce]);

  const handleClick = (topic) => {
    setPage('DetailTopic');
    setTitle(topic.topictext);
    setID(topic._id);
    setTopicGroup(topic.topicgroup);
  };

  return (
    <MainContainer>
      <h1>{category} </h1>
      <div>
        {topicList.length !== 0 ? (
          topicList.map((topic) => (
            <button
              type="button"
              key={topic._id}
              onClick={() => handleClick(topic)}
            >
              {topic.topictext}
            </button>
          ))
        ) : (
          <div> Without Topics available</div>
        )}
      </div>
    </MainContainer>
  );
}

ListTopics.propTypes = {
  category: Proptype.string.isRequired,
  setPage: Proptype.func.isRequired,
  setTitle: Proptype.func.isRequired,
  setID: Proptype.func.isRequired,
  setTopicGroup: Proptype.func.isRequired,
};

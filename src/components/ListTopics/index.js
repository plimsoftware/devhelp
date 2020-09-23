import React, { useEffect, useState} from 'react';

import { MainContainer } from './styled';

const { remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function ListTopics({ category, setPage, setTitle, setID, setTopicGroup }) {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {

    dbInstance.readTopic(category)
      .then(allTopics => {
        setTopicList(allTopics);
      })

  }, [category]);

  const handleClick = (topic) => {
    setPage('DetailTopic');
    setTitle(topic.topictext);
    setID(topic._id);
    setTopicGroup(topic.topicgroup);
  };

    return (
      <MainContainer>
        <h1>Current Category: {category} </h1>
        <div>
        {topicList.length !== 0 ? (
              topicList.map((topic) => (
                <button type="button" key={topic._id} onClick={() => handleClick(topic)}>{topic.topictext}</button>
              )) ) :
            (
              <div> Without Topics available</div>
            )
          }
        </div>
      </MainContainer>
    );
}

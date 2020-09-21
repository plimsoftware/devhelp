import React, { useEffect, useState} from 'react';

import { MainContainer } from './styled';

const { remote, ipcRenderer } = window.require('electron');
const dbInstance = remote.getGlobal('db');

export default function ListTopics({ category }) {
  const [topicList, setTopicList] = useState([]);
  const [runOnce, setRunOnce] = useState(true);
  const [myCategory, setMyCategory] = useState(category);

  useEffect(() => {

    dbInstance.readTopic(myCategory)
      .then(allTopics => {
        setTopicList(allTopics);
      })

      if (runOnce) {
        setRunOnce(false);
        ipcRenderer.on('addButtonTopic', (event, arg) => {
   
        if (category !== '') {
          dbInstance.create({
            topictype: 'topic',
            topictext: arg,
            topicgroup: myCategory
          })
        } 
        
        window.location.reload(false);
      }); 
    }

  }, [myCategory, category, runOnce]);

  const handleClick = () => {};

    return (
      <MainContainer>
        <h1>Current Category: {category} </h1>
        <div>
        {topicList.length !== 0 ? (
              topicList.map((topic) => (
                <button type="button" key={topic._id} onClick={() => handleClick(topic.topictext)}>{topic.topictext}</button>
              )) ) :
            (
              <div> Without Topics available</div>
            )
          }
        </div>
      </MainContainer>
    );
}

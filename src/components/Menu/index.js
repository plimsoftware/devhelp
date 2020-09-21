import React, { useEffect, useState } from 'react';

import { Container } from './styled';


const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');


export default function Menu({ setPage, setCategory }) {
  const [myCategory, setMyCategory] = useState([]);
  
  useEffect(() => {

    dbInstance.readBT()
      .then(allCategorylists => {
        setMyCategory(allCategorylists);
      })

  }, []);


  const handleClick = ((category) => {
    setCategory(category);
    setPage('ListTopics');
    ipcRenderer.send('activateTopicMenu', category);
  })

   return (
        <Container>
          <div id="mytopics">
            {myCategory.length !== 0 ? (
              myCategory.map((topic) => (
                <button type="button" key={topic._id} onClick={() => handleClick(topic.topictext)}>{topic.topictext}</button>
              )) ) :
            (
              <div></div>
            )
          }
          </div>
        </Container>
    );
}

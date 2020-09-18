import React, { useEffect, useState } from 'react';

import { Container } from './styled';


const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');


export default function Menu({ setPage, setCategory }) {
  const [myTopics, setMyTopics] = useState([]);
  
  useEffect(() => {

    dbInstance.readBT()
      .then(allTopiclists => {
        setMyTopics(allTopiclists);
      })

      ipcRenderer.on('addButtonTopic', (event, arg) => {
   
        dbInstance.create({
          topictype: 'bt',
          topictext: arg,
          topicgroup:''
        })
        
        window.location.reload(false);
      });  

  }, []);


  const handleClick = ((category) => {
    setCategory(category);
    setPage('ListTopics');
  })

   return (
        <Container>
          <div id="mytopics">
            {myTopics.length !== 0 ? (
              myTopics.map((topic) => (
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

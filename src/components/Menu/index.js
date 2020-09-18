import React, { useEffect, useState } from 'react';

import { Container } from './styled';


const { ipcRenderer, remote } = window.require('electron');
const dbInstance = remote.getGlobal('db');


export default function Menu({ setPage }) {
  const [myTopics, setMyTopics] = useState([]);
  
  useEffect(() => {

    dbInstance.readAll()
      .then(allTopiclists => {
        console.log(allTopiclists);
          setMyTopics(allTopiclists);
      })

      ipcRenderer.on('addButtonTopic', (event, arg) => {
        const myButton = document.createElement('button');
        myButton.textContent = arg;
        document.getElementById('mytopics').append(myButton);
    
        dbInstance.create({topic: arg})
      });  

  }, []);


  

   return (
        <Container>
          <div id="mytopics">
            {myTopics.length !== 0 ? (
              myTopics.map((topic) => (
                <button type="button" key={topic._id}>{topic.topic}</button>
              )) ) :
            (
              <div></div>
            )
          }
          </div>
        </Container>
    );
}

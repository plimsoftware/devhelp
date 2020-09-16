import React, { useState, useEffect } from 'react';

import { Container } from './styled';
import ElectronLogo from '../../img/electron.png';
import NodeLogo from '../../img/nodejs.png';

export default function Menu({ setPage }) {

  useEffect(() => {
      setPage('Home');
  }, [setPage]);

  function handleInsertTopic() {
    const myButton = document.createElement('button');
    const actualHTML = document.getElementById('mytopics').innerHTML;
    document.getElementById('mytopics').append(myButton);
  }
  
   return (
        <Container>
          <div id="fixedtopics">
          <button id="inserttopic" type="button" >
              <img src={ElectronLogo} alt="Electron.js" />
            </button>
            <button id="inserttopic" type="button"  >
              <img src={NodeLogo} alt="Node.js" />
            </button>
          </div>
          <div id="mytopics">
            <button id="inserttopic" type="button" onClick={handleInsertTopic} >
              Insert New Topic
            </button>
          </div>
        </Container>
    );
}

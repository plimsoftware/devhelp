import React from 'react';

import { Container } from './styled';

const { ipcRenderer } = window.require('electron');

export default function Menu({ setPage }) {


  ipcRenderer.on('addButtonTopic', (event, arg) => {
    const myButton = document.createElement('button');
    myButton.textContent = arg;
    document.getElementById('mytopics').append(myButton);
  });  

   return (
        <Container>
          <div id="mytopics">

          </div>
        </Container>
    );
}

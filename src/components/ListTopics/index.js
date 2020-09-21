import React from 'react';

import { MainContainer } from './styled';

export default function ListTopics({ category }) {
  
    return (
      <MainContainer>
        <h1>Current Category: {category} </h1>
        <div>
        <span><button type="button">Insert Comment</button></span>
        </div>
      </MainContainer>
    );
}

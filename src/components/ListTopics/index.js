import React from 'react';

import { MainContainer } from './styled';

export default function ListTopics({ category }) {
  
    return (
      <MainContainer>
        <h1>Current Category: {category} </h1>
      </MainContainer>
    );
}

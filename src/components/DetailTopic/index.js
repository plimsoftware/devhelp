import React from 'react';

import { MainContainer } from './styled';

export default function DetailTopic({ category }) {
  
    return (
      <MainContainer>
        <h1>Current Category: {category} </h1>
        <div>
        <span><button type="button">Insert Topic</button></span>
        </div>
      </MainContainer>
    );
}

import React from 'react';

import { MainContainer } from './styled';

export default function DetailTopic({ title }) {
  
    return (
      <MainContainer>
        <h1>{title}</h1>
        <div>
        <span><button type="button">Insert Comment</button></span>
        <span><button type="button">Insert Code</button></span>
        </div>
      </MainContainer>
    );
}

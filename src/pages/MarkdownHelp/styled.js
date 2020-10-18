import styled from 'styled-components';

export const Container = styled.section`
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: white;
  width: 100%;
  height: 150px;
  margin-bottom: 150px;

  div {
    width: 98%;
    border: 1px solid white;
    padding: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: #330000;
  }

  h1 {
    font-size: 20px;
  }
`;

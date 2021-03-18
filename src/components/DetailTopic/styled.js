import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 100px;
  color: black;

  h1 {
    font-size: 20px;
    text-decoration: underline;
  }

  h2 {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 18px;
  }

  section {
    margin-top: 10px;

    img {
      max-width: 700px;
    }
  }

  pre {
    width: 98%;
  }

  p {
    font-size: 15px;
    width: 98%;
    margin-top: 5px;
    padding-top: 10px;
    margin-bottom: 10px;
    white-space: pre-wrap;
  }

  div {
    margin-top: 10px;
  }

  textarea {
    overflow: hidden;
    padding: 10px;
    width: 99%;
    height: 150px;
    font-size: 14px;
    display: block;
    margin-bottom: 15px;
  }

  button {
    margin-top: 5px;
    width: 98%;
    border-radius: 10px;
    background-color: #3e2776;
    color: white;
  }

  .midButton {
    width: 24.5% !important;
  }
`;

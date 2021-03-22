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

  .midButton {
    width: 24.5% !important;
  }
`;

export const Button = styled.button`
  margin-top: 5px;
  width: 98%;
  border-radius: 10px;
  background-color: #3e2776;
  color: white;
`;

export const Comment = styled.textarea`
  border: 1.5px solid grey;
  overflow-y: scroll;
  resize: none;
  padding: 10px;
  width: 99%;
  height: 300px;
  font-size: 14px;
  display: block;
  margin-bottom: 15px;
  border-bottom-left-radius: 5px;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
`;

export const OptionButton = styled.button`
  background-color: #a9b3b8;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

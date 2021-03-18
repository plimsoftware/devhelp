import styled from 'styled-components';

export const Container = styled.section`
  background-color: #3f63b5;
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;

  form {
    width: 100%;
    display: table;
    text-align: center;
  }

  input {
    display: table-cell;
    margin-top: 10px;
    width: 90%;
  }

  button {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    border-radius: 10px;
    background-color: #3e2776;
    color: white;
  }

  h2 {
    font-size: 18px;
    text-align: center;
  }
`;

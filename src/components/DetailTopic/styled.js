import styled from 'styled-components';

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-components: center;
margin-top: 20px;
margin-left: 20px;
color: white;

section {
  margin-top: 10px;
}

p {
  font-size: 15px;
  width: 98%;
  margin-bottom: 10px;
  white-space: pre-wrap;
}

div {
    margin-top: 10px;
}

textarea{  
  overflow:hidden;
  padding:10px;
  width:98%;
  height: 150px;
  font-size:14px;
  display:block;
  margin-bottom: 15px;
}

button {
    margin-top: 5px;
    width: 98%;
    border-radius: 10px;
    background-color: #3E2776;
    color: white;
  }

`;

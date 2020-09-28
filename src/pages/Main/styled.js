import styled from 'styled-components';

export const Container = styled.section`
  
    .split {
      position: fixed;
      overflow-x: hidden;
      margin-top: 54px;
      height: 100%;
    }

    .left {
      left: 0;
      height: 90%;
      width: 180px;
      background-color: black;
    }

    .right {
      left: 183px;
      right: 0;
      background-color: #330000;
    }

    .centered {
      position: absolute;
      text-align: center;
    }
`;

import styled from 'styled-components';

export const Container = styled.section`
  
    .split {
      position: fixed;
      overflow-x: hidden;
      margin-top: 54px;
      height: 100%;
    }

    .left {
      display: flex;
      flex-direction: column;
      height: 90%;
      width: 200px;
      background-color: #3f63b5;
      align-items: center;
    }

    .right {
      left: 203px;
      right: 0;
      background-color: #d0f5f7;
    }

    .centered {
      position: absolute;
      text-align: center;
    }
`;

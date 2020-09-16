import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    overflow-y: scroll;

    height: 120px;

    table {
      width: 100%;
    }

    table tr:nth-child(odd) td{
      background-color: #9494b8;
    }
    table tr:nth-child(even) td{
      background-color: #b3b3cc;
    }

    td {
      padding: 5px;
    }

    tr {
      cursor: pointer;
    }

    .titletask {
      font-size: 25px;
      text-transform: capitalize;
    }
`;

export const ContainerDetail = styled.div`
    margin-left: 20px;
    overflow-y: scroll;

    height: 385px;

    table {
      width: 100%;
    }

    table tr:nth-child(odd) td{
      background-color: #9494b8;
    }
    table tr:nth-child(even) td{
      background-color: #b3b3cc;
    }

    td {
      padding: 5px;
    }

    tr {
      cursor: pointer;
    }

    .titletask {
      font-size: 25px;
      text-transform: capitalize;
      margin-right: 15px;
    }

    .spanstatus {
      margin-left: 5px;
      margin-right: 10px;
      color: blue;
      font-style: italic;
      font-size: 20px;
    }

    form {
      margin-top: 20px;
      display: flex;
      flex-direction: column;

      label {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        margin-bottom: 10px;
      }

      input {
        height: 20px;
        font-size: 12px;
        width: 95%;
        border: 1px solid #ddd;
        padding: 0 10px;
        border-radius: 5px;
        background-color: #bfbfbf;
      }
    }
`;

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-components: center;

  fieldset {
    width: 95%;
    margin: 10px;
    border-radius: 5px;

    legend {
      padding: 5px;
      margin-left: 10px;
    }
  }

  div {
    margin-left: 15px;
  }

  section {
    margin-left: 5px;
    display: flex;
    flex-direction: row;
    font-weight: bold;
    button {
      margin-top: 5px;
      margin-left: 5px;
      width: 150px !important;
    }
  }

  button {
    width: 120px;
    height: 30px;
    font-size: 12px;
    margin-right: 5px;
    border-radius: 5px;
    background-color: #809fff;
    margin-bottom: 5px;
  }

  .tdid {
    width: 5%;
  }

  .tdtitle {
    width: 35%;
  }

  .tdclient {
    width: 15%;
  }

  .tdcompany {
    width: 15%;
  }

  .tdteam {
    width: 15%;
  }

  .tdstatus {
    width: 5%;
  }

  .thid {
    width: 5%;
  }

  .thtitle {
    width: 40%;
  }

  .thclient {
    width: 15%;
  }

  .thcompany {
    width: 15%;
  }

  .thteam {
    width: 17%;
  }

  .thstatus {
    width: 5%;
  }
`;

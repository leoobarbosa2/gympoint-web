import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 40px;
  background: #fff;
  padding: 20px 40px;
  border-radius: 4px;
`;

export const Content = styled.div`
  table {
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    text-align: left;

    thead {
      tr {
        font-size: 18px;
      }
    }

    tbody tr {
      border-bottom: 1px solid #000;
    }

    tbody tr {
      height: 60px;
    }

    tbody tr td {
      button {
        border: none;
        background: none;
        color: #ee4d64;
        font-weight: bold;
      }
    }

    tbody tr a {
      color: #4d85ee;
    }
  }

  form {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 4px 0 0 1px;
      font-weight: bold;
    }

    label {
      font-size: 18px;
      font-weight: bold;
      margin: 15px 0;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 10px;
      border-radius: 4px;
      padding: 10px 15px;
      margin-right: 10px;
    }

    div {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

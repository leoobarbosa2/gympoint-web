import styled from 'styled-components';

export const Table = styled.table`
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
`;

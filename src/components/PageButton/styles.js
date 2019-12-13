import styled from 'styled-components';

export const Button = styled.button.attrs()`
  font-weight: bold;
  border-radius: 4px;
  padding: 5px 15px;
  color: #ee4d64;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 25%;
    cursor: not-allowed;
  }
`;

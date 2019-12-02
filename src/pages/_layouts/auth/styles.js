import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #ee4d64;
`;

export const Content = styled.div`
  max-width: 350px;
  width: 100%;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 20px 30px;

  img {
    width: 60%;
    margin: 20px;
  }

  form {
    background: #fff;
    display: flex;
    flex-direction: column;

    span {
      color: #ee4d64;
      background: #ece999;
      font-weight: bold;
      margin-top: 10px;
    }

    label {
      font-size: 14px;
      font-weight: bold;
      margin: 12px 0;
      text-align: left;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.15);
      background: #fff;
      padding: 10px;
      border-radius: 4px;
    }

    button {
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background: #ee4d64;
      border: none;
      border-radius: 4px;
      padding: 12px;
      margin: 20px 0;

      &:hover {
        background: ${lighten(0.03, '#ee4d64')};
      }
    }
  }
`;

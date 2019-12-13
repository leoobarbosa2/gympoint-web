import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  padding: 0 30px;
  background: #fff;
`;

export const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    ul {
      display: flex;
      border-left: 1px solid rgba(0, 0, 0, 0.2);

      li:first-child {
        margin-left: 20px;
      }

      .nav-link {
        color: ${lighten(0.08, '#ee4d64')};
      }

      li {
        margin: 0 10px;

        a {
          color: #999999;
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    span {
      font-weight: bold;
      margin-bottom: 2px;
    }

    button {
      color: #ee4d64;
      background: none;
      border: none;
    }
  }
`;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Nav } from './styles';

import logo from '../../assets/images/logoheader.png';

import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Nav>
        <div>
          <img src={logo} alt="Gympoint" />
          <ul>
            <li>
              <NavLink activeClassName="nav-link" to="/students">
                ALUNOS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link" to="/plans">
                PLANOS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link" to="/registration">
                MATRÍCULAS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="nav-link" to="/helporders">
                PEDIDOS DE AUXÍLIO
              </NavLink>
            </li>
          </ul>
        </div>
        <aside>
          <span>{profile.name}</span>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Nav>
    </Container>
  );
}

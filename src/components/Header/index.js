import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
              <Link to="/students">ALUNOS</Link>
            </li>
            <li>
              <Link to="/plans">PLANOS</Link>
            </li>
            <li>
              <Link to="/registration">MATRÍCULAS</Link>
            </li>
            <li>
              <Link to="/helporders">PEDIDOS DE AUXÍLIO</Link>
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

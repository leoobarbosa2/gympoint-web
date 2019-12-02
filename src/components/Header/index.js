import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Nav } from './styles';

import logo from '../../assets/images/logoheader.png';

export default function Header() {
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
          <span>Administrador</span>
          <button type="button">sair do sistema</button>
        </aside>
      </Nav>
    </Container>
  );
}

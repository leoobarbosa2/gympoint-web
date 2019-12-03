import React from 'react';
import { Link } from 'react-router-dom';

import ActionHeader from '../../components/ActionHeader';
import ActionContainer from '../../components/ActionContainer';

export default function AddStudents() {
  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de alunos</span>
          <aside>
            <Link back to="/students">
              VOLTAR
            </Link>
            <Link to="/register">SALVAR</Link>
          </aside>
        </div>
      </ActionHeader>
      <ActionContainer>
        <form>
          <label htmlFor="name">NOME COMPLETO</label>
          <input type="text" placeholder="Nome completo" />
          <label htmlFor="name">ENDEREÇO DE E-MAIL</label>
          <input type="text" placeholder="exemplo@email.com" />
          <div>
            <div>
              <label htmlFor="name">IDADE</label>
              <input type="text" placeholder="Informe a idade" />
            </div>
            <div>
              <label htmlFor="name">PESO (em kg)</label>
              <input type="text" placeholder="Peso(em kg)" />
            </div>
            <div>
              <label htmlFor="name">ALTURA</label>
              <input type="text" placeholder="Informe a altura" />
            </div>
          </div>
        </form>
      </ActionContainer>
    </>
  );
}

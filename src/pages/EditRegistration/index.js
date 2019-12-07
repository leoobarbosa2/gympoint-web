import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
// import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

export default function EditRegistration() {
  // const { id } = useParams();

  return (
    <>
      <ActionHeader>
        <div>
          <span>Edição de matrícula</span>
          <aside>
            <Link to="/registration">VOLTAR</Link>
            <button type="submit" form="registration-form">
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <Form id="registration-form">
          <label htmlFor="name">ALUNO</label>
          <Input name="name" />
          <div>
            <div>
              <label>PLANO</label>
              <Input name="plan" type="text" />
            </div>
            <div>
              <label>DATA DE INÍCIO</label>
              <Input name="start_date" type="date" />
            </div>
            <div>
              <label>DATA DE TÉRMINO</label>
              <input name="end_date" type="date" readOnly />
            </div>
            <div>
              <label>VALOR FINAL</label>
              <input type="number" readOnly />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}

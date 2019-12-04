import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContainer from '../../components/ActionContainer';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number('Insira um número válido')
    .required('Idade obrigatória')
    .positive('Números negativos não são aceitos')
    .typeError('A idade é obrigatória'),
  weight: Yup.number('Insira um número válido')
    .required('O peso obrigatório')
    .positive('Números negativos não são aceitos')
    .typeError('A idade é obrigatória'),
  height: Yup.number('Insira um número válido')
    .required('O peso obrigatória')
    .positive('Números negativos não são aceitos')
    .typeError('A altura é obrigatória'),
});

export default function AddStudents() {
  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Aluno cadastrado com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de Alunos</span>
          <aside>
            <Link to="/students">VOLTAR</Link>
            <button type="submit" form="students-form">
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContainer>
        <Form schema={schema} onSubmit={handleSubmit} id="students-form">
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" type="text" placeholder="Nome completo" />
          <label htmlFor="name">ENDEREÇO DE E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <div>
            <div>
              <label htmlFor="name">IDADE</label>
              <Input name="age" type="number" placeholder="Informe a idade" />
            </div>
            <div>
              <label htmlFor="name">PESO (em kg)</label>
              <Input
                name="weight"
                type="number"
                step="0.1"
                placeholder="Peso(em kg)"
              />
            </div>
            <div>
              <label htmlFor="name">ALTURA</label>
              <Input
                name="height"
                type="number"
                step="0.10"
                placeholder="Informe a altura"
              />
            </div>
          </div>
        </Form>
      </ActionContainer>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import ActionContainer from '../../components/ActionContainer';
import ActionHeader from '../../components/ActionHeader';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('Insira um e-mail válido'),
  age: Yup.number('Insira um número válido')
    .positive('Números negativos não são aceitos')
    .typeError('A idade é obrigatória'),
  weight: Yup.number('Insira um número válido')
    .positive('Números negativos não são aceitos')
    .typeError('A idade é obrigatória'),
  height: Yup.number('Insira um número válido')
    .positive('Números negativos não são aceitos')
    .typeError('A altura é obrigatória'),
});

export default function EditStudent() {
  const [studentData, setStudentData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getStudentData() {
      const response = await api.get(`students/${id}`);
      const initialData = {
        name: response.data.name,
        email: response.data.email,
        age: response.data.age,
        weight: response.data.weight,
        height: response.data.height,
      };

      setStudentData(initialData);
    }
    getStudentData();
  }, [id]);

  async function handleSubmit({ name, email, age, height, weight }) {
    try {
      await api.put(`students/${id}`, {
        name,
        email,
        age,
        height,
        weight,
      });

      toast.success('Dados alterados com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }
  return (
    <>
      <ActionHeader>
        <div>
          <span>Edição de Alunos</span>
          <aside>
            <Link to="/students">VOLTAR</Link>
            <button type="submit" form="students-form">
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContainer>
        <Form
          onSubmit={handleSubmit}
          initialData={studentData}
          schema={schema}
          id="students-form"
        >
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

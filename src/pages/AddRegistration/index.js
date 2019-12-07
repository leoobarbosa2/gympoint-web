import React, { useEffect, useState } from 'react';
import Datepicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

export default function AddRegistration() {
  const [planOptions, setPlanOptions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    async function getPlans() {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        id: plan.id,
        title: plan.title,
      }));

      setPlanOptions(data);
    }
    getPlans();
  }, []);

  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de matrícula</span>
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
          <label>ALUNO</label>
          <Input name="name" />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <Select name="plan_id" options={planOptions} />
            </div>
            <div className="organize">
              <label>DATA DE INÍCIO</label>
              <Datepicker
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
            <div className="organize">
              <label>DATA DE TÉRMINO</label>
              <Datepicker readOnly />
            </div>
            <div className="organize">
              <label>VALOR FINAL</label>
              <input type="number" readOnly />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}

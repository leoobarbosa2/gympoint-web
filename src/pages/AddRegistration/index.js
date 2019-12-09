import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import Datepicker from 'react-datepicker';
import { Form, Select } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import DateInput from './DateInput';
import SelectInput from './SelectInput';
import ActionContent from '../../components/ActionContent';

export default function AddRegistration() {
  const [planOptions, setPlanOptions] = useState([]);
  const [dateOption, setDateOption] = useState(new Date());

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

  async function handleSubmit(data) {
    console.log(data);
  }

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
        <Form onSubmit={handleSubmit} id="registration-form">
          <label>ALUNO</label>
          {/* Select personalizado */}
          <SelectInput name="student_id" />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <Select name="plan_id" options={planOptions} />
            </div>
            <div className="organize">
              <label>DATA DE INÍCIO</label>
              {/* Input Date personalizado */}
              <DateInput name="start_date" />
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

import React, { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import { Form } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
// import { formatPrice } from '../../../util/format';
import api from '../../../services/api';

import ActionHeader from '../../../components/ActionHeader';
import ActionContent from '../../../components/ActionContent';
import SelectInput from '../SelectInput';
import AsyncSelectInput from '../AsyncSelectInput';
import DateInput from '../DateInput';

import { DatePickerInput, TotalInput } from '../styles';

export default function EditRegistration() {
  const [initialData, setInicialData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getRegistrationData() {
      const response = await api.get(`registrations/${id}`);

      const data = {
        ...response.data,
        start_date: parseISO(response.data.start_date),
      };
      console.log(data);

      setInicialData(data);
    }
    getRegistrationData();
  }, [id]);

  async function handleSubmit(data) {
    console.log(data);
  }

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
        <Form
          initialData={initialData}
          onSubmit={handleSubmit}
          id="registration-form"
        >
          <label htmlFor="name">ALUNO</label>
          <AsyncSelectInput name="student_id" />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <SelectInput name="plan_id" />
            </div>
            <div className="organize">
              <label>DATA DE INÍCIO</label>
              <DateInput name="start_date" />
            </div>
            <div className="organize">
              <label>DATA DE TÉRMINO</label>
              <DatePickerInput dateFormat="dd/MM/yyyy" readOnly />
            </div>
            <div className="organize">
              <label>VALOR FINAL</label>
              <TotalInput readOnly />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}

import React, { useState, useMemo } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { addMonths } from 'date-fns';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../util/format';
import api from '../../../services/api';

import { DatePickerInput, TotalInput } from '../styles';

import ActionHeader from '../../../components/ActionHeader';
import ActionContent from '../../../components/ActionContent';
import AsyncSelectInput from '../AsyncSelectInput';
import SelectInput from '../SelectInput';
import DateInput from '../DateInput';

const schema = Yup.object().shape({
  student_id: Yup.string().required('A escolha de um aluno é obrigatória'),
  plan_id: Yup.string().required('Plano obrigatório'),
  start_date: Yup.date().required('A data é obrigatória'),
});

export default function AddRegistration() {
  const [studentSelected, setStudentSelected] = useState(null);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(0);

  const finalDate = useMemo(() => addMonths(dateSelected, planDuration), [
    dateSelected,
    planDuration,
  ]);

  const totalPrice = useMemo(() => formatPrice(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  function handlePlanChange(plan) {
    setPlanDuration(plan.duration);
    setPlanPrice(plan.price);
  }

  async function handleSubmit({ start_date, plan_id }) {
    try {
      await api.post(`registrations/${studentSelected}`, {
        start_date,
        plan_id,
      });
      toast.success('Matrícula efetuada com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handleStudentChange(e) {
    setStudentSelected(e);
  }

  function handleDateChange(date) {
    setDateSelected(date);
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
        <Form schema={schema} onSubmit={handleSubmit} id="registration-form">
          <label>ALUNO</label>
          <AsyncSelectInput
            handleChange={handleStudentChange}
            name="student_id"
          />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <SelectInput
                name="plan_id"
                placeholder="Selecione um plano"
                handleChange={handlePlanChange}
              />
            </div>
            <div className="organize">
              <label>DATA DE INÍCIO</label>
              <DateInput name="start_date" handleChange={handleDateChange} />
            </div>
            <div className="organize">
              <label>DATA DE TÉRMINO</label>
              <DatePickerInput
                selected={finalDate}
                dateFormat="dd/MM/yyyy"
                readOnly
              />
            </div>
            <div className="organize">
              <label>VALOR FINAL</label>
              <TotalInput value={totalPrice} readOnly />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}

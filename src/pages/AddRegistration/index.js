import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { addMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { Link } from 'react-router-dom';
// import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { DatePickerInput, TotalInput } from './styles';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

export default function AddRegistration() {
  const [studentSelected, setStudentSelected] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [initialDate, setInicialDate] = useState(new Date());
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(0);
  const [planSelected, setPlanSelected] = useState({});
  const [planOptions, setPlanOptions] = useState([]);

  const finalDate = useMemo(() => addMonths(initialDate, planDuration), [
    initialDate,
    planDuration,
  ]);

  const totalPrice = useMemo(() => planDuration * planPrice, [
    planDuration,
    planPrice,
  ]);

  useEffect(() => {
    async function getPlans() {
      const response = await api.get('plans');
      const data = response.data.map(plan => ({
        label: plan.title,
        value: plan.id,
        duration: plan.duration,
        price: plan.price,
      }));

      setPlanOptions(data);
    }
    getPlans();
  }, []);

  function handlePlanChange(plan) {
    setPlanDuration(plan.duration);
    setPlanPrice(plan.price);
    setPlanSelected(plan.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post(`registrations/${studentSelected}`, {
        start_date: initialDate,
        plan_id: Number(planSelected),
      });

      toast.success('Matrícula realizada com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function loadStudents() {
    const response = await api.get(`students?name=${studentName}`);

    return response.data;
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
        <form onSubmit={e => handleSubmit(e)} id="registration-form">
          <label>ALUNO</label>
          <AsyncSelect
            defaultOptions
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={e => setStudentSelected(e.id)}
            onInputChange={newValue => setStudentName(newValue)}
          />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <Select
                name="plan_id"
                placeholder="Selecione um plano"
                options={planOptions}
                onChange={plan => handlePlanChange(plan)}
              />
            </div>
            <div className="organize">
              <label>DATA DE INÍCIO</label>
              <DatePicker
                selected={initialDate}
                dateFormat="dd/MM/yyyy"
                onChange={d => setInicialDate(d)}
              />
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
              <TotalInput type="number" value={totalPrice} readOnly />
            </div>
          </div>
        </form>
      </ActionContent>
    </>
  );
}

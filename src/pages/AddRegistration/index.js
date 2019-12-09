import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Datepicker from 'react-datepicker';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

export default function AddRegistration() {
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planOptions, setPlanOptions] = useState([]);
  const [dateOption, setDateOption] = useState(new Date());

  useEffect(() => {
    async function getPlans() {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        value: plan.id,
        label: plan.title,
      }));

      setPlanOptions(data);
    }
    getPlans();
  }, []);

  async function loadStudents() {
    const response = await api.get(`students?name=${studentName}`);

    return response.data;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      api.post(`registrations/${studentId}`, {
        start_date: dateOption,
        plan_id: selectedPlan,
      });

      toast.success('Matricula efetuada com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
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
            cacheOptions
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onInputChange={newValue => setStudentName(newValue)}
            loadOptions={loadStudents}
            onChange={e => setStudentId(e.id)}
            defaultOptions
          />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <Select
                onChange={e => setSelectedPlan(e.value)}
                options={planOptions}
              />
            </div>
            <div className="organize">
              <label>DATA DE INÍCIO</label>
              <Datepicker
                selected={dateOption}
                onChange={date => setDateOption(date)}
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
        </form>
      </ActionContent>
    </>
  );
}

import React, { useState, useMemo, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { addMonths } from 'date-fns';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../util/format';
import api from '../../../services/api';

import { DatePickerInput, TotalInput } from '../styles';

import ActionHeader from '../../../components/ActionHeader';
import ActionContent from '../../../components/ActionContent';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .required()
    .typeError('A escolha do aluno é obrigatória'),
  plan_id: Yup.number()
    .required()
    .typeError('Escolha do plano obrigatória'),
  start_date: Yup.date().required(),
});

export default function AddRegistration() {
  const [studentName, setStudentName] = useState('');
  const [studentSelected, setStudentSelected] = useState(null);
  const [initialDate, setInicialDate] = useState(new Date());
  const [planOptions, setPlanOptions] = useState([]);
  const [planPrice, setPlanPrice] = useState(0);
  const [planId, setPlanId] = useState('');
  const [planDuration, setPlanDuration] = useState(0);

  const finalDate = useMemo(() => addMonths(initialDate, planDuration), [
    initialDate,
    planDuration,
  ]);

  const totalPrice = useMemo(() => formatPrice(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  useEffect(() => {
    async function getPlans() {
      const response = await api.get('plans');
      const data = response.data.rows.map(plan => ({
        label: plan.title,
        value: plan.id,
        duration: plan.duration,
        price: plan.price,
      }));

      setPlanOptions(data);
    }
    getPlans();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await schema.validate(
        {
          start_date: initialDate,
          plan_id: planId,
          student_id: studentSelected,
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      err.inner.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

    try {
      await api.post(`registrations/${studentSelected}`, {
        start_date: initialDate,
        plan_id: planId,
      });
      toast.success('Matricula efetuada com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function loadStudents() {
    const response = await api.get(`students?name=${studentName}`);

    return response.data.rows;
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'blue',
    }),
    control: styles => ({
      ...styles,
      width: 200,
      marginRight: 10,
    }),
  };

  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de matrícula</span>
          <aside>
            <Link className="prevPage" to="/registration">
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit" form="registration-form">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <form onSubmit={e => handleSubmit(e)} id="registration-form">
          <label>ALUNO</label>
          <AsyncSelect
            placeholder="Busque pelo nome do aluno"
            defaultValue={null}
            name="student_id"
            loadOptions={loadStudents}
            // defaultOptions
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onInputChange={v => setStudentName(v)}
            onChange={s => setStudentSelected(s.id)}
          />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <Select
                name="plan_id"
                placeholder="Escolha um plano"
                styles={customStyles}
                defaultValue={null}
                options={planOptions}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                onChange={o => {
                  setPlanId(o.value);
                  setPlanDuration(o.duration);
                  setPlanPrice(o.price);
                }}
              />
            </div>
            <div className="organize">
              <label>DATA DE INÍCIO</label>
              <DatePicker
                name="start_date"
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
              <TotalInput value={totalPrice} readOnly />
            </div>
          </div>
        </form>
      </ActionContent>
    </>
  );
}

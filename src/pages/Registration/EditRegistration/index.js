import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { parseISO, addMonths } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { formatPrice } from '../../../util/format';
import api from '../../../services/api';

import ActionHeader from '../../../components/ActionHeader';
import ActionContent from '../../../components/ActionContent';

export default function EditRegistration() {
  const [planSelected, setPlanSelected] = useState(null);
  const [studentSelected, setStudentSelected] = useState(null);
  const [planOptions, setPlanOptions] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(0);
  const [initialDate, setInicialDate] = useState(new Date());
  const { id } = useParams();

  const finalDate = useMemo(() => addMonths(initialDate, planDuration), [
    initialDate,
    planDuration,
  ]);

  const totalPrice = useMemo(() => formatPrice(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  useEffect(() => {
    async function getRegistrationData() {
      const response = await api.get(`registrations/${id}`);
      const date = {
        start_date: parseISO(response.data.start_date),
      };

      const plan = {
        label: response.data.plan.title,
        value: response.data.plan.id,
        price: response.data.plan.price,
        duration: response.data.plan.duration,
      };

      setInicialDate(date.start_date);
      setPlanSelected(plan);
      setPlanDuration(plan.duration);
      setPlanPrice(plan.price);
      setStudentSelected(response.data.student);
    }
    getRegistrationData();
  }, [id]);

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
      await api.put(`registrations/${id}`, {
        student_id: studentSelected.id,
        plan_id: planSelected.value,
        start_date: initialDate,
      });
      toast.success('Dados atualizados com sucesso!');
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
          <span>Edição de matrícula</span>
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
          <label htmlFor="name">ALUNO</label>
          <AsyncSelect
            value={studentSelected}
            onInputChange={v => setStudentName(v)}
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={s => setStudentSelected(s)}
            name="student_id"
          />
          <div className="wrapper">
            <div className="organize">
              <label>PLANO</label>
              <Select
                value={planSelected}
                getOptionLabel={option => option.label}
                getOptionValue={option => option.value}
                onChange={p => {
                  setPlanSelected(p);
                  setPlanDuration(p.duration);
                  setPlanPrice(p.price);
                }}
                options={planOptions}
                styles={customStyles}
                name="plan_id"
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
              <DatePicker
                className="readOnly"
                selected={finalDate}
                dateFormat="dd/MM/yyyy"
                readOnly
              />
            </div>
            <div className="organize">
              <label>VALOR FINAL</label>
              <input className="readOnly" value={totalPrice} readOnly />
            </div>
          </div>
        </form>
      </ActionContent>
    </>
  );
}

import React, { useState, useMemo } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

const schema = Yup.object().shape({
  title: Yup.string().required('O nome do plano é obrigatório'),
  duration: Yup.number()
    .positive('A duração deve ser acima de 0')
    .required('A quantidade de meses é obrigatória'),
  price: Yup.number()
    .positive('O preço deve ser acima de 0')
    .required('O preço é obrigatório'),
});

export default function AddPlan() {
  const [planTitle, setPlanTitle] = useState('');
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(0);

  const totalCalculated = useMemo(() => planDuration * planPrice, [
    planDuration,
    planPrice,
  ]);

  async function handleSubmit({ title, price, duration }) {
    try {
      await api.post(`/plans`, {
        title,
        price,
        duration,
      });

      toast.success('Plano cadastrado com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Cadastro de plano</span>
          <aside>
            <Link className="prevPage" to="/plans">
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit" form="plans-form">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <Form schema={schema} onSubmit={handleSubmit} id="plans-form">
          <label htmlFor="name">TÍTULO DO PLANO</label>
          <Input
            name="title"
            type="text"
            value={planTitle}
            onChange={e => setPlanTitle(e.target.value)}
            placeholder="Título do plano"
          />
          <div className="wrapper">
            <div className="organize">
              <label htmlFor="name">DURAÇÃO (em meses)</label>
              <Input
                name="duration"
                value={planDuration}
                onChange={e => setPlanDuration(e.target.value)}
                type="number"
                placeholder="Duração em meses"
              />
            </div>
            <div className="organize">
              <label htmlFor="name">PREÇO MENSAL</label>
              <Input
                name="price"
                value={planPrice}
                onChange={e => setPlanPrice(e.target.value)}
                type="number"
                step="0.1"
                placeholder="Valor mensal do plano"
              />
            </div>
            <div className="organize">
              <label>PREÇO TOTAL</label>
              <input
                name="totalPrice"
                type="number"
                value={totalCalculated}
                step="0.01"
                placeholder="Valor total calculado"
                readOnly
              />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}

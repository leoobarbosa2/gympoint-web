import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';

const schema = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number().positive('A duração deve ser acima de 0'),
  price: Yup.number().positive('O preço deve ser acima de 0'),
});

export default function EditPlan() {
  const { id } = useParams();
  const [planTitle, setPlanTitle] = useState('');
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(0);

  const totalCalculated = useMemo(() => formatPrice(planPrice * planDuration), [
    planDuration,
    planPrice,
  ]);

  useEffect(() => {
    async function getPlanData() {
      try {
        const response = await api.get(`plans/${id}`);
        setPlanTitle(response.data.title);
        setPlanPrice(response.data.price);
        setPlanDuration(response.data.duration);
      } catch (err) {
        toast.error('Plano não encontrado');
      }
    }
    getPlanData();
  }, [id]);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.put(`/plans/${id}`, {
        title,
        duration,
        price,
      });
      toast.success('Os dados foram editados com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Edição de Planos</span>
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
                type="number"
                value={planDuration}
                placeholder="Duração em meses"
                onChange={e => setPlanDuration(e.target.value)}
              />
            </div>
            <div className="organize">
              <label htmlFor="name">PREÇO MENSAL</label>
              <Input
                name="price"
                type="number"
                step="0.1"
                value={planPrice}
                placeholder="Valor mensal do plano"
                onChange={e => setPlanPrice(e.target.value)}
              />
            </div>
            <div className="organize">
              <label>PREÇO TOTAL</label>
              <input
                className="readOnly"
                name="totalPrice"
                value={totalCalculated}
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

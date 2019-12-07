import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import DefaultTable from '../../components/DefaultTable';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  async function handleDelete(id) {
    try {
      await api.delete(`/plans/${id}`);

      const newPlansList = plans.filter(plan => plan.id !== id);
      toast.success('Plano excluído com sucesso!');
      setPlans(newPlansList);
    } catch (err) {
      toast.error('Algo de errado aconteceu');
    }
  }

  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get('plans');

        const data = response.data.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
        }));

        setPlans(data);
      } catch (err) {
        toast.error('Nenhum plano foi encontrado');
      }
    }
    getPlans();
  }, []);

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando planos</span>
          <aside>
            <Link to="/register/plan">CADASTRAR</Link>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.priceFormatted}</td>
                <td>
                  <Link to={`/plans/${plan.id}`}>editar</Link>
                </td>
                <td>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}

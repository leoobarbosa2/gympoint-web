import React, { useEffect, useState } from 'react';
import { parseISO, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import DefaultTable from '../../components/DefaultTable';
import Centralizer from '../../components/Centralizer';
import PageButton from '../../components/PageButton';

export default function Plans() {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setpage] = useState(1);
  const [plans, setPlans] = useState([]);
  const countMonth = ['mês', 'meses'];

  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get(`plans?page=${page}`);

        const data = response.data.rows.map(plan => ({
          ...plan,
          durationFormatted: `${
            plan.duration < 2
              ? `${plan.duration} ${countMonth[0]}`
              : `${plan.duration} ${countMonth[1]}`
          }`,
          priceFormatted: formatPrice(plan.price),
        }));

        setTotalPages(Math.ceil(response.data.count / 10, 1));
        setPlans(data);
      } catch (err) {
        toast.error('Nenhum plano foi encontrado');
      }
    }
    getPlans();
  }, [countMonth, page]);

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

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando planos</span>
          <aside>
            <Link to="/register/plan">
              <FaPlus size={13} color="#fff" />
              CADASTRAR
            </Link>
          </aside>
        </div>
      </ActionHeader>
      <Centralizer>
        <PageButton lock={page < 2} funcPage={() => setpage(page - 1)}>
          Anterior
        </PageButton>
        <span>{page}</span>
        <PageButton
          lock={page === totalPages}
          funcPage={() => setpage(page + 1)}
        >
          Proximo
        </PageButton>
      </Centralizer>
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
                <td>{plan.durationFormatted}</td>
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

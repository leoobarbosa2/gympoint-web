import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import DefaultTable from '../../components/DefaultTable';

export default function HelpOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get('students/help-orders');
        const data = response.data.map(order => ({
          ...order,
          formattedDate: format(
            parseISO(order.created_at),
            "d 'de' MMMM 'de ' Y",
            { locale: pt }
          ),
        }));
        setOrders(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao obter os pedidos de auxílio');
      }
    }
    getOrders();
  }, []);

  return (
    <>
      <ActionHeader>
        <div>
          <span>Pedidos de auxílio</span>
        </div>
      </ActionHeader>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>EMAIL</th>
              <th>DATA DE CRIAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.student_order.name}</td>
                <td>{order.student_order.email}</td>
                <td>{order.formattedDate}</td>
                <td>
                  <button type="button">responder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}

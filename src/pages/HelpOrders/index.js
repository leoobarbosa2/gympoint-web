import React, { useEffect, useState, useRef } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import DefaultTable from '../../components/DefaultTable';
import Modal from '../../components/Modal';

export default function HelpOrders() {
  const [visible, setVisible] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [orders, setOrders] = useState([]);
  const ref = useRef();

  // divTarget.addEventListener('click', () => {
  //   setVisible(false);
  // });

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get('students/help-orders');
        console.log(response.data);
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

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      setVisible(false);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Pedidos de auxílio</span>
        </div>
      </ActionHeader>
      <ActionContent ref={ref} onClick={handleOverlayClick}>
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
                  <button
                    type="button"
                    onClick={() => {
                      setStudentId(order.student_id);
                      setVisible(true);
                    }}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
      <Modal visible={visible} student_id={studentId} />
    </>
  );
}

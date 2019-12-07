import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import DefaultTable from '../../components/DefaultTable';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function getRegistrations() {
      try {
        const response = await api.get('registrations');
        const data = response.data.map(regist => ({
          ...regist,
          startDateFormatted: format(
            parseISO(regist.start_date),
            "d 'de' MMMM 'de' Y",
            {
              locale: pt,
            }
          ),
          endDateFormatted: format(
            parseISO(regist.end_date),
            "d 'de' MMMM 'de' Y",
            {
              locale: pt,
            }
          ),
        }));

        setRegistrations(data);
      } catch (err) {
        toast.error('Nenhuma matricula foi encontrada');
      }
    }
    getRegistrations();
  }, []);

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando matrículas</span>
          <aside>
            <Link to="/register/registration">CADASTRAR</Link>
          </aside>
        </div>
      </ActionHeader>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.student.name}</td>
                <td>{registration.plan.title}</td>
                <td>{registration.startDateFormatted}</td>
                <td>{registration.endDateFormatted}</td>
                <td>
                  {registration.active ? (
                    <MdCheckCircle size={23} color="#42cb59" />
                  ) : (
                    <MdCheckCircle size={23} color="#c4c4c4" />
                  )}
                </td>
                <td>
                  <Link to={`registration/${registration.id}`}>editar</Link>
                </td>
                <td>
                  <button type="button">apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}

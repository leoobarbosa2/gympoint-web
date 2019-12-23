import React, { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import ActionHeader from '../../components/ActionHeader';
import ActionContent from '../../components/ActionContent';
import DefaultTable from '../../components/DefaultTable';
import PageButton from '../../components/PageButton';
import Centralizer from '../../components/Centralizer';

export default function Registration() {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setpage] = useState(1);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function getRegistrations() {
      try {
        const response = await api.get(`registrations?page=${page}`);
        const data = response.data.rows.map(regist => ({
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
        setTotalPages(Math.ceil(response.data.count / 10, 1));
        setRegistrations(data);
      } catch (err) {
        toast.error('Nenhuma matricula foi encontrada');
      }
    }
    getRegistrations();
  }, [page]);

  async function handleDelete(id) {
    try {
      await api.delete(`registrations/${id}`);

      const updatedRegistrations = registrations.filter(
        regist => regist.id !== id
      );

      toast.success('Matricula excluida com sucesso!');
      setRegistrations(updatedRegistrations);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando matrículas</span>
          <aside>
            <Link to="/register/registration">
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
                <td>{registration.plan.title || 'Sem plano'}</td>
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
                  <button
                    type="button"
                    onClick={() => handleDelete(registration.id)}
                  >
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

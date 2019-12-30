import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../services/api';

import ActionContent from '../../components/ActionContent';
import ActionHeader from '../../components/ActionHeader';
import DefaultTable from '../../components/DefaultTable';
import PageButton from '../../components/PageButton';
import Centralizer from '../../components/Centralizer';

export default function Students() {
  const [name, setName] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      try {
        const response = await api.get(`students`, {
          params: { page, name },
        });

        if (response.data.count <= 10) {
          setPage(1);
        }

        setTotalPages(Math.ceil(response.data.count / 10, 1));
        setStudents(response.data.rows);
      } catch (err) {
        toast.error('Nenhum aluno foi encontrado');
      }
    }

    getStudents();
  }, [name, page]);

  async function handleDelete(id) {
    try {
      await api.delete(`/student/${id}`);

      const updatedList = students.filter(student => student.id !== id);

      setStudents(updatedList);

      toast.success('O estudante e todos os seus dados foram excluídos');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você quer mesmo excluir esse aluno?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando Alunos</span>
          <aside>
            <Link to="/register/students">
              <FaPlus size={13} color="#fff" />
              CADASTRAR
            </Link>
            <input
              type="search"
              onChange={e => setName(e.target.value)}
              placeholder="Buscar aluno"
            />
          </aside>
        </div>
      </ActionHeader>
      <Centralizer>
        <PageButton lock={page < 2} funcPage={() => setPage(page - 1)}>
          Anterior
        </PageButton>
        <span>{page}</span>
        <PageButton
          lock={page === totalPages}
          funcPage={() => setPage(page + 1)}
        >
          Proximo
        </PageButton>
      </Centralizer>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idade</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Link to={`students/${student.id}`}>editar</Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => confirmDelete(student.id)}
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

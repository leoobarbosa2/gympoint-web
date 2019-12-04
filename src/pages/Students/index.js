import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../services/api';

import ActionContainer from '../../components/ActionContainer';
import ActionHeader from '../../components/ActionHeader';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    getStudents();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/student/${id}`);

      const updatedList = students.filter(student => student.id !== id);

      setStudents(updatedList);

      toast.success('The student and his information have been deleted');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <ActionHeader>
        <div>
          <span>Gerenciando Alunos</span>
          <aside>
            <Link to="/register">
              <FaPlus size={13} color="#fff" />
              CADASTRAR
            </Link>
            <input type="search" placeholder="Buscar aluno" />
          </aside>
        </div>
      </ActionHeader>
      <ActionContainer>
        <table>
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
                    onClick={() => handleDelete(student.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ActionContainer>
    </>
  );
}

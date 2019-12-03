import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import api from '../../services/api';

// import { Container } from './styles';

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
                  <Link to="/">editar</Link>
                </td>
                <td>
                  <button type="button">apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ActionContainer>
    </>
  );
}

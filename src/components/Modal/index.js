import React, { useRef, useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import api from '../../services/api';

import { Container, Modal } from './styles';

export default function ModalAnswer({ student_id, visible, hide }) {
  const [studentQuestion, setStudentQuestion] = useState('');
  const ref = useRef();

  useEffect(() => {
    async function getHelpOrderInfo() {
      const response = await api.get(`/students/${student_id}/help-orders`);

      // const data = response.data.map(order => ({
      //   question: order.question,
      // }));
    }
    getHelpOrderInfo();
  }, [student_id]);

  async function handleSubmit(data) {
    console.log(data);
  }

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      hide();
    }
  }

  return (
    <Container visible={visible} ref={ref} onClick={handleOverlayClick}>
      <Modal visibleEffect>
        <strong>PERGUNTA DO ALUNO</strong>
        <p>{studentQuestion}</p>
        <Form onSubmit={handleSubmit}>
          <strong>SUA RESPOSTA</strong>
          <Input
            name="anwer"
            placeholder="Digite a resposta para o aluno"
            multiline
            type="text"
          />
          <button type="submit">Responder aluno</button>
        </Form>
      </Modal>
    </Container>
  );
}

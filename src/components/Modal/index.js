import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container, Modal } from './styles';

export default function ModalAnswer({ student_id, visible }) {
  async function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container visible={visible}>
      <Modal visibleEffect>
        <strong>PERGUNTA DO ALUNO</strong>
        <p>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </p>
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

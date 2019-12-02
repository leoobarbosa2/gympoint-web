import React from 'react';
import { useDispatch } from 'react-redux';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/images/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input id="email" type="email" name="email" />
        <label htmlFor="password">SUA SENHA</label>
        <Input name="password" type="password" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}

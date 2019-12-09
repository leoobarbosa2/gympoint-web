import React, { useRef, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from '@rocketseat/unform';
import api from '../../services/api';

export default function SelectInput({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [studentName, setStudentName] = useState('');
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  async function loadStudents() {
    const response = await api.get(`students?name=${studentName}`);

    return response.data;
  }

  return (
    <>
      <AsyncSelect
        name={fieldName}
        selected={selected}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        onChange={e => setSelected(e.id)}
        defaultOptions
        onInputChange={newValue => setStudentName(newValue)}
        loadOptions={loadStudents}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

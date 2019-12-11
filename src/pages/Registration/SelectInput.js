import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import { useField } from '@rocketseat/unform';

import api from '../../services/api';

export default function AsyncSelectInput({ name, handleChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);
  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    async function getPlans() {
      const response = await api.get('plans');
      const data = response.data.map(plan => ({
        label: plan.title,
        value: plan.id,
        duration: plan.duration,
        price: plan.price,
      }));

      setPlanOptions(data);
    }
    getPlans();
  }, []);

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

  return (
    <>
      <Select
        name={fieldName}
        selected={selected}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        onChange={e => {
          setSelected(e.value);
          handleChange(e);
        }}
        options={planOptions}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

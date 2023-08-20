import { useState, ChangeEvent, SyntheticEvent } from "react";

export function useForm<InputValues extends object>(inputValues: InputValues) {
  const [values, setValues] = useState(inputValues || {});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
  };

  return { values, handleChange, setValues, onSubmit };
}
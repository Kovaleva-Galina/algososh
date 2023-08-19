import { useState, ChangeEvent } from "react";

export function useForm<InputValues extends object>(inputValues: InputValues) {
  const [values, setValues] = useState(inputValues || {});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
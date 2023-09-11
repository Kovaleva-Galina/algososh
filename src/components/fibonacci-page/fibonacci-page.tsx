import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './fibonacci-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibIterative } from "./fibIterative";
import { useForm } from "../../hooks/useForm";

const TIMEOUT = 500;
const MAX = 19;
const MIN = 0;

const getInitialValues = () => ({ message: '' });

export const FibonacciPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { values, handleChange, setValues, onSubmit } = useForm<{ message: string }>(getInitialValues());
  const [updated, setUpdated] = useState<number[]>([]);

  const handleClick = () => {
    setUpdated([])
    if (values.message && !loading) {
      const result = fibIterative(+values.message);
      const addItem = () => {
        const item = result.shift();
        if (item !== undefined) {
          setUpdated((updated) => [...updated, item]);
          setLoading(true);
        } else {
          clearInterval(intervalId);
          setValues(getInitialValues());
          setLoading(false);
        }
      };
      const intervalId = setInterval(addItem, TIMEOUT);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${styles.form}`} onSubmit={onSubmit}>
        <Input
          extraClass='default'
          max={MAX}
          min={MIN}
          isLimitText
          type="number"
          name="message"
          onChange={handleChange}
          value={values.message}>
        </Input>
        <Button
          text='Рассчитать'
          extraClass='default'
          type="button"
          linkedList="small"
          onClick={handleClick}
          isLoader={loading}
          disabled={loading || !values.message || +values.message > MAX || +values.message < MIN}
          data-testid="button"
        />
      </form>
      <div className={`${styles.result}`} data-testid="string-result">
        {!!updated &&
          updated.map((i, index) => (
            <Circle letter={`${i}`} key={index} index={index}></Circle>
          ))
        }
      </div>
    </SolutionLayout>
  );
};
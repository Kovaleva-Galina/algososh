import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './fibonacci-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibIterative } from "./fibIterative";

const TIMEOUT = 500;
const MAX = 19;
const MIN = 0;


export const FibonacciPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const [current, setCurrent] = useState<number | null>();
  const [updated, setUpdated] = useState<number[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrent(Math.max(Number(MIN), Math.min(Number(MAX), Number(value))));
    setDisabled(false);
  };

  const handleClick = () => {
    setUpdated([])
    if (current && !loading) {
      const result = fibIterative(current);
      const addItem = () => {
        const item = result.shift();
        if (item !== undefined) {
          setUpdated((updated) => [...updated, item]);
          setLoading(true);
        } else {
          clearInterval(intervalId);
          setCurrent(null);
          setDisabled(true);
          setLoading(false);
        }
      };
      const intervalId = setInterval(addItem, TIMEOUT);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${styles.form}`}>
        <Input
          extraClass='default'
          max={MAX}
          isLimitText
          type="number"
          id="message"
          onChange={handleChange}
          value={current || ''}>
        </Input>
        <Button text='Рассчитать' extraClass='default' type="button" linkedList="small" onClick={handleClick} isLoader={loading} disabled={disabled}></Button>
      </form>
      <div className={`${styles.result}`}>
        {!!updated &&
          updated.map((i, index) => (
            <Circle letter={`${i}`} key={index} index={index}></Circle>
          ))
        }
      </div>
    </SolutionLayout>
  );
};



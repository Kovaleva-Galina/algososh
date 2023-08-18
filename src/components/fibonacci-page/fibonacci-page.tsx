import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './fibonacci-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

const TIMEOUT = 500;
const MAX = 19;
const MIN = 0;

const fibIterative = (n: number): number[] => {
  let arr: number[] = [0, 1];
  for (let i = 2; i < n + 1; i++){
    arr.push(arr[i - 2] + arr[i -1]);
  }
  return arr
} 

export const FibonacciPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setMessage] = useState<number>();
  const [updated, setUpdated] = useState<number[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; 
    setMessage(Math.max(Number(MIN), Math.min(Number(MAX), Number(value))));
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
        <Button text='Рассчитать' extraClass='default' type = "button" linkedList = "small" onClick={handleClick} isLoader = {loading}></Button>
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



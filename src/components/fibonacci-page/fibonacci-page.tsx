import React from "react";
import { useState, ChangeEvent } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './fibonacci-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [current, setMessage] = useState('');

  const [updated, setUpdated] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    setUpdated(current.split(''));
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${styles.form}`}>
        <Input 
          extraClass='default' 
          max={19} 
          isLimitText 
          type="number"
          id="message"
          name="message"
          onChange={handleChange}
          value={current}>
        </Input>
        <Button text='Развернуть' extraClass='default' type = "button" linkedList = "small" onClick={handleClick}></Button>
      </form>
      <div className={`${styles.result}`}>
      {!!updated &&
        updated.map((i, index) => (
          <Circle letter={i} key={index} ></Circle>
        ))
      }
      </div>
    </SolutionLayout>
  );
};



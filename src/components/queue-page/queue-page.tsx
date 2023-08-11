import React from "react";
import { useState, ChangeEvent } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './queue-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const [current, setMessage] = useState('');

  const [updated, setUpdated] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    setUpdated(current.split(''));
  };
  return (
    <SolutionLayout title="Очередь">
      <form className={`${styles.form}`}>
        <div className={`${styles.form}`}>
          <Input 
            placeholder = "Введите значение"
            extraClass='default' 
            maxLength={4} 
            isLimitText 
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={current}>
          </Input>
          <Button text='Добавить' extraClass='default' type = "button" linkedList = "big" onClick={handleClick}></Button>
          <Button text='Удалить' extraClass='default' type = "button" linkedList = "big" onClick={handleClick}></Button>
        </div>
        <Button text='Очистить' extraClass='default' type = "button" linkedList = "big" onClick={handleClick}></Button>
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

import React from "react";
import { useState, ChangeEvent } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './list-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const [current, setMessage] = useState('');

  const [updated, setUpdated] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    setUpdated(current.split(''));
  }
  return (
    <SolutionLayout title="Связный список">
      <form className={`${styles.form}`}>
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
          <Button text='Добавить в head' extraClass='default' type = "button" linkedList = "small" onClick={handleClick}></Button>
          <Button text='Добавить в tail' extraClass='default' type = "button" linkedList = "small"  onClick={handleClick}></Button>
          <Button text='Удалить из head' extraClass='default' type = "button" linkedList = "small" onClick={handleClick}></Button>
          <Button text='Удалить из tail' extraClass='default' type = "button" linkedList = "small" onClick={handleClick}></Button>
      </form>
      <form className={`${styles.form}`}>
        <Input 
          placeholder = "Введите индекс"
          extraClass='default' 
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={current}>
        </Input>
        <Button text='Добавить по индексу' extraClass='default' type = "button" linkedList = "big" onClick={handleClick}></Button>
        <Button text='Удалить по индексу' extraClass='default' type = "button" linkedList = "big" onClick={handleClick}></Button>
      </form>
      <div className={`${styles.result}`}>
        {!!updated &&
          updated.map((i, index) => (
            <Circle letter={i} key={index} ></Circle>
          ))
        }
      </div>
    </SolutionLayout>
  )
}

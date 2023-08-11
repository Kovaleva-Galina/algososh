import React from "react";
import { useState, ChangeEvent } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from './sorting-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  const [current, setMessage] = useState('');

  const [updated, setUpdated] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    setUpdated(current.split(''));
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${styles.form}`}>
        <div className={`${styles.inputs}`}>
          <RadioInput label='Выбор' extraClass = "checked"></RadioInput>
          <RadioInput label='Пузырёк'></RadioInput>
        </div>
        <div className={`${styles.buttons_sort}`}>
          <Button text='По возрастанию' sorting = {Direction.Ascending} extraClass='default increase' type = "button" linkedList = "big" onClick={handleClick}></Button>
          <Button text='По убыванию' sorting = {Direction.Ascending} extraClass='default increase' type = "button" linkedList = "big"  onClick={handleClick}></Button>
        </div>
        <Button text='Новый массив' extraClass='default' type = "button" linkedList = "small" onClick={handleClick}></Button>
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

import React, { useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./reverseString";
import { useForm } from "../../hooks/useForm";

const getInitialValues = () => ({ message: '' });
export interface Updated { chars: string[], left: number, right: number }
const TIMEOUT = 1000;

export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm<{ message: string }>(getInitialValues());
  const [isLoader, setIsLoader] = useState(false);
  const queueRef = useRef<Updated[]>([]); // [{ chars: ['123'], left: 0, right: 0 }, { chars: ['321'], left: 1, right: 1 }]

  const [updated, setUpdated] = useState<Updated>({
    chars: [],
    left: 0,
    right: 0,
  });

  const handleClick = () => {
    const onChange = (state: Updated) => {
      queueRef.current.push(state);
    };
    reverseString(values.message, onChange);
    const shiftItem = () => {
      const item = queueRef.current.shift();
      if (item) {
        setUpdated(item);
        setIsLoader(true)
      } else {
        clearInterval(intervalId);
        setValues(getInitialValues());
        setIsLoader(false)
      }
    };
    const intervalId = setInterval(shiftItem, TIMEOUT);
  };

  const getState = (index: number): ElementStates => {
    if (index < updated.left || index > updated.right || updated.left >= updated.right) {
      return ElementStates.Modified;
    }
    if (index === updated.left || index === updated.right) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Строка">
      <form className={`${styles.form}`}>
        <Input
          extraClass='default'
          maxLength={11}
          isLimitText
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={values.message}
        />
        <Button text='Развернуть' type="button" linkedList="small" onClick={handleClick} disabled={!values.message} isLoader={isLoader}></Button>
      </form>
      <div className={`${styles.result}`}>
        {!!updated &&
          updated.chars.map((i, index) => (
            <Circle letter={i} key={index} state={getState(index)} ></Circle>
          ))
        }
      </div>
    </SolutionLayout>
  );
};
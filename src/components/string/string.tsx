import React, { useRef, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./reverseString";

export interface Updated { chars: string[], left: number, right: number }
const TIMEOUT = 1000;

export const StringComponent: React.FC = () => {
  const [current, setCurrent] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const queueRef = useRef<Updated[]>([]); // [{ chars: ['123'], left: 0, right: 0 }, { chars: ['321'], left: 1, right: 1 }]

  const [updated, setUpdated] = useState<Updated>({
    chars: [],
    left: 0,
    right: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrent(event.target.value);
    setDisabled(false);
  };

  const handleClick = () => {

    const onChange = (state: Updated) => {
      queueRef.current.push(state);
    };
    reverseString(current, onChange);
    const shiftItem = () => {
      const item = queueRef.current.shift();
      if (item) {
        setUpdated(item);
        setIsLoader(true)
      } else {
        clearInterval(intervalId);
        setCurrent('');
        setDisabled(true);
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
          value={current}>
        </Input>
        <Button text='Развернуть' type="button" linkedList="small" onClick={handleClick} disabled={disabled} isLoader={isLoader}></Button>
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
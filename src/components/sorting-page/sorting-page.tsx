import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from './sorting-page.module.css';
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "./randomArr";
import { bubbleSort, selectionSort } from "./sort";

export interface Updated { chars: number[], changing: number[], modified: number[] };
const TIMEOUT = 500;

export const SortingPage: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const queueRef = useRef<Updated[]>([]);//[{ chars: [39, 36, 78], firstIndex: 0, secondIndex: 1 }, { chars: [36, 39, 78], left: 1, right: 1 }]
  function changeCheckbox() {
    setChecked(!checked);
  }

  const [current, setMessage] = useState<number[]>(randomArr());

  const [updated, setUpdated] = useState<Updated>({
    chars: current,
    changing: [],
    modified: [],
  });

  const handleChange = () => {
    const newCurrent = randomArr();
    setMessage(newCurrent);
    setUpdated((updated) => ({
      ...updated,
      chars: newCurrent,
    }));
  };

  const sortSelection = (isUp: boolean) => {
    const onChange = (state: Updated) => {
      queueRef.current.push(state);
    };
    selectionSort([...current], isUp, onChange);
    const shiftItem = () => {
      const item = queueRef.current.shift();
      if (item) {
        setUpdated(item);
      } else {
        clearInterval(intervalId);
        setIsLoader(false);
        setDisabled(false)
      }
    };
    const intervalId = setInterval(shiftItem, TIMEOUT);
  }

  const sortBubble = (isUp: boolean) => {
    const onChange = (state: Updated) => {
      queueRef.current.push(state);
    };
    bubbleSort([...current], isUp, onChange);
    const shiftItem = () => {
      const item = queueRef.current.shift();
      if (item) {
        setUpdated(item);
      } else {
        clearInterval(intervalId);
        setIsLoader(false);
        setDisabled(false)
      }
    };
    const intervalId = setInterval(shiftItem, TIMEOUT);
  }

  const handleClickMax = () => {
    if (checked) {
      sortSelection(true);
      setIsLoader(true);
      setDisabled(true);
    } else {
      sortBubble(true);
      setIsLoader(true);
      setDisabled(true);
    }
  };

  const handleClickMin = () => {
    if (checked) {
      sortSelection(false);
      setIsLoader(false);
      setDisabled(true);
    } else {
      sortBubble(false);
      setIsLoader(false);
      setDisabled(true);
    }
  };

  const getState = (index: number): ElementStates => {
    if (updated.changing.includes(index)) {
      return ElementStates.Changing;
    }
    if (updated.modified.includes(index)) {
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${styles.form}`}>
        <div className={`${styles.inputs}`}>
          <RadioInput label='Выбор' checked={checked} onChange={changeCheckbox} ></RadioInput>
          <RadioInput label='Пузырёк' checked={!checked} onChange={changeCheckbox} ></RadioInput>
        </div>
        <div className={`${styles.buttons_sort}`}>
          <Button
            text='По возрастанию'
            sorting={Direction.Ascending}
            extraClass='default increase'
            type="button"
            linkedList="big"
            onClick={handleClickMax}
            isLoader={isLoader}
            disabled={disabled}
          />
          <Button
            text='По убыванию'
            sorting={Direction.Ascending}
            extraClass='default increase'
            type="button"
            linkedList="big"
            onClick={handleClickMin}
            disabled={disabled}
            isLoader={(isLoader === disabled === false)}
          />
        </div>
        <Button
          text='Новый массив'
          extraClass='default'
          type="button"
          linkedList="small"
          onClick={handleChange}
          disabled={disabled}
        />
      </form>
      <div className={`${styles.result}`}>
        {!!updated &&
          updated.chars.map((elem, index) => (
            <Column index={elem} key={index} state={getState(index)} ></Column>
          ))
        }
      </div>
    </SolutionLayout>
  )
}

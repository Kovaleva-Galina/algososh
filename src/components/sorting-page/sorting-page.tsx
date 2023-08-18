import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from './sorting-page.module.css';
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

export interface Updated { chars: number[], changing: number[], modified: number[] };
const TIMEOUT = 600;
const randomArr = (minLen:number = 3, maxLen:number = 17, max = 100, min = 0) => {
  const chars: number[] = [];
  const arrLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < arrLength; i++) {
    chars.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return chars
}

const swap = (chars: number[], firstIndex: number, secondIndex: number): void => {
  const temp = chars[firstIndex];
  chars[firstIndex] = chars[secondIndex];
  chars[secondIndex] = temp;
};

export const selectionSort = (chars: number[], isUp = true, onChange?: (updated: Updated) => void) => {
  const { length } = chars;
  const modified: number[] = [];
  for (let i = 0; i < length; i++) {
    for (let j = i; j < length; j++) {
      if (isUp ? chars[i] > chars[j] : chars[i] < chars[j]) {
        swap(chars, j, i);
        onChange?.({ chars: [...chars], changing: [i, j], modified: [...modified] });
      }
    }
    modified.push(i);
  }
  modified.push(length - 1);
  onChange?.({ chars: [...chars], changing: [], modified: [...modified] });
  return chars;
};

const bubbleSort = (chars: number[], isUp = true, onChange?: (updated: Updated) => void) => {
  const { length } = chars;
  const modified: number[] = [];
  let modifiedIndex = length - 1;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < chars.length - 1 - i; j++) {
      onChange?.({ chars: [...chars], changing: [j, j+1], modified: [...modified] });
      if (isUp ? chars[j] > chars[j + 1] : chars[j + 1] > chars[j]) { // сортируем элементы по возрастанию
          swap(chars, j, j+1);
      }
    }
    modified.push(modifiedIndex);
    modifiedIndex -= 1;
  }
  modified.push(modifiedIndex);
  onChange?.({ chars: [...chars], changing: [], modified: [...modified] });
} 

export const SortingPage: React.FC = () => {
  const [checked, setChecked] = useState(false);
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
      chars:  newCurrent,
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
        clearInterval(intervalId)
      } 
    };
    const intervalId = setInterval(shiftItem, TIMEOUT);
  }

  const sortBubble= (isUp: boolean) => {
    const onChange = (state: Updated) => {
      queueRef.current.push(state);
    };
    bubbleSort([...current], isUp, onChange);
    const shiftItem = () => {
      const item = queueRef.current.shift();
      if (item) {
        setUpdated(item);
      } else {
        clearInterval(intervalId)
      } 
    };
    const intervalId = setInterval(shiftItem, TIMEOUT);
  }

  const handleClickMax = () => {
    if(checked) {
      sortSelection(true);
    } else {
    sortBubble(true)
    }
  };

  const handleClickMin = () => {
    if(checked) {
      sortSelection(false);
    }else {
      sortBubble(false)
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
          <Button text='По возрастанию' sorting = {Direction.Ascending} extraClass='default increase' type = "button" linkedList = "big" onClick={handleClickMax}></Button>
          <Button text='По убыванию' sorting = {Direction.Ascending} extraClass='default increase' type = "button" linkedList = "big"  onClick={handleClickMin} ></Button>
        </div>
        <Button text='Новый массив' extraClass='default' type = "button" linkedList = "small" onClick={handleChange}></Button>
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

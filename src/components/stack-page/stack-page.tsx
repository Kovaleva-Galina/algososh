import React, { useState, ChangeEvent, useRef, useMemo, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './stack-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from './stack';
import { ElementStates } from "../../types/element-states";

const TIMEOUT = 500;

export const StackPage: React.FC = () => {
  const stackRef = useRef<Stack<string>>(new Stack());
  const [renderListNumber, setRenderListNumber] = useState(0);
  const [elementState, setElementState] = useState<number | null>(null);
  const [current, setCurrent] = useState('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const list = useMemo(() => stackRef.current.list, [renderListNumber]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrent(event.target.value);
  };

  useEffect(() => {
    if (current.length) {
      setDisabled(false);
    } else {
      setDisabled(true)
    }
  }, [current])

  const addElement = () => {
    setElementState(stackRef.current.list.length);
    setTimeout(() => {
      stackRef.current.push(current);
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
        setCurrent('')
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const deleteElement = () => {
    setElementState(stackRef.current.list.length - 1);
    setTimeout(() => {
      stackRef.current.pop();
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const clear = () => {
    stackRef.current.clear();
    setRenderListNumber((renderListNumber) => renderListNumber + 1);
    setCurrent('')
  }

  return (
    <SolutionLayout title="Стек">
      <form className={`${styles.form}`}>
        <div className={`${styles.form}`}>
          <Input
            extraClass='default'
            maxLength={4}
            isLimitText
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={current}>
          </Input>
          <Button text='Добавить' extraClass='default' type="button" linkedList="small" onClick={addElement} disabled={disabled}></Button>
          <Button text='Удалить' extraClass='default' type="button" linkedList="small" onClick={deleteElement} disabled={list.length > 0 ? false : true}></Button>
        </div>
        <Button text='Очистить' extraClass='default' type="button" linkedList="small" onClick={clear} disabled={list.length > 0 ? false : true}></Button>
      </form>
      <div className={`${styles.result}`}>
        {!!list &&
          list.map((value, index) => (
            <Circle
              letter={value}
              key={index}
              state={elementState !== null && index === elementState ? ElementStates.Changing : ElementStates.Default}
              head={index === list.length - 1 ? 'top' : null}
              index={index}
            />
          ))
        }
      </div>
    </SolutionLayout>
  );
};

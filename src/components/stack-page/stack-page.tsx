import React, { useState, useRef, useMemo, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './stack-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from './stack';
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/useForm";

const getInitialValues = () => ({ message: '' });

enum Buttons {
  addElement = 'addElement',
  deleteElement = 'deleteElement',
}

const TIMEOUT = 500;

export const StackPage: React.FC = () => {
  const [loading, setLoading] = useState<Buttons | null>(null)
  const stackRef = useRef<Stack<string>>(new Stack());
  const [renderListNumber, setRenderListNumber] = useState(0);
  const [elementState, setElementState] = useState<number | null>(null);
  const { values, handleChange, setValues, onSubmit } = useForm<{ message: string }>(getInitialValues());
  const [disabled, setDisabled] = useState<boolean>(true);

  const list = useMemo(() => stackRef.current.list, [renderListNumber]);

  useEffect(() => {
    if (values.message.length) {
      setDisabled(false);
    } else {
      setDisabled(true)
    }
  }, [values.message])

  const addElement = () => {
    setElementState(stackRef.current.list.length);
    setLoading(Buttons.addElement);
    setTimeout(() => {
      stackRef.current.push(values.message);
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
        setValues(getInitialValues());
        setLoading(null);
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const deleteElement = () => {
    setElementState(stackRef.current.list.length - 1);
    setLoading(Buttons.deleteElement);
    setTimeout(() => {
      stackRef.current.pop();
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
        setLoading(null);
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const clear = () => {
    stackRef.current.clear();
    setRenderListNumber((renderListNumber) => renderListNumber + 1);
    setValues(getInitialValues());
  }

  return (
    <SolutionLayout title="Стек">
      <form className={`${styles.form}`} onSubmit={onSubmit}>
        <div className={`${styles.form}`}>
          <Input
            extraClass='default'
            maxLength={4}
            isLimitText
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={values.message}
          />
          <Button text='Добавить' extraClass='default' type="button" linkedList="small" onClick={addElement} disabled={disabled} isLoader={loading === Buttons.addElement}></Button>
          <Button text='Удалить' extraClass='default' type="button" linkedList="small" onClick={deleteElement} disabled={list.length > 0 ? false : true} isLoader={loading === Buttons.deleteElement}></Button>
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

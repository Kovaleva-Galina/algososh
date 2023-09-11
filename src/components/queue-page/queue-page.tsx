import React, { useState, useRef, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './queue-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from './queue';
import { useForm } from "../../hooks/useForm";

const getInitialValues = () => ({ message: '' });
enum Buttons {
  addElement = 'addElement',
  deleteElement = 'deleteElement',
}

const size = 7;
const TIMEOUT = 500;
export interface Updated { chars: string[], head: number, tail: number }

export const QueuePage: React.FC = () => {
  const [loading, setLoading] = useState<Buttons | null>(null);
  const { values, handleChange, setValues, onSubmit } = useForm<{ message: string }>(getInitialValues());
  const queueRef = useRef<Queue<string>>(new Queue(size));
  const [renderListNumber, setRenderListNumber] = useState(0);
  const [elementState, setElementState] = useState<number | null>(null);

  const list = useMemo(() => queueRef.current.list, [renderListNumber]);

  const enqueue = () => {
    setElementState(queueRef.current.tail + 1);
    setLoading(Buttons.addElement);
    setTimeout(() => {
      queueRef.current.enqueue(values.message);
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
        setLoading(null);
        setValues(getInitialValues());
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const dequeue = () => {
    setElementState(queueRef.current.head);
    setLoading(Buttons.deleteElement)
    setTimeout(() => {
      queueRef.current.dequeue();
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
        setLoading(null);
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const clear = () => {
    queueRef.current.clear();
    setRenderListNumber((renderListNumber) => renderListNumber + 1);
    setValues(getInitialValues())
  }

  const getHead = (index: number): string | null => {
    if (index === queueRef.current.head) {
      return 'head';
    }
    return null;
  }

  const getTail = (index: number): string | null => {
    if (index === queueRef.current.tail) {
      return 'tail';
    }
    return null;
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={`${styles.form}`} onSubmit={onSubmit}>
        <div className={`${styles.form}`}>
          <Input
            placeholder="Введите значение"
            extraClass='default'
            maxLength={4}
            isLimitText
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={values.message}
          />
          <Button
            text='Добавить'
            extraClass='default'
            type="button"
            linkedList="big"
            onClick={enqueue}
            disabled={!values.message || queueRef.current.tail === size - 1}
            isLoader={loading === Buttons.addElement}
            data-testid="button-add"
          />
          <Button
            text='Удалить'
            extraClass='default'
            type="button"
            linkedList="big"
            onClick={dequeue}
            disabled={queueRef.current.isEmpty}
            isLoader={loading === Buttons.deleteElement}
            data-testid="button-delete"
          />
        </div>
        <Button
          text='Очистить'
          extraClass='default'
          type="button"
          linkedList="big"
          onClick={clear}
          disabled={queueRef.current.isStartedState}
          data-testid="button-clear"
        />
      </form>
      <div className={`${styles.result}`} data-testid="queue-result" >
        {
          list.map((value, index) => (
            <Circle
              index={index}
              letter={value || ''}
              key={index}
              head={value ? getHead(index) : null}
              tail={value ? getTail(index) : null}
              state={elementState !== null && index === elementState ? ElementStates.Changing : ElementStates.Default}
            />
          ))
        }
      </div>
    </SolutionLayout>
  );
};

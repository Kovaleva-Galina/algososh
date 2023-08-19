import React, { useState, ChangeEvent, useRef, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './queue-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from './queue';

const size = 7;
const TIMEOUT = 500;
export interface Updated { chars: string[], head: number, tail: number }

export const QueuePage: React.FC = () => {
  const queueRef = useRef<Queue<string>>(new Queue(size));
  const [renderListNumber, setRenderListNumber] = useState(0);
  const [elementState, setElementState] = useState<number | null>(null);
  const [current, setCurrent] = useState('');

  const list = useMemo(() => queueRef.current.list, [renderListNumber]);

  const enqueue = () => {
    setElementState(queueRef.current.tail + 1);
    setTimeout(() => {
      queueRef.current.enqueue(current);
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
        setCurrent('')
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const dequeue = () => {
    setElementState(queueRef.current.head);
    setTimeout(() => {
      queueRef.current.dequeue();
      setRenderListNumber((renderListNumber) => renderListNumber + 1);
      setTimeout(() => {
        setElementState(null);
      }, TIMEOUT)
    }, TIMEOUT);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrent(event.target.value);
  };

  const clear = () => {
    queueRef.current.clear();
    setRenderListNumber((renderListNumber) => renderListNumber + 1);
    setCurrent('')
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
      <form className={`${styles.form}`}>
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
            value={current}>
          </Input>
          <Button text='Добавить' extraClass='default' type="button" linkedList="big" onClick={enqueue} disabled={!current || queueRef.current.tail === size - 1}></Button>
          <Button text='Удалить' extraClass='default' type="button" linkedList="big" onClick={dequeue} disabled={queueRef.current.isEmpty}></Button>
        </div>
        <Button text='Очистить' extraClass='default' type="button" linkedList="big" onClick={clear} disabled={queueRef.current.isStartedState}></Button>
      </form>
      <div className={`${styles.result}`}>{
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

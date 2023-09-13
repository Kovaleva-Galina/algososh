import React, { useState, useRef, useMemo, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './list-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from './linked-list';
import { useForm } from "../../hooks/useForm";

const getInitialValues = () => ({ value: '', index: '' });
const TIMEOUT = 1000;

interface Queue {
  currentAddIndex?: number | null;
  modifiedIndex: number | null;
  currentDeleteIndex?: number | null;
}

enum Buttons {
  addToHead = 'addToHead',
  addToTail = 'addToTail',
  deleteFromHead = 'deleteFromHead',
  deleteFromTail = 'deleteFromTail',
  addByIndex = 'addByIndex',
  deleteByIndex = 'deleteByIndex'
}

export const ListPage: React.FC = () => {
  const queueRef = useRef<Queue[]>([]);
  const [loading, setLoading] = useState<Buttons | null>(null)
  const [renderListNumber, setRenderListNumber] = useState(0);
  const { values, handleChange, setValues, onSubmit } = useForm<{ value: string, index: string }>(getInitialValues());
  const [changingElements, setChangingElements] = useState<Queue[]>([]);
  const linkedListRef = useRef<LinkedList<string>>(new LinkedList<string>(['1', '3', '5', '8']));
  const [currentQueueElement, setCurrentQueueElement] = useState<Queue | null>(null);

  const list = useMemo(() => linkedListRef.current.list(), [renderListNumber]);

  const runShiftInterval = () => {
    const shiftItem = () => {
      if (queueRef.current.length === 1 && queueRef.current[0]?.currentAddIndex !== undefined) {
        setRenderListNumber((renderListNumber) => renderListNumber + 1);
      }
      const item = queueRef.current.shift();
      if (item) {
        setCurrentQueueElement(item);
        setChangingElements((items) => [...items, item]);
      } else {
        setCurrentQueueElement(null);
        setChangingElements([]);
        setValues(getInitialValues())
        setRenderListNumber((renderListNumber) => renderListNumber + 1);
        clearInterval(intervalId);
        setLoading(null);
      }
    };
    const intervalId = setInterval(shiftItem, TIMEOUT);
  }

  const handleAddByIndex = () => {
    if (values.index) {
      const maxIndex = +values.index;
      linkedListRef.current.addAtIndex(maxIndex, values.value, (index: number) => {
        queueRef.current.push({ currentAddIndex: index, modifiedIndex: null });
      });
      queueRef.current.push({ currentAddIndex: null, modifiedIndex: maxIndex });
      setLoading(Buttons.addByIndex);
      runShiftInterval();
    }
  }

  const handleDeleteByIndex = () => {
    if (values.index) {
      const maxIndex = +values.index;
      linkedListRef.current.delete(maxIndex, (index: number) => {
        queueRef.current.push({ currentDeleteIndex: index, modifiedIndex: null });
      });
      queueRef.current.push({ currentDeleteIndex: null, modifiedIndex: maxIndex });
      setLoading(Buttons.deleteByIndex);
      runShiftInterval();
    }
  }

  const handleAddToHead = () => {
    linkedListRef.current.prepend(values.value);
    queueRef.current.push({ currentAddIndex: 0, modifiedIndex: null });
    queueRef.current.push({ currentAddIndex: null, modifiedIndex: 0 });
    setLoading(Buttons.addToHead);
    runShiftInterval();
  }

  const handleDeleteFromHead = () => {
    linkedListRef.current.delete(0);
    queueRef.current.push({ currentDeleteIndex: 0, modifiedIndex: null });
    queueRef.current.push({ currentDeleteIndex: null, modifiedIndex: 0 });
    setLoading(Buttons.deleteFromHead);
    runShiftInterval();
  }

  const handleAddToTail = () => {
    linkedListRef.current.append(values.value);
    queueRef.current.push({ currentAddIndex: list.length - 1, modifiedIndex: null });
    queueRef.current.push({ currentAddIndex: null, modifiedIndex: list.length });
    setLoading(Buttons.addToTail);
    runShiftInterval();
  }

  const handleDeleteFromTail = () => {
    linkedListRef.current.delete(list.length - 1);
    queueRef.current.push({ currentDeleteIndex: list.length - 1, modifiedIndex: null });
    queueRef.current.push({ currentDeleteIndex: null, modifiedIndex: list.length - 1 });
    setLoading(Buttons.deleteFromTail);
    runShiftInterval();
  }

  const getState = (index: number) => {
    if (currentQueueElement && currentQueueElement.modifiedIndex !== null && index === currentQueueElement.modifiedIndex) {
      return ElementStates.Modified;
    }
    if (changingElements.length && !currentQueueElement?.modifiedIndex && index !== currentQueueElement?.currentAddIndex && index !== currentQueueElement?.currentDeleteIndex && currentQueueElement?.currentAddIndex !== list.length - 1 && currentQueueElement?.currentDeleteIndex !== list.length - 1 && changingElements.find(({ currentAddIndex, currentDeleteIndex }) => (typeof currentAddIndex === 'number' && index < currentAddIndex) || (typeof currentDeleteIndex === 'number' && index <= currentDeleteIndex))) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={`${styles.form}`} onSubmit={onSubmit}>
        <div className={`${styles.form_without_index}`}>
          <Input
            placeholder="Введите значение"
            extraClass='default'
            maxLength={4}
            isLimitText
            type="text"
            name="value"
            value={values.value}
            onChange={handleChange}
            data-testid="input-value"
          />
          <Button
            text='Добавить в head'
            extraClass='default'
            type="button"
            linkedList="small"
            onClick={handleAddToHead}
            disabled={!values.value || !!loading}
            isLoader={loading === Buttons.addToHead}
            data-testid="button-add-in-head"
          />
          <Button
            text='Добавить в tail'
            extraClass='default'
            type="button"
            linkedList="small"
            onClick={handleAddToTail}
            disabled={!values.value || !!loading}
            isLoader={loading === Buttons.addToTail}
            data-testid="button-add-in-tail"
          />
          <Button
            text='Удалить из head'
            extraClass='default'
            type="button"
            linkedList="small"
            onClick={handleDeleteFromHead}
            disabled={!!loading}
            isLoader={loading === Buttons.deleteFromHead}
            data-testid="button-delete-from-head"
          />
          <Button
            text='Удалить из tail'
            extraClass='default'
            type="button"
            linkedList="small"
            onClick={handleDeleteFromTail}
            disabled={!!loading}
            isLoader={loading === Buttons.deleteFromTail}
            data-testid="button-delete-from-tail"
          />
        </div>
        <div className={`${styles.form_with_index}`}>
          <Input
            placeholder="Введите индекс"
            extraClass='default'
            type="number"
            max={list.length - 1}
            id="message-input"
            name="index"
            onChange={handleChange}
            value={values.index}
            data-testid="input-index"
          />
          <Button
            text='Добавить по индексу'
            extraClass='default'
            type="button"
            linkedList="big"
            onClick={handleAddByIndex}
            disabled={!values.index || !!loading || +values.index > list.length - 1 || +values.index < 0}
            isLoader={loading === Buttons.addByIndex}
            data-testid="button-add-by-index"
          />
          <Button
            text='Удалить по индексу'
            extraClass='default'
            type="button"
            linkedList="big"
            onClick={handleDeleteByIndex}
            disabled={!values.index || !!loading || +values.index > list.length - 1 || +values.index < 0}
            isLoader={loading === Buttons.deleteByIndex}
            data-testid="button-delete-by-index"
          />
        </div>
      </form>
      <div className={`${styles.list}`}>
        {list.map((value, index) => (
          <div key={index} className={`${styles.result}`}>
            <div className={`${styles.circles_added}`} data-testid="circle-added">
              {currentQueueElement && currentQueueElement.currentAddIndex === index && (
                <Circle isSmall state={ElementStates.Changing} letter={values.value} />
              )}
            </div>
            <div className={`${styles.circles_main}`} data-testid="string-result">
              <Circle
                head={index === 0 && (!currentQueueElement || currentQueueElement.currentAddIndex !== 0) ? 'head' : undefined}
                tail={index === list.length - 1 && (!currentQueueElement || currentQueueElement.currentDeleteIndex !== list.length - 1) ? 'tail' : undefined}
                letter={value}
                index={index}
                state={getState(index)} />
              <ArrowIcon fill={index === list.length - 1 ? 'none' : undefined} />
            </div>
            <div className={`${styles.circles_removed}`} data-testid="circle-removed" >
              {currentQueueElement && currentQueueElement.currentDeleteIndex === index && (
                <Circle isSmall state={ElementStates.Changing} letter={value} />
              )}
            </div>
          </div>
        ))}
      </div>
    </SolutionLayout>
  )
}

// (!+values.index || +values.index === index)
import React, { useState, ChangeEvent, useRef, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './list-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from './linked-list';

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
  const [changingElements, setChangingElements] = useState<Queue[]>([]);
  const linkedListRef = useRef<LinkedList<string>>(new LinkedList<string>(['1', '3', '5', '8']));
  const [currentQueueElement, setCurrentQueueElement] = useState<Queue | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');

  const list = useMemo(() => linkedListRef.current.list(), [renderListNumber]);

  const handleChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(event.target.value)
  }

  const handleAddValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const runShiftInterval = () => {
    const shiftItem = () => {
      const item = queueRef.current.shift();
      if (item) {
        setCurrentQueueElement(item);
        setChangingElements((items) => [...items, item]);
      } else {
        setCurrentQueueElement(null);
        setChangingElements([]);
        setInputIndex('');
        setInputValue('');
        setRenderListNumber((renderListNumber) => renderListNumber + 1);
        clearInterval(intervalId);
        setLoading(null);
      }
    };
    const intervalId = setInterval(shiftItem, TIMEOUT);
  }

  const handleAddByIndex = () => {
    if (inputIndex) {
      const maxIndex = +inputIndex;
      linkedListRef.current.addAtIndex(maxIndex, inputValue, (index: number) => {
        queueRef.current.push({ currentAddIndex: index, modifiedIndex: index === maxIndex ? index : null });
      });
      setLoading(Buttons.addByIndex);
      runShiftInterval();
    }
  }

  const handleDeleteByIndex = () => {
    if (inputIndex) {
      const maxIndex = +inputIndex;
      linkedListRef.current.delete(maxIndex, (index: number) => {
        queueRef.current.push({ currentDeleteIndex: index, modifiedIndex: index === maxIndex ? index : null });
      });
      setLoading(Buttons.deleteByIndex);
      runShiftInterval();
    }
  }

  const handleAddToHead = () => {
    linkedListRef.current.prepend(inputValue);
    queueRef.current.push({ currentAddIndex: 0, modifiedIndex: 0 });
    setLoading(Buttons.addToHead);
    runShiftInterval();
  }

  const handleDeleteFromHead = () => {
    linkedListRef.current.delete(0);
    queueRef.current.push({ currentDeleteIndex: 0, modifiedIndex: 0 });
    setLoading(Buttons.deleteFromHead);
    runShiftInterval();
  }

  const handleAddToTail = () => {
    linkedListRef.current.append(inputValue);
    queueRef.current.push({ currentAddIndex: list.length - 1, modifiedIndex: list.length - 1 });
    setLoading(Buttons.addToTail);
    runShiftInterval();
  }

  const handleDeleteFromTail = () => {
    linkedListRef.current.delete(list.length - 1);
    queueRef.current.push({ currentDeleteIndex: list.length - 1, modifiedIndex: list.length - 1 });
    setLoading(Buttons.deleteFromTail);
    runShiftInterval();
  }

  const getState = (index: number) => {
    if (currentQueueElement && currentQueueElement.modifiedIndex !== null && index === currentQueueElement.modifiedIndex) {
      return ElementStates.Modified;
    }
    if (changingElements.length && changingElements.find(({ currentAddIndex, currentDeleteIndex }) => currentAddIndex === index || currentDeleteIndex === index)) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={`${styles.form}`}>
        <Input
          placeholder="Введите значение"
          extraClass='default'
          maxLength={4}
          isLimitText
          type="text"
          id="message"
          name="message"
          value={inputValue}
          onChange={handleAddValue}
        >
        </Input>
        <Button
          text='Добавить в head'
          extraClass='default'
          type="button"
          linkedList="small"
          onClick={handleAddToHead}
          disabled={!inputValue || !!loading}
          isLoader={loading === Buttons.addToHead}
        />
        <Button
          text='Добавить в tail'
          extraClass='default'
          type="button"
          linkedList="small"
          onClick={handleAddToTail}
          disabled={!inputValue || !!loading}
          isLoader={loading === Buttons.addToTail}
        />
        <Button
          text='Удалить из head'
          extraClass='default'
          type="button"
          linkedList="small"
          onClick={handleDeleteFromHead}
          disabled={!!loading}
          isLoader={loading === Buttons.deleteFromHead}
        />
        <Button
          text='Удалить из tail'
          extraClass='default'
          type="button"
          linkedList="small"
          onClick={handleDeleteFromTail}
          disabled={!!loading}
          isLoader={loading === Buttons.deleteFromTail}
        />
      </form>
      <form className={`${styles.form}`}>
        <Input
          placeholder="Введите индекс"
          extraClass='default'
          type="text"
          id="message-input"
          name="message-input"
          onChange={handleChangeIndex}
          value={inputIndex}>
        </Input>
        <Button
          text='Добавить по индексу'
          extraClass='default'
          type="button"
          linkedList="big"
          onClick={handleAddByIndex}
          disabled={!inputIndex || !!loading}
          isLoader={loading === Buttons.addByIndex}
        />
        <Button
          text='Удалить по индексу'
          extraClass='default'
          type="button"
          linkedList="big"
          onClick={handleDeleteByIndex}
          disabled={!inputIndex || !!loading}
          isLoader={loading === Buttons.deleteByIndex}
        />
      </form>
      <div className={`${styles.list}`}>
        {list.map((value, index) => (
          <div key={index} className={`${styles.result}`}>
            <div className={`${styles.circles_added}`}>
              {currentQueueElement && currentQueueElement.currentAddIndex === index && (
                <Circle isSmall state={ElementStates.Changing} letter={inputValue} />
              )}
            </div>
            <div className={`${styles.circles_main}`}>
              <Circle
                head={index === 0 && (!currentQueueElement || currentQueueElement.currentAddIndex !== 0) ? 'head' : undefined}
                tail={index === list.length - 1 && (!currentQueueElement || currentQueueElement.currentDeleteIndex !== list.length - 1) ? 'tail' : undefined}
                letter={value}
                index={index}
                state={getState(index)} />
              <ArrowIcon fill={index === list.length - 1 ? 'none' : undefined} />
            </div>
            <div className={`${styles.circles_removed}`}>
              {currentQueueElement && currentQueueElement.currentDeleteIndex === index && (!+inputIndex || +inputIndex === index) && (
                <Circle isSmall state={ElementStates.Changing} letter={value} />
              )}
            </div>
          </div>
        ))}
      </div>
    </SolutionLayout>
  )
}

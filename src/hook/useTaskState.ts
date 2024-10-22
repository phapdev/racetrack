import { useState, useEffect } from 'react';

export const useTaskState = (taskKey: string) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(taskKey);
    setIsCompleted(storedValue === 'true');
  }, [taskKey]);

  const completeTask = () => {
    setIsCompleted(true);
    localStorage.setItem(taskKey, 'true');
  };

  return { isCompleted, completeTask };
};

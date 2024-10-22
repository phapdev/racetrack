import React from 'react';
import { useTaskState } from '../../hook/useTaskState';
import { TwitterLink, Label, Input, Button } from './Dailytask.styled';
import { useTranslation } from 'react-i18next';
import TaskItem from './TaskItem';

interface TaskProps {
  taskKey: string;
  taskNumber: string;
  icon: string;
  twitterLink: string;
  onCheck: (task: string) => Promise<void>;
  twitterUsername: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const Task: React.FC<TaskProps> = ({
  taskKey,
  taskNumber,
  icon,
  twitterLink,
  onCheck,
  twitterUsername,
  onInputChange,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { isCompleted, completeTask } = useTaskState(taskKey);

  const handleCheck = async () => {
    await onCheck(taskKey);
    completeTask();
  };

  return (
    <TaskItem task={t(`daily-task.task-${taskNumber}`)} completed={isCompleted} icon={icon}>
      {t(`daily-task.task-${taskNumber}-desc`)}:{' '}
      <TwitterLink href={twitterLink} target="_blank" rel="noopener noreferrer">
        @Avail_Vietnam
      </TwitterLink>
      <Label htmlFor="twitterUsername">{t('daily-task.input-label')}</Label>
      <Input
        type="text"
        id="twitterUsername"
        value={twitterUsername}
        onChange={onInputChange}
        placeholder="@your_twitter_username"
      />
      <Button onClick={handleCheck} disabled={isLoading || isCompleted}>
        {isLoading
          ? t('daily-task.loading')
          : isCompleted
          ? t('daily-task.completed')
          : t('daily-task.check')}
      </Button>
    </TaskItem>
  );
};

import { useTranslation } from 'react-i18next';
import { Title } from './Dailytask.styled';

const TaskTwitter = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title>{t('daily-task.task-1')}</Title>
    </div>
  )
}

export default TaskTwitter;
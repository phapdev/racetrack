import React, { useState } from 'react';
import styled from 'styled-components';

const TaskItemContainer = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const TaskHeader = styled.div`
  cursor: pointer;
  padding: 5px;
  background-color: #f0e68c;
  border: 1px solid #8b4513;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskStatus = styled.span<{ completed: boolean }>`
  font-size: 20px;
  color: ${props => props.completed ? 'green' : 'red'};
`;

const TaskContent = styled.div`
  padding: 10px;
  background-color: #fffacd;
  border: 1px solid #8b4513;
  border-top: none;
  border-radius: 0 0 5px 5px;
`;

interface TaskItemProps {
  task: string;
  children: React.ReactNode;
  completed: boolean;
  icon: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, children, completed, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TaskItemContainer>
      <TaskHeader onClick={() => setIsOpen(!isOpen)}>
        <img src={icon} alt="" />
        {task}
        <TaskStatus completed={completed}>
          {completed ? '✓' : '✗'}
        </TaskStatus>
      </TaskHeader>
      {isOpen && <TaskContent>{children}</TaskContent>}
    </TaskItemContainer>
  );
};

export default TaskItem;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the card for a group of tasks
// The rendered structure looks like this:
//
// <message>
// <task_1>
// ...
// <task_n>

import React from 'react'
import { TaskCard } from '../models/Types';
import TaskComponent from './TaskComponent';

interface TaskCardProps {
  card: TaskCard;
}

const TaskCardComponent: React.FunctionComponent<TaskCardProps> = ({ card }) => {
  const hasMessage = card.message != null && card.message.length > 0;
  return (
    <div className="normal-text">
      { hasMessage ? <div className="my-3" dangerouslySetInnerHTML={{ __html: card.message }} /> : null}
      { card.tasks.length !== 0 ? 
        <>
          {card.tasks.map(task => (
            <TaskComponent task={task}/>
          ))}
        </> : null }
    </div>
  )
}

export default TaskCardComponent;
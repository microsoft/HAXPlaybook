// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the card for a task

import React from 'react'
import { TaskCard } from '../models/Types';

interface TaskCardProps {
  card: TaskCard;
}

const App: React.FunctionComponent<TaskCardProps> = ({ card }) => {
  const hasMessage = card.message != null && card.message.length > 0;
  return (
    <div className="normal-text">
      { hasMessage ? <div className="my-3" dangerouslySetInnerHTML={{ __html: card.message }} /> : null}
      { card.tasks.length !== 0 ? 
        <div>
          {card.tasks.map(task => (
            <div key={task.id} className="border-left border-primary px-4 py-1 my-4">
              <span className="bold-text">{task.name}</span>
              <div dangerouslySetInnerHTML={{ __html: task.details }} />
            </div>
          ))}
        </div> : null }
    </div>
  )
}

export default App;
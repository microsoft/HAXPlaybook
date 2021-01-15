// This component renders the card for a task

import React from 'react'
import { TaskCard } from '../models/Types';

interface TaskCardProps {
  card: TaskCard;
}

const App: React.FunctionComponent<TaskCardProps> = ({ card }) => {
  const hasMessage = card.message != null && card.message.length > 0;
  return (
    <React.Fragment>
      { hasMessage ? <div className="my-3" dangerouslySetInnerHTML={{ __html: card.message }} /> : null}
      { card.tasks.length !== 0 ? 
        <div>
          {card.tasks.map(task => (
            <div key={task.id} className="border-left border-primary px-4 py-1 my-4">
              <h3>{task.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: task.details }} />
            </div>
          ))}
        </div> : null }
    </React.Fragment>
  )
}

export default App;
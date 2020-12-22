import React from 'react'
import { TaskCard } from './Types';

interface TaskCardProps {
  card: TaskCard;
}

const App: React.FunctionComponent<TaskCardProps> = ({ card }) => {
  const hasMessage = card.message != null && card.message.length > 0;
  return (
    <React.Fragment>
      { hasMessage ? <div className="mt-3 mx-3" dangerouslySetInnerHTML={{ __html: card.message }} /> : null }
      <div className="container">
        {card.tasks.map(task => (
          <div id={task.id} className="card bg-light my-3 p-3">
            <h4 className="card-title">{task.name}</h4>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: task.details }} />
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default App;
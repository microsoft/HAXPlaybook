import React from 'react'
import { TaskCard } from './Types';

interface TaskCardProps {
  card: TaskCard;
}

const App: React.FunctionComponent<TaskCardProps> = ({ card }) => {
  const hasMessage = card.message != null && card.message.length > 0;
  return (
    <React.Fragment>
      { hasMessage ? <div className="m-3" dangerouslySetInnerHTML={{ __html: card.message }} /> : null}
      { card.tasks.length !== 0 ? 
        <div className="container">
          {card.tasks.map(task => (
            <div key={task.id} className="card bg-light my-3 p-3">
              <h4 className="card-title">{task.name}</h4>
              <div className="card-text" dangerouslySetInnerHTML={{ __html: task.details }} />
            </div>
          ))}
        </div> : null }
    </React.Fragment>
  )
}

export default App;
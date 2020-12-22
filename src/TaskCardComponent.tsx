import React from 'react'
import { TaskCard } from './Types';

interface TaskCardProps {
  card: TaskCard;
}

const App: React.FunctionComponent<TaskCardProps> = ({ card }) => {
  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{ __html: card.message }} />
      {card.tasks.map(task => (
        <div id={task.id}>
          <h4>{task.name}</h4>
          <div dangerouslySetInnerHTML={{ __html: task.details }} />
        </div>
      ))}
    </React.Fragment>
  )
}

export default App;
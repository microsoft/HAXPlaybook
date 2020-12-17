import React from 'react'
import { TaskCard } from './Types';

interface TaskProps {
  tasks: TaskCard[];
}

const App: React.FunctionComponent<TaskProps> = ({ tasks }) => {
  const _this = this;
  return (
    <React.Fragment>
      {tasks.map(card => (
        <div>
          <h3>{card.title}</h3>
          {card.tasks.map(task => (
            <div>
              <h4>{task.name}</h4>
              <div dangerouslySetInnerHTML={{ __html: task.details }} />
            </div>
          ))}
        </div>
      ))}
    </React.Fragment>
  )
}

export default App;
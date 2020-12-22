import React from 'react'
import TaskCardComponent from './TaskCardComponent';
import { TaskCard } from './Types';

interface TaskListProps {
  taskMap: Map<string, TaskCard>;
}

const App: React.FunctionComponent<TaskListProps> = ({ taskMap }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <React.Fragment>
      {categories.map(category => (
        <div key={category}>
          <h3>{category}</h3>
          <TaskCardComponent card={taskMap.get(category) as TaskCard}/>
        </div>
      ))}
    </React.Fragment>
  )
}

export default App;
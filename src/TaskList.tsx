import React from 'react'
import TaskCardComponent from './TaskCardComponent';
import { TaskCard } from './Types';

interface TaskListProps {
  taskMap: Map<string, TaskCard[]>;
}

const App: React.FunctionComponent<TaskListProps> = ({ taskMap }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <div className="container">
      {categories.map(category => (
        <div key={category} className="card mb-3">
          <h3 className="card-header">{category}</h3>
          {taskMap.get(category)?.map(tc => <TaskCardComponent key={tc.id} card={tc} /> )}
        </div>
      ))}
    </div>
  )
}

export default App;
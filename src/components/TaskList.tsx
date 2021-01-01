// This component renders the list of all task cards from the survey results

import React from 'react'
import TaskCardComponent from './TaskCardComponent';
import { TaskCard } from '../models/Types';

interface TaskListProps {
  taskMap: Map<string, TaskCard[]>;
}

const App: React.FunctionComponent<TaskListProps> = ({ taskMap }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <div>
      {categories.map(category => (
        <React.Fragment>
          <h1 style={{marginTop: "2.5rem"}}>{category}</h1>
          {taskMap.get(category)?.map(tc => <TaskCardComponent key={tc.id} card={tc} /> )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default App;
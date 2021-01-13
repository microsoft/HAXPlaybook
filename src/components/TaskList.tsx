// This component renders the list of all task cards from the survey results

import React from 'react'
import { TaskCard } from '../models/Types';
import CollapsibleSection from './CollapsibleSection';

interface TaskListProps {
  taskMap: Map<string, TaskCard[]>,
  title: string,
  message: string
}

const TaskList: React.FunctionComponent<TaskListProps> = ({ taskMap, title, message }) => {
  const categories = Array.from(taskMap.keys());
  const numTasks = categories.length === 0 ? 0 :
                     categories.map(category => taskMap.get(category) as TaskCard[])
                       .flat()
                       .map(card => card.tasks)
                       .map(tasks => tasks.length)
                       .reduce((prev, n) => prev + n);
  return (
    <React.Fragment>
      <div className="my-3" style={{ display: "flex", flexDirection: "row" }}>
        <h1>{title}</h1>
        <div className="circle-text circle-text-large ml-3" style={{ backgroundColor: "blue", color: "white" }}>
          <h1>{numTasks}</h1>
        </div>
      </div>
      <div>
        {message}
      </div>
      <div className="row mt-2 justify-content-end">
        <button onClick={() => window.print()} className="btn btn-primary">Download Report</button>
      </div>
      {categories.map(category => (
        <CollapsibleSection taskMap={taskMap} category={category}/>
      ))}
    </React.Fragment>
  )
}

export default TaskList;
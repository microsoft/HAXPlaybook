import React from 'react'
import { TaskCard } from '../models/Types';

interface TaskHeaderProps {
  taskMap: Map<string, TaskCard[]>,
  title: string,
}

const TaskHeader: React.FunctionComponent<TaskHeaderProps> = ({ taskMap, title }) => {
  const categories = Array.from(taskMap.keys());
  const numTasks = categories.length === 0 ? 0 :
                     categories.map(category => taskMap.get(category) as TaskCard[])
                       .flat()
                       .map(card => card.tasks)
                       .map(tasks => tasks.length)
                       .reduce((prev, n) => prev + n);
  return (
    <React.Fragment>
      <div className="my-3 column-header" >
        <span>{title}</span>
        <div className="circle-text circle-text-large">
          {numTasks}
        </div>
      </div>
    </React.Fragment>
  )
}

export default TaskHeader;
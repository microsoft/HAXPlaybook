// This component renders the list of all task cards from the survey results

import React from 'react'
import { TaskCard } from '../models/Types';
import CollapsibleSection from './CollapsibleSection';

interface TaskListProps {
  taskMap: Map<string, TaskCard[]>
}

const TaskList: React.FunctionComponent<TaskListProps> = ({ taskMap }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <React.Fragment>
      {categories.map(category => (
        <CollapsibleSection taskMap={taskMap} category={category}/>
      ))}
    </React.Fragment>
  )
}

export default TaskList;
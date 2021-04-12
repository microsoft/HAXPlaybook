// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the list of all task cards from the survey results

import React from 'react'
import { TaskCard } from '../models/Types';
import CollapsibleSection from './CollapsibleSection';

interface TaskListProps {
  taskMap: Map<string, TaskCard[]>,
  isHighContrast: boolean
}

const TaskList: React.FunctionComponent<TaskListProps> = ({ taskMap, isHighContrast }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <div className="task-list" >
      {categories.map(category => (
        <CollapsibleSection key={category} taskMap={taskMap} category={category} isHighContrast={isHighContrast}/>
      ))}
    </div>
  )
}

export default TaskList;
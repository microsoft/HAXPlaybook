// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react'
import { Task } from '../models/Types'
import { BsFillCaretRightFill, BsFillCaretDownFill } from 'react-icons/bs';

interface TaskProps {
  task: Task,
  isHighContrast: boolean
}

const TaskComponent: React.FunctionComponent<TaskProps> = ({ task, isHighContrast }) => {
  const [isExpanded, setExpanded] = useState(true);
  const highContrastColor = isHighContrast ? "#FFFFFF" : "#000000";
  return (
    <div key={task.id} className="task-card">
      <button aria-label={`Show or hide ${task.name} task details`} className="task-header-button" onClick={() => setExpanded(!isExpanded)}>
        <span className="task-header-caret">{isExpanded ? <BsFillCaretDownFill aria-label="down arrow" color={highContrastColor}/> : <BsFillCaretRightFill aria-label="right arrow" color={highContrastColor}/>}</span>
        <h5 className="task-header-text">{task.name}</h5>
      </button>
      {isExpanded ? <div dangerouslySetInnerHTML={{ __html: task.details }} /> : null}
    </div>
  )
}

export default TaskComponent;
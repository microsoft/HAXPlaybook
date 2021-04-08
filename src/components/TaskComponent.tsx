// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react'
import { Task } from '../models/Types'
import { BsFillCaretRightFill, BsFillCaretDownFill } from 'react-icons/bs';

interface TaskProps {
  task: Task;
}

const TaskComponent: React.FunctionComponent<TaskProps> = ({ task }) => {
  const [isExpanded, setExpanded] = useState(true);
  return (
    <div key={task.id} className="task-card">
      <button name={`Show or hide ${task.name} task details`} className="task-header-button" onClick={() => setExpanded(!isExpanded)}>
        <span className="task-header-caret">{isExpanded ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}</span>
        <span className="task-header-text">{task.name}</span>
      </button>
      {isExpanded ? <div dangerouslySetInnerHTML={{ __html: task.details }} /> : null}
    </div>
  )
}

export default TaskComponent;
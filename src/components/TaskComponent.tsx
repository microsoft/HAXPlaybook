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
    <div key={task.id} className="task-card" onClick={() => setExpanded(!isExpanded)}>
      <span style={{fontSize: "0.88rem"}}>{isExpanded ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}</span>
      <span className="bold-text ml-1">{task.name}</span>
      {isExpanded ? <div dangerouslySetInnerHTML={{ __html: task.details }} /> : null}
    </div>
  )
}

export default TaskComponent;
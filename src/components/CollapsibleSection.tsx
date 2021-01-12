
import React, { useState } from 'react';
import { TaskCard } from '../models/Types';
import TaskCardComponent from './TaskCardComponent';
import { BsFillCaretRightFill, BsFillCaretDownFill } from 'react-icons/bs';

interface CollapsibleSectionProps {
  taskMap: Map<string, TaskCard[]>;
  category: string;
}

const CollapsibleSection: React.FunctionComponent<CollapsibleSectionProps> = ({ taskMap, category }) => {
  const [isExpanded, setExpanded] = useState(true);
  const numTasks = taskMap.get(category)?.map(task => task.tasks.length).reduce((prev, n) => prev + n);
  return (
    <React.Fragment>
      <div className="scenario-section-header" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
        <span style={{ marginLeft: "0.5em" }}>{category}</span>
        <div className="circle-text circle-text-small" style={{ marginLeft: "0.75em", backgroundColor: "white" }}>
          {numTasks}
        </div>
      </div>
      {isExpanded ? taskMap.get(category)?.map(tc => <TaskCardComponent key={tc.id} card={tc} />) : null}
    </React.Fragment>
  )
}

export default CollapsibleSection;
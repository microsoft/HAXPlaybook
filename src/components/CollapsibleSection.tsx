
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
  const numTasks = taskMap.get(category)?.map(task => task.tasks.length).reduce((prev, n) => prev + n) ?? 0;
  const hasMessage = taskMap.get(category)?.find(tc => !!tc.message) != null;
  // If there are no tasks and there's no message for the category, then render nothing
  return (numTasks > 0 || hasMessage) ? (
    <React.Fragment>
      <div className="scenario-bar my-3" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
        <span className="scenario-bar-text">{category}</span>
        <div className="circle-text circle-text-small">
          {numTasks}
        </div>
      </div>
      {isExpanded ? taskMap.get(category)?.map(tc => <TaskCardComponent key={tc.id} card={tc} />) : null}
    </React.Fragment>
  ) : null;
}

export default CollapsibleSection;
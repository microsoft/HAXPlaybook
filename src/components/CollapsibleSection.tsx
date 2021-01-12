
import React, { useState } from 'react'
import { TaskCard } from '../models/Types';
import TaskCardComponent from './TaskCardComponent';

interface CollapsibleSectionProps {
  taskMap: Map<string, TaskCard[]>;
  category: string;
}

const CollapsibleSection: React.FunctionComponent<CollapsibleSectionProps> = ({ taskMap, category }) => {
  const [isExpanded, setExpanded] = useState(true);
  return (
    <React.Fragment>
      <div className="scenario-section-header">
        <i className="bi bi-arrow-down"></i>{category}
        <div className="circle-text circle-text-small" style={{ marginLeft: "1rem", backgroundColor: "#73c7ff" }}>
          {taskMap.get(category)?.map(task => task.tasks.length).reduce((prev, n) => prev + n)}
        </div>
      </div>
      {taskMap.get(category)?.map(tc => <TaskCardComponent key={tc.id} card={tc} />)}
    </React.Fragment>
  )
}

export default CollapsibleSection;
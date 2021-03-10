// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import { TaskCard } from '../models/Types';
import TaskCardComponent from './TaskCardComponent';
import { BsFillCaretRightFill, BsFillCaretDownFill } from 'react-icons/bs';
import { getCategorySectionId } from '../util/Utils'

interface CollapsibleSectionProps {
  taskMap: Map<string, TaskCard[]>;
  category: string;
}

const CollapsibleSection: React.FunctionComponent<CollapsibleSectionProps> = ({ taskMap, category }) => {
  const [isExpanded, setExpanded] = useState(true);
  const tasks = TaskCard.filterTasks(taskMap.get(category) ?? []);
  const numTasks = tasks.map(task => task.tasks.length).reduce((prev, n) => prev + n) ?? 0;
  const hasMessage = tasks.find(tc => !!tc.message) != null;
  // If there are no tasks and there's no message for the category, then render nothing
  return (numTasks > 0 || hasMessage) ? (
    <React.Fragment>
      <div id={getCategorySectionId(category)} className="scenario-bar my-3" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
        <span className="scenario-bar-text">{category}</span>
      </div>
      {isExpanded ? tasks.map(tc => <TaskCardComponent key={tc.id} card={tc} />) : null}
    </React.Fragment>
  ) : null;
}

export default CollapsibleSection;
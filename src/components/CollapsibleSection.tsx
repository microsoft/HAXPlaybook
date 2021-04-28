// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import { TaskCard } from '../models/Types';
import TaskCardComponent from './TaskCardComponent';
import { BsFillCaretRightFill, BsFillCaretDownFill } from 'react-icons/bs';
import { getCategorySectionId } from '../util/Utils'

interface CollapsibleSectionProps {
  taskMap: Map<string, TaskCard[]>,
  category: string,
  isHighContrast: boolean
}

const CollapsibleSection: React.FunctionComponent<CollapsibleSectionProps> = ({ taskMap, category, isHighContrast }) => {
  const [isExpanded, setExpanded] = useState(true);
  const tasks = TaskCard.filterTasks(taskMap.get(category) ?? []);
  const numTasks = tasks.map(task => task.tasks.length).reduce((prev, n) => prev + n) ?? 0;
  const hasMessage = tasks.find(tc => !!tc.message) != null;
  const highContrastBorder = isHighContrast ? "solid white 1px" : "";
  const highContrastColor = isHighContrast ? "#FFFFFF" : "#000000";
  // If there are no tasks and there's no message for the category, then render nothing
  return (numTasks > 0 || hasMessage) ? (
    <React.Fragment>
      <button id={getCategorySectionId(category)} className="scenario-bar my-3" aria-label={`Expand or collapse ${category} section`} onClick={() => setExpanded(!isExpanded)} style={{border: highContrastBorder}}>
        {isExpanded ? <BsFillCaretDownFill aria-label="down arrow" color={highContrastColor}/> : <BsFillCaretRightFill aria-label="right arrow" color={highContrastColor}/>}
        <h4 className="scenario-bar-text">{category}</h4>
      </button>
      {isExpanded ? tasks.map(tc => <TaskCardComponent key={tc.id} card={tc} isHighContrast={isHighContrast}/>) : null}
    </React.Fragment>
  ) : null;
}

export default CollapsibleSection;
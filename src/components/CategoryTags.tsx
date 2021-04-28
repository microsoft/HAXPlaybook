// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the card for a task

import React from 'react'
import { TaskCard } from '../models/Types';

interface CategoryTagsProps {
  taskMap: Map<string, TaskCard[]>,
  onClick: (category: string) => void,
  isHighContrast: boolean
}

const CategoryTags: React.FunctionComponent<CategoryTagsProps> = ({ taskMap, onClick, isHighContrast }) => {
  const categories = Array.from(taskMap.keys());
  const highContrastBorder = isHighContrast ? "solid white 1px" : "";
  return (
    <>
      {categories.map(category => {
        const tasks = TaskCard.filterTasks(taskMap.get(category) ?? []);
        const numTasks = tasks.map(task => task.tasks.length).reduce((prev, n) => prev + n) ?? 0;
        return (
          <button aria-label={`Go to ${category} scenarios`} className="category-tag" onClick={() => onClick(category)} style={{border: highContrastBorder}}>
            <div style={{display: "inline-block", marginTop: "-5px"}}>{category}</div>
            <div className="circle-text circle-text-small" aria-label={`Number of ${category} scenarios`} style={{border: highContrastBorder}}>{numTasks}</div>
          </button>
        )
      })}
    </>
  )
}

export default CategoryTags;
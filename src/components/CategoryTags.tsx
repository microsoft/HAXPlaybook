// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the card for a task

import React from 'react'
import { TaskCard } from '../models/Types';

interface CategoryTagsProps {
  taskMap: Map<string, TaskCard[]>,
  onClick: (category: string) => void
}

const CategoryTags: React.FunctionComponent<CategoryTagsProps> = ({ taskMap, onClick }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <>
      {categories.map(category => {
        const tasks = TaskCard.filterTasks(taskMap.get(category) ?? []);
        const numTasks = tasks.map(task => task.tasks.length).reduce((prev, n) => prev + n) ?? 0;
        return (
          <button name={`Show or hide ${category} tasks`} className="category-tag" onClick={() => onClick(category)}>
            <div style={{display: "inline-block", marginTop: "-5px"}}>{category}</div>
            <div className="circle-text circle-text-small">{numTasks}</div>
          </button>
        )
      })}
    </>
  )
}

export default CategoryTags;
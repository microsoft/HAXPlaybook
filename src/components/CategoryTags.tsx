// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the card for a task

import React from 'react'
import { TaskCard } from '../models/Types';

interface CategoryTagsProps {
  taskMap: Map<string, TaskCard[]>
}

const CategoryTags: React.FunctionComponent<CategoryTagsProps> = ({ taskMap }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <>
      {categories.map(category => {
        const tasks = TaskCard.filterTasks(taskMap.get(category) ?? []);
        const numTasks = tasks.map(task => task.tasks.length).reduce((prev, n) => prev + n) ?? 0;
        return (<div className="category-tag"><span>{category}</span><div className="circle-text circle-text-small">{numTasks}</div></div>)
      })}
    </>
  )
}

export default CategoryTags;
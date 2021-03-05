// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the card for a task

import React from 'react'
import { TaskCard } from '../models/Types';

interface CategoryListProps {
  taskMap: Map<string, TaskCard[]>
}

const App: React.FunctionComponent<CategoryListProps> = ({ taskMap }) => {
  const categories = Array.from(taskMap.keys());
  return (
    <>
      {categories.map(category => (
        <div className="category-tag">{category}</div>
      ))}
    </>
  )
}

export default App;
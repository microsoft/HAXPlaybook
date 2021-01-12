// This component renders the list of all task cards from the survey results

import React from 'react'
import { TaskCard } from '../models/Types';
import CollapsibleSection from './CollapsibleSection';

interface TaskListProps {
  taskMap: Map<string, TaskCard[]>;
}

const TaskList: React.FunctionComponent<TaskListProps> = ({ taskMap }) => {
  const categories = Array.from(taskMap.keys());
  const numTasks = categories.length === 0 ? 0 :
                     categories.map(category => taskMap.get(category) as TaskCard[])
                       .flat()
                       .map(card => card.tasks)
                       .map(tasks => tasks.length)
                       .reduce((prev, n) => prev + n);
  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
        <h1>RECOMMENDED SCENARIOS TO TEST</h1>
        <div className="circle-text circle-text-large" style={{ marginLeft: "1rem", backgroundColor: "blue", color: "white" }}>
          <h1>{numTasks}</h1>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique in nisl eget ornare. Sed laoreet erat at iaculis tristique. Praesent pharetra lectus a efficitur elementum. In at nulla vel sapien molestie pretium. Pellentesque ullamcorper ullamcorper nulla, non dignissim mi faucibus ut. Duis sodales molestie quam, quis laoreet neque. Nulla aliquet tristique purus, ut posuere est tincidunt sed.
        Phasellus finibus metus sit amet purus finibus, id rutrum augue tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed ex a nunc faucibus pulvinar quis id mauris. Praesent eget eros rutrum, varius tellus quis, rhoncus purus. Cras pellentesque est sit amet mollis aliquam. In hac habitasse platea dictumst. Proin euismod, felis sit amet cursus auctor, orci nulla sollicitudin ex, et suscipit mauris dolor quis purus. Integer vel odio in felis laoreet interdum quis at dui. Mauris placerat sapien et leo efficitur pretium.
      </div>
      {categories.map(category => (
        <CollapsibleSection taskMap={taskMap} category={category}/>
      ))}
    </React.Fragment>
  )
}

export default TaskList;
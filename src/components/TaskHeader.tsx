import React from 'react'

interface TaskHeaderProps {
  title: string,
}

const TaskHeader: React.FunctionComponent<TaskHeaderProps> = ({ title }) => {
  return (
    <React.Fragment>
      <div className="my-3 column-header" >
        <span>{title}</span>
      </div>
    </React.Fragment>
  )
}

export default TaskHeader;
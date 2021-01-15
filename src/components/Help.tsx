// This component renders the help cards shown below the survey

import React from 'react'

interface HelpProps {
}

const App: React.FunctionComponent<HelpProps> = ({ }) => {
  return null;
  /*
  return (
    <React.Fragment>
      {card.topics.map(topic => (
        <div key={topic.id}
          className={"card " + (topic.level === "info" ? "border-primary" : "border-warning")}
          style={{ width: "25rem", padding: "1rem", margin: "0.5rem" }}>
          <h4 className="card-title">{topic.name}</h4>
          <div className="card-text" dangerouslySetInnerHTML={{ __html: topic.details }} />
        </div>
      ))}
    </React.Fragment>
  )
  */
}

export default App;
import React from 'react'
import { HelpCard } from './Types';

interface HelpProps {
  card: HelpCard;
}

const App: React.FunctionComponent<HelpProps> = ({card}) => {
  return (
    <div className="container">
      <div className="row">
        {card.topics.map(topic => (
          <div key={topic.id} className="card" style={{width: "25rem", padding: "1rem", margin: "0.5rem"}}>
            <h4 className="card-title">{topic.name}</h4>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: topic.details }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
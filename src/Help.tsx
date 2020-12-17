import React from 'react'
import { HelpCard } from './Types';

interface HelpProps {
  card: HelpCard;
}

const App: React.FunctionComponent<HelpProps> = ({card}) => {
  return (
    <React.Fragment>
      {card.topics.map(topic => (
        <div>
          <h4>{topic.name}</h4>
          <span>{topic.details}</span>
          <span>{topic.level}</span>
        </div>
      ))}
    </React.Fragment>
  )
}

export default App;
import React from 'react';
import contentData from './data/content.json';

interface IntroProps {
  onStartClick(): void
}

const Intro: React.FunctionComponent<IntroProps> = ({ onStartClick }) => {
  // Should the button text be customizable?
  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{ __html: contentData.introduction }} />
      <button className="btn btn-primary" onClick={onStartClick}>Start</button>
    </React.Fragment>
  );
}

export default Intro;
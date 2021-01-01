// This component renders the introduction page for the survey, including
// a message and a button to start the survey.

import React from 'react';
import contentData from '../data/content.json';

interface IntroProps {
  onStartClick(): void
}

const Intro: React.FunctionComponent<IntroProps> = ({ onStartClick }) => {
  return (
    <div className="my-5">
      <div dangerouslySetInnerHTML={{ __html: contentData.introduction }} />
      <button className="btn btn-primary" onClick={onStartClick}>Start</button>
    </div>
  );
}

export default Intro;
// This component renders a message shown at the end of the survey,
// a button to restart the survey, and a button to print out the results.

import React, { FunctionComponent } from 'react';
import contentData from '../data/content.json';

interface SurveyCompletionMessageProps {
  onRestartClick(): void,
}

const SurveyCompletionMessage: FunctionComponent<SurveyCompletionMessageProps> = ({ onRestartClick }) => {
  return (
    <div className="container mt-5 mb-3 pb-5 border-bottom">
      <div className="row" dangerouslySetInnerHTML={{ __html: contentData.farewell }} />
      <div className="row justify-content-center">
        <button className="btn btn-primary mr-3" onClick={onRestartClick}>Revisit AI Playbook</button>
        <button onClick={() => window.print()} className="btn btn-primary">Download Report</button>
      </div>
    </div>
  );
}

export default SurveyCompletionMessage;
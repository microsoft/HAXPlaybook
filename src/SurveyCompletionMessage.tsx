import React, { FunctionComponent } from 'react';
import contentData from './data/content.json';

interface SurveyCompletionMessageProps {
  onRestartClick(): void,
}

const SurveyCompletionMessage: FunctionComponent<SurveyCompletionMessageProps> = ({ onRestartClick }) => {
  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{ __html: contentData.farewell }} />
      <div className="mb-3">
        <button className="btn btn-primary mr-3" onClick={onRestartClick}>&nbsp;Revisit AI Playbook</button>
        <button onClick={() => window.print()} className="btn btn-primary">&nbsp;Download Report</button>
      </div>
    </React.Fragment>
  );
}

export default SurveyCompletionMessage;
import React, { FunctionComponent } from 'react';

interface SurveyCompletionMessageProps {
  onRestartClick(): void,
}

const SurveyCompletionMessage: FunctionComponent<SurveyCompletionMessageProps> = ({onRestartClick}) => {
  return (
    <React.Fragment>
      <div id="surveyCompleted">
          <br/>
          <p><b>Thank you for using the AI Playbook!</b> You may access the live AI Playbook Report anytime.</p>
          <p>You may also return to the AI Playbook questionnaire to explore and revise your options. Once you are done, you may download a pdf version of the latest report.</p><br/>
          <p><button id="revisitPlaybook" className="btn btn-primary" onClick={onRestartClick}><i className="fa fa-undo" aria-hidden="true"></i>&nbsp;Revisit AI Playbook</button>&ensp;
          <button id="viewReport" className="btn btn-primary" type="button"><i className="fa fa-book" aria-hidden="true"></i>&nbsp;View Full Report</button>&ensp;
          <button id="downloadReport" onClick={() => window.print()} className="btn btn-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i>&nbsp;Download Report</button></p>
      </div>
    </React.Fragment>
  );
}

export default SurveyCompletionMessage;
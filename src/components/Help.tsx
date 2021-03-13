// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the help cards shown below the survey

import React from 'react'
import { Modal } from 'react-bootstrap'
import { surveyModel } from '../App'
import { ConditionRunner } from 'survey-react'

interface HelpProps {
  name: string,
  examples: Array<any>
  show: boolean,
  onClose: () => void
}

function filterExamples(examples: Array<any>) {
  if (surveyModel) {
    const values = surveyModel.getAllValues();
    const properties = surveyModel.getFilteredProperties();
    return examples.filter(ex => new ConditionRunner(ex.visibleIf ?? "true").run(values, properties));
  } else {
    console.log("Could not filter examples because surveyModel is null");
    return examples;
  }
}

const App: React.FunctionComponent<HelpProps> = ({ name, examples, show, onClose }) => {
  const visibleExamples = filterExamples(examples);
  console.debug(`Filtered ${visibleExamples.length} visible examples out of ${examples.length} total examples for help=${name}`);
  const body = visibleExamples?.map((example, i) => {
    return (
      <>
        <h5>{example.name}</h5>
        <div dangerouslySetInnerHTML={{ __html: example.details }}></div>
        {i < visibleExamples.length-1 ? (<hr style={{ width: "100%", marginTop: "1.5em", marginBottom: "1.5em" }}/>) : null}
      </>
    )
  });

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name} examples</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <button className="blue-button" onClick={onClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
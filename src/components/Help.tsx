// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the help cards shown below the survey

import React from 'react'
import { Modal } from 'react-bootstrap'

interface HelpProps {
  name: string,
  examples: Array<any>
  show: boolean,
  onClose: () => void
}

const App: React.FunctionComponent<HelpProps> = ({ name, examples, show, onClose }) => {
  const body = examples?.map((example, i) => {
    return (
      <>
        <h5>{example.name}</h5>
        <div dangerouslySetInnerHTML={{ __html: example.details }}></div>
        {i < examples.length-1 ? (<hr style={{ width: "100%", marginTop: "1.5em", marginBottom: "1.5em" }}/>) : null}
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
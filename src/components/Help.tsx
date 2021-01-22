// This component renders the help cards shown below the survey

import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface HelpProps {
  name: string,
  examples: Array<any>
  show: boolean,
  onClose: () => void
}

const App: React.FunctionComponent<HelpProps> = ({ name, examples, show, onClose }) => {
  const body = examples?.map(example => {
    return (
      <>
        <h5>{example.name}</h5>
        <div dangerouslySetInnerHTML={{ __html: example.details }} className="mb-3"></div>
      </>
    )
  });

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react'
import { Modal } from 'react-bootstrap'

interface ExportDialogProps {
  show: boolean,
  onClose: Function,
  onCsvExport: Function,
  onGithubExport: Function,
  onPdfExport: Function,
  onLinkExport: Function
}

const ExportDialog: React.FunctionComponent<ExportDialogProps> = ({ show, onClose, onCsvExport, onGithubExport, onPdfExport, onLinkExport }) => {
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Export to:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Export</Modal.Body>
        <Modal.Footer>
          <button className="blue-button">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExportDialog;
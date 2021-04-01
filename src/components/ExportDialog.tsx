// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from 'react';
import { useState } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

const options = [
  {
    key: 'CSV',
    text: 'CSV',
  },
  {
    key: 'Github',
    text: 'Github',
  },
  {
    key: 'PDF',
    text: 'PDF',
  },
  {
    key: 'link',
    text: 'Shareable link'
  }
];
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Export to',
};

interface ExportDialogProps {
  show: boolean,
  onClose: Function,
  onCsvExport: Function,
  onGithubExport: Function,
  onPdfExport: Function,
  onLinkExport: Function
}

const ExportDialog: React.FunctionComponent<ExportDialogProps> = ({ show, onClose, onCsvExport, onGithubExport, onPdfExport, onLinkExport }) => {
  const [selectedKey, setSelectedKey] = useState("link");

  const onChange = React.useCallback((ev: React.SyntheticEvent<HTMLElement> | undefined, option: IChoiceGroupOption | undefined) => {
    if (option) {
      setSelectedKey(option.key);
    }
  }, []);

  function doExport() {
    onClose();
    if (selectedKey === "CSV") {
      onCsvExport();
    } else if (selectedKey === "Github") {
      onGithubExport();
    } else if (selectedKey === "PDF") {
      // This is timing sensitive - the page needs to re-render before we print it
      // to avoid printing the export dialog window
      setTimeout(onPdfExport, 250);
    } else if (selectedKey === "link") {
      onLinkExport();
    } else {
      console.error("Export - unknown selection");
    }
  }

  return (
    <>
      <Dialog
        hidden={!show}
        onDismiss={() => onClose()}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange} />
        <DialogFooter>
          <PrimaryButton onClick={() => doExport()} text="Confirm" />
          <DefaultButton onClick={() => onClose()} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ExportDialog;
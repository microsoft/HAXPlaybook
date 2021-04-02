// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

// FluentUI props
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Share your results',
};

interface LinkDialogProps {
  show: boolean,
  onClose: Function
}

const LinkDialog: React.FunctionComponent<LinkDialogProps> = ({ show, onClose }) => {
  return (
    <>
      <Dialog
        hidden={!show}
        onDismiss={() => onClose()}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <div className="mb-3">This link will contain the current survey answers.</div>
        <TextField defaultValue={window.location.toString()} />
        <DialogFooter>
          <PrimaryButton onClick={() => navigator.clipboard.writeText(window.location.toString())} text="Copy" />
          <DefaultButton onClick={() => onClose()} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default LinkDialog;
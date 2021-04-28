// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import Help from './Help';

interface HelpButtonProps {
  name: string,
  examples: Array<any>
}

const HelpButton: React.FunctionComponent<HelpButtonProps> = ({ name, examples }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <button aria-label={`show ${name} help`} style={{ backgroundColor: "transparent", width: "auto", minWidth: "20px", padding: "0px" }} onClick={() => setShowHelp(true)} >
        <BsFillQuestionCircleFill color="#6CCAFF" style={{ marginTop: "-3px" }} />
      </button>
      <Help name={name} examples={examples} show={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}

export default HelpButton;
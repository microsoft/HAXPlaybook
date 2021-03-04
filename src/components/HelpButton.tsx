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
      <BsFillQuestionCircleFill color="#00ECF2" style={{ cursor: 'pointer', marginTop: "-3px" }} onClick={() => setShowHelp(true)} />
      <Help name={name} examples={examples} show={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
}

export default HelpButton;
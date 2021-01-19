import React, { useState } from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import Help from './Help';

interface RadioDefinitionProps {
  name: string,
  definition: string,
  examples: Array<any>
}

const RadioDefinition: React.FunctionComponent<RadioDefinitionProps> = ({ name, definition, examples }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ marginLeft: "28px", marginTop: "-15px" }}>
      <div style={{ color: "#848b91", fontSize: "0.75rem", display: "inline" }} dangerouslySetInnerHTML={{ __html: definition }}></div>
      <Help name={name} examples={examples} show={showHelp} onClose={() => setShowHelp(false)} />
      <BsFillQuestionCircleFill style={{ cursor: 'pointer', marginLeft: "0.75em", marginTop: "-3px" }} onClick={() => setShowHelp(true)} />
    </div>);
}

export default RadioDefinition;
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
    <div style={{ marginLeft: "calc(1.75em + 3px)", marginTop: "-15px" }}>
      <div className="light-text" style={{display: "inline", fontSize: "0.85em", marginRight: "0.75em"}} dangerouslySetInnerHTML={{ __html: definition }}></div>
      <Help name={name} examples={examples} show={showHelp} onClose={() => setShowHelp(false)} />
      <BsFillQuestionCircleFill style={{ cursor: 'pointer', marginTop: "-3px" }} onClick={() => setShowHelp(true)} />
    </div>);
}

export default RadioDefinition;
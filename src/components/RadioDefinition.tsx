// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react'

interface RadioDefinitionProps {
  definition: string
}

const RadioDefinition: React.FunctionComponent<RadioDefinitionProps> = ({definition}) => {
  return (
    <div className="radio-definition">
      <div className="light-text" style={{ display: "inline", fontSize: "0.85em", marginRight: "0.75em" }} dangerouslySetInnerHTML={{ __html: definition }}></div>
    </div>);
}

export default RadioDefinition;
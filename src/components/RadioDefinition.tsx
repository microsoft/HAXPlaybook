// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react'

interface RadioDefinitionProps {
  definition: string
}

const RadioDefinition: React.FunctionComponent<RadioDefinitionProps> = ({definition}) => {
  return (
    <div className="radio-definition">
      <span className="light-text" aria-label="definition of survey choice" dangerouslySetInnerHTML={{ __html: definition }}></span>
    </div>);
}

export default RadioDefinition;
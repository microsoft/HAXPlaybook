// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react'

interface RadioDefinitionProps {
  definition: string
}

const RadioDefinition: React.FunctionComponent<RadioDefinitionProps> = ({definition}) => {
  return (
    <div className="radio-definition">
      <div className="light-text" dangerouslySetInnerHTML={{ __html: definition }}></div>
    </div>);
}

export default RadioDefinition;
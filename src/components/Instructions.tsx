// This component renders the instructions for the current survey question.
// If no instructions were provided, then nothing is rendered.

import React from 'react'

interface InstructionsProps {
  message: string
}

const Instructions: React.FunctionComponent<InstructionsProps> = ({ message }) => {
  if (message == null || message.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <h4>Instructions</h4>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

export default Instructions;
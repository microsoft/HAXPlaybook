// This component renders the instructions for the current survey question.
// If no instructions were provided, then nothing is rendered.

import React from 'react';

interface InstructionsProps {
  title: string,
  message: string
}

const Instructions: React.FunctionComponent<InstructionsProps> = ({ title, message }) => {
  if (message == null || message.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 mb-4">
      <h1 className="mb-3">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

export default Instructions;
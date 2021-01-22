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
    <>
    </>
  );
}

export default Instructions;
import React from 'react'

interface InstructionsProps {
  message: string
}

const Instructions: React.FunctionComponent<InstructionsProps> = ({ message }) => {
  if (message == null || message.length === 0) {
    return null;
  }

  return (
    <div style={{margin: "1rem"}}>
      <h4>Instructions</h4>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

export default Instructions;
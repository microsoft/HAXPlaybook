// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the introduction page for the survey, including
// a message and a button to start the survey.

import React from 'react';

interface IntroProps {
  introduction: string,
  onStartClick(): void
}

const Intro: React.FunctionComponent<IntroProps> = ({ introduction, onStartClick }) => {
  return (
    <div className="my-5">
      <div dangerouslySetInnerHTML={{ __html: introduction }} />
      <button className="btn btn-primary" onClick={onStartClick}>Start</button>
    </div>
  );
}

export default Intro;
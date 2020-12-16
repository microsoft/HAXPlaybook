import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './survey.min.css'
import { PageModel, QuestionRadiogroupModel, ReactSurveyModel, Survey } from 'survey-react';
import surveyJson from './data/survey.json';
import Intro from './Intro';
import SurveyCompletionMessage from './SurveyCompletionMessage';

interface SurveyChangedOptions {
  name: string,
  question: QuestionRadiogroupModel,
  value: string
}

interface SurveyCompleteOptions {
  showDataSaving: (text: string) => any,
  showDataSavingError: (text: string) => any,
  showDataSavingSuccess: (text: string) => any,
  showDataSavingClear: () => any,
  isCompleteOnTrigger: () => boolean
}

interface CurrentPageChangedOptions {
  oldCurrentPage: PageModel,
  newCurrentPage: PageModel,
  isNextPage: boolean,
  isPrevPage: boolean
}

function handleComplete(sender: ReactSurveyModel, options: SurveyCompleteOptions): void {
  console.log("Complete", sender, options);
  // Sends the survey back to the first page while keeping the response data
  sender.clear(false);
}

function handleCurrentPageChanged(sender: ReactSurveyModel, options: CurrentPageChangedOptions): void {
  console.log("CurrentPageChanged", sender, options);
}

function handleValueChanged(sender: ReactSurveyModel, options: SurveyChangedOptions): void {
  console.log("ValueChanged", sender, options);
}

const App: React.FunctionComponent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [surveyComplete, setSurveyComplete] = useState(false);

  const handleComplete = (sender: ReactSurveyModel, options: SurveyCompleteOptions): void => {
    console.log("Complete", sender, options);
    // Sends the survey back to the first page while keeping the response data
    sender.clear(false);
    setSurveyComplete(true);
  }

  if (showIntro) {
    return (
      <div className="App">
        <Intro onStartClick={() => setShowIntro(false)}/>
      </div>
    );
  } else if (!surveyComplete) {
    return (
      <div className="App">
        <Survey json={surveyJson} 
          onValueChanged={handleValueChanged}
          onCurrentPageChanged={handleCurrentPageChanged}
          onComplete={handleComplete}/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <SurveyCompletionMessage onRestartClick={() => setSurveyComplete(false)}/>
      </div>
    );
  }
}

export default App;

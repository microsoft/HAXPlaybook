import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './survey.min.css'
import { PageModel, QuestionRadiogroupModel, ReactSurveyModel, Survey } from 'survey-react';
import surveyData from './data/survey.json';
import Intro from './Intro';
import TaskList from './TaskList';
import Help from './Help';
import SurveyCompletionMessage from './SurveyCompletionMessage';
import { CurrentPageChangedOptions, HelpCard, SurveyChangedOptions, SurveyCompleteOptions, TaskCard } from './Types';

const App: React.FunctionComponent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [helpCard, setHelpCard] = useState(new HelpCard([]));
  const [taskMap, setTaskMap] = useState(new Map<string, TaskCard>());

  function logState() {
    console.log("STATE: showIntro=", showIntro, " surveyComplete=", surveyComplete, " helpCard=", helpCard, " tasks=", taskMap);
  }
  logState();

  const handleComplete = (sender: ReactSurveyModel, options: SurveyCompleteOptions) => {
    console.log("Complete", sender, options);
    // Sends the survey back to the first page while keeping the response data
    sender.clear(false);
    setSurveyComplete(true);
  }

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyChangedOptions) => {
    console.log("ValueChanged", sender, options);
    const hc = HelpCard.fromQuestionChoice(options.name, options.value);
    const tc = TaskCard.fromQuestionChoice(options.name, options.value);
    setHelpCard(hc);
    setTaskMap(taskMap.set(options.name, tc));
    console.log("HelpCard: ", hc);
    console.log("TaskCard: ", tc);
  }

  const handleCurrentPageChanged = (sender: ReactSurveyModel, options: CurrentPageChangedOptions) => {
    console.log("CurrentPageChanged", sender, options);
  }

  const tasks = Array.from(taskMap.values());

  if (showIntro) {
    return (
      <div className="App">
        <Intro onStartClick={() => setShowIntro(false)} />
      </div>
    );
  } else if (!surveyComplete) {
    return (
      <div className="App">
        <Survey json={surveyData}
          onValueChanged={handleValueChanged}
          onCurrentPageChanged={handleCurrentPageChanged}
          onComplete={handleComplete} />
        <Help card={helpCard}/>
        <TaskList tasks={tasks}/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <SurveyCompletionMessage onRestartClick={() => setSurveyComplete(false)} />
        <Help card={helpCard}/>
        <TaskList tasks={tasks}/>
      </div>
    );
  }
}

export default App;

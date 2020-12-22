import React, { useState } from 'react';
import './App.css';
import './survey.min.css'
import {ReactSurveyModel, Survey } from 'survey-react';
import surveyData from './data/survey.json';
import Intro from './Intro';
import TaskList from './TaskList';
import Help from './Help';
import SurveyCompletionMessage from './SurveyCompletionMessage';
import { CurrentPageChangedOptions, HelpCard, SurveyValueChangedOptions, SurveyCompleteOptions, TaskCard, Task } from './Types';
import helpData from './data/data.json';

const DEBUG = false;

const App: React.FunctionComponent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [helpCard, setHelpCard] = useState(new HelpCard([]));
  const [taskMap, setTaskMap] = useState(new Map<string, TaskCard>());

  function logState() {
    console.log("STATE: showIntro=", showIntro, " surveyComplete=", surveyComplete,
                " instructions= ", instructions, " category=", category,
                " helpCard=", helpCard, " tasks=", taskMap);
  }
  logState();

  const handleComplete = (sender: ReactSurveyModel, options: SurveyCompleteOptions) => {
    console.log("Complete", sender, options);
    // Sends the survey back to the first page while keeping the response data
    sender.clear(false);
    setSurveyComplete(true);
  }

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyValueChangedOptions) => {
    console.log("ValueChanged", sender, options);
    const hc = HelpCard.fromQuestionChoice(options.name, options.value);
    const tc = TaskCard.fromQuestionChoice(options.name, options.value);
    setHelpCard(hc);
    const previousTasks = taskMap.get(category);
    if (previousTasks != null) {
      const filtered = previousTasks.tasks.filter((t: Task) => t.question !== options.question.name);
      tc.tasks.concat(filtered);
    }
    setTaskMap(taskMap.set(category, tc));
    //console.log("HelpCard: ", hc, "TaskCard: ", tc, "TaskMap: ", taskMap);
  }

  const handleCurrentPageChanged = (sender: ReactSurveyModel, options: CurrentPageChangedOptions) => {
    console.log("CurrentPageChanged", sender, options);
    const questionName = options.newCurrentPage.questions[0].name;
    const data: any = helpData;
    setInstructions(data[questionName].instructions);
    setCategory(data[questionName].category);
  }

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
        <h4>Instructions</h4>
        <span>{instructions}</span>
        <Help card={helpCard}/>
        {DEBUG ? <TaskList taskMap={taskMap}/> : null}
      </div>
    );
  } else {
    return (
      <div className="App">
        <SurveyCompletionMessage onRestartClick={() => setSurveyComplete(false)} />
        <TaskList taskMap={taskMap}/>
      </div>
    );
  }
}

export default App;

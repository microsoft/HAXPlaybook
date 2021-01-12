// The App component is the top-level component of the application.
// This component manages the state of the survey and determines
// which page to show based on the status of the survey.

import React, { useState } from 'react';
import { ReactSurveyModel, Survey } from 'survey-react';
import Intro from './components/Intro';
import TaskList from './components/TaskList';
import Help from './components/Help';
import Instructions from './components/Instructions';
import { HelpCard, TaskCard } from './models/Types';
import { SurveyValueChangedOptions, SurveyCompleteOptions } from './models/SurveyCallbackTypes'

interface AppProps {
  surveyData: any,
  contentData: any
}

const App: React.FunctionComponent<AppProps> = ({surveyData, contentData}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [helpCard, setHelpCard] = useState(new HelpCard([]));
  const [taskMap, setTaskMap] = useState(new Map<string, TaskCard[]>());

  function logState() {
    console.log("STATE: showIntro=", showIntro, " helpCard=", helpCard, " tasks=", taskMap);
  }
  logState();

  const handleComplete = (sender: ReactSurveyModel, options: SurveyCompleteOptions) => {
    console.log("Complete", sender, options);
    sender.clear(false);
  }

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyValueChangedOptions) => {
    console.log("ValueChanged", sender, options);
    const hc = HelpCard.fromQuestionChoice(options.question.name, options.value);
    setHelpCard(hc);

    const tc = TaskCard.fromQuestionChoice(options.question.name, options.value);
    if (tc != null) {
      const category: any = contentData.questions.find((q: any) => q.name === options.question.name)?.category;
      let categoryTasks = taskMap.get(category);
      if (categoryTasks) {
        const filtered = categoryTasks.filter((t: TaskCard) => t.question !== options.question.name);
        filtered.push(tc);
        categoryTasks = filtered;
      } else {
        categoryTasks = [tc];
      }
      setTaskMap(taskMap.set(category, categoryTasks));
    }
  }

  if (showIntro) {
    // Only show intro page if introduction message is defined
    const data: any = contentData;
    if (data.introduction == null || data.introduction.length === 0) {
      setShowIntro(false);
    } else {
      return (
        <div className="row justify-content-center">
          <Intro introduction={data.introduction} onStartClick={() => setShowIntro(false)} />
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col page-column" style={{ backgroundColor: "white" }}>
          <div className="container">
            <div className="row">
              <Instructions title={contentData.surveyInstructions.title} message={contentData.surveyInstructions.message} />
            </div>
            <div className="row">
              <Survey json={surveyData}
                onValueChanged={handleValueChanged}
                onComplete={handleComplete} />
            </div>
          </div>
        </div>
        <div className="col page-column">
          <div className="container">
            <TaskList taskMap={taskMap} title={contentData.scenarioInstructions.title} message={contentData.scenarioInstructions.message} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default App;

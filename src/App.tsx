import React, { useState } from 'react';
import './App.css';
import './survey.min.css';
import { ReactSurveyModel, Survey } from 'survey-react';
import surveyData from './data/survey.json';
import Intro from './Intro';
import TaskList from './TaskList';
import Help from './Help';
import SurveyCompletionMessage from './SurveyCompletionMessage';
import { CurrentPageChangedOptions, HelpCard, SurveyValueChangedOptions, SurveyCompleteOptions, TaskCard } from './Types';
import contentData from './data/content.json';
import Instructions from './Instructions';

const App: React.FunctionComponent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [helpCard, setHelpCard] = useState(new HelpCard([]));
  const [taskMap, setTaskMap] = useState(new Map<string, TaskCard[]>());

  function logState() {
    console.log("STATE: showIntro=", showIntro, " surveyComplete=", surveyComplete,
      " instructions= ", instructions, " category=", category,
      " helpCard=", helpCard, " tasks=", taskMap);
  }
  logState();

  const handleComplete = (sender: ReactSurveyModel, options: SurveyCompleteOptions) => {
    console.log("Complete", sender, options);
    sender.clear();
    setSurveyComplete(true);
  }

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyValueChangedOptions) => {
    console.log("ValueChanged", sender, options);
    const hc = HelpCard.fromQuestionChoice(options.question.name, options.value);
    setHelpCard(hc);

    const tc = TaskCard.fromQuestionChoice(options.question.name, options.value);
    if (tc == null) {
      return;
    }

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

  const handleCurrentPageChanged = (sender: ReactSurveyModel, options: CurrentPageChangedOptions) => {
    console.log("CurrentPageChanged", sender, options);
    const question = options.newCurrentPage.questions[0];
    const metadata: any = contentData.questions.find((q: any) => q.name === question.name);
    setInstructions(metadata.instructions);
    setCategory(metadata.category);
    setHelpCard(question.isValueEmpty(question.value) ?
      new HelpCard([]) : HelpCard.fromQuestionChoice(question.name, question.value));
  }

  if (showIntro) {
    return (
      <div className="row justify-content-center">
        <Intro onStartClick={() => setShowIntro(false)} />
      </div>
    );
  } else if (!surveyComplete) {
    return (
      <React.Fragment>
        <div className="row">
          <Survey json={surveyData}
            onValueChanged={handleValueChanged}
            onCurrentPageChanged={handleCurrentPageChanged}
            onComplete={handleComplete} />
        </div>
        <div className="row">
          <Instructions message={instructions} />
        </div>
        <div className="row justify-content-center mt-3">
          <Help card={helpCard} />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div className="row justify-content-center">
        <SurveyCompletionMessage onRestartClick={() => {
          setSurveyComplete(false);
          setShowIntro(true);
        }} />
        <TaskList taskMap={taskMap} />
      </div>
    );
  }
}

export default App;

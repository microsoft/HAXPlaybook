// The App component is the top-level component of the application.
// This component manages the state of the survey and determines
// which page to show based on the status of the survey.

import React, { useState } from 'react';
import { ReactSurveyModel, Survey } from 'survey-react';
import Intro from './components/Intro';
import TaskList from './components/TaskList';
import Help from './components/Help';
import Instructions from './components/Instructions';
import { TaskCard } from './models/Types';
import { SurveyValueChangedOptions, SurveyCompleteOptions } from './models/SurveyCallbackTypes'

interface AppProps {
  surveyData: any,
  contentData: any
}

/*
// Figure the tasks
    const tc = TaskCard.fromQuestionChoice(options.name, options.value);
    if (tc != null) {
      const category: any = contentData.questions.find((q: any) => q.name === options.name)?.category;
      let categoryTasks = taskMap.get(category);
      if (categoryTasks) {
        const filtered = categoryTasks.filter((t: TaskCard) => t.question !== options.name);
        filtered.push(tc);
        categoryTasks = filtered;
      } else {
        categoryTasks = [tc];
      }
      const result = new Map(taskMap.set(category, categoryTasks));
      setTaskMap(result);
    }
    */

// Captures the survey model object upon the first time handleValueChanged is called
let surveyModel: ReactSurveyModel;

const App: React.FunctionComponent<AppProps> = ({surveyData, contentData}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [taskMap, setTaskMap] = useState(new Map<string, TaskCard[]>());
  const [undoStack, setUndoStack] = useState(new Array<Map<string, string>>());

  function logState() {
    console.log("STATE: showIntro=", showIntro,  " tasks=", taskMap, " undo=", undoStack);
  }
  logState();

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyValueChangedOptions) => {
    console.log("ValueChanged", sender, options);
    surveyModel = sender;
    const questions = sender.getAllQuestions();
    const valueMap = new Map<string, string>();
    questions.forEach(q => {
      valueMap.set(q.name, q.value);
    });
    setUndoStack([...undoStack, valueMap]);
  }

  const handleUndo = () => {
    console.log(surveyModel);
    console.log(undoStack);
    if (surveyModel == null) {
      console.log("Can't undo: surveyModel is undefined");
      return;
    }

    const questions = surveyModel.getAllQuestions();
    questions.forEach(q => {
      q.clearValue();
    });

    if (undoStack.length > 1) {
      // The last thing pushed on the stack is the current state
      // We need to pop it off first to get the old state
      undoStack.pop();
      const oldState = undoStack[undoStack.length-1];
      questions.forEach(q => {
        q.value = oldState?.get(q.name);
      });
      setUndoStack([...undoStack]);
    } else {
      setUndoStack([]);
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
        <div className="col page-column" style={{ backgroundColor: "white", borderRight: "dotted black 2px"}}>
          <div className="container">
            <div className="row">
              <Instructions title={contentData.surveyInstructions?.title} message={contentData.surveyInstructions?.message} />
            </div>
            <button onClick={handleUndo}>Undo</button>
            <div className="row my-1">
              <Survey json={surveyData}
                onValueChanged={handleValueChanged} />
            </div>
          </div>
        </div>
        <div className="col page-column">
          <div className="container">
            <TaskList taskMap={taskMap} title={contentData.scenarioInstructions?.title} message={contentData.scenarioInstructions?.message} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default App;

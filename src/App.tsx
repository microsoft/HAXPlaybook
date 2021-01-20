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

// Captures the survey model object upon the first time handleValueChanged is called
// Exposes some encapsulated state needed for undo functionality
let surveyModel: ReactSurveyModel;

function createTaskMap(contentData: any) {
  const questions = surveyModel?.getAllQuestions() ?? [];
  const taskMap = new Map<string, TaskCard[]>();
  questions.forEach(q => {
    const tc = TaskCard.fromQuestionChoice(q.name, q.value);
    if (tc != null) {
      const category: any = contentData.questions.find((cq: any) => cq.name === q.name)?.category;
      let categoryTasks = taskMap.get(category);
      if (categoryTasks) {
        const filtered = categoryTasks.filter((t: TaskCard) => t.question !== q.name);
        filtered.push(tc);
        categoryTasks = filtered;
      } else {
        categoryTasks = [tc];
      }
      taskMap.set(category, categoryTasks);
    }
  });
  return taskMap;
}

const App: React.FunctionComponent<AppProps> = ({surveyData, contentData}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [undoStack, setUndoStack] = useState(new Array<Map<string, string>>());
  const taskMap = createTaskMap(contentData);

  console.log("STATE: showIntro=", showIntro, " undo=", undoStack);

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyValueChangedOptions) => {
    console.log("ValueChanged", sender, options);
    surveyModel = sender;
    const questions = sender.getAllQuestions();
    const valueMap = new Map<string, string>();
    questions.forEach(q => {
      if (!q.isVisible) {
        q.clearValue();
      } 
      valueMap.set(q.name, q.value);
    });
    setUndoStack([...undoStack, valueMap]);
  }

  const handleUndo = () => {
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

  const handleClear = () => {
    if (surveyModel == null) {
      console.log("Can't clear: surveyModel is undefined");
      return;
    }
    
    const questions = surveyModel.getAllQuestions();
    questions.forEach(q => {
      q.clearValue();
    });
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
          <div className="container mb-3">
            <div className="row">
              <Instructions title={contentData.surveyInstructions?.title} message={contentData.surveyInstructions?.message} />
            </div>
            <div className="row my-1">
              <Survey json={surveyData}
                onValueChanged={handleValueChanged} />
            </div>
            <button onClick={handleUndo} className="btn btn-secondary mr-3">Undo</button>
            <button onClick={handleClear} className="btn btn-secondary">Clear Answers</button>
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

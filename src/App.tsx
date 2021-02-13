// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// The App component is the top-level component of the application.
// This component manages the state of the survey and determines
// which page to show based on the status of the survey.

import React, { useEffect, useState } from 'react';
import { ReactSurveyModel, Survey } from 'survey-react';
import Intro from './components/Intro';
import TaskList from './components/TaskList';
import { TaskCard } from './models/Types';
import { SurveyValueChangedOptions } from './models/SurveyCallbackTypes'
import TaskHeader from './components/TaskHeader';
import { BsArrowCounterclockwise } from 'react-icons/bs';

interface AppProps {
  surveyData: any,
  contentData: any
}

// Captures the survey model object upon the first time handleValueChanged is called
// Exposes some encapsulated state needed for undo functionality
export let surveyModel: ReactSurveyModel;

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

const App: React.FunctionComponent<AppProps> = ({ surveyData, contentData }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [undoStack, setUndoStack] = useState(new Array<Map<string, string>>());

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
      const oldState = undoStack[undoStack.length - 1];
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

  useEffect(() => {
    if (showIntro) return;
    const titleBar = document.getElementById("title-bar");
    const grid = document.getElementById("grid-container");
    const footer = document.getElementById("footer");
    if (grid) {
      grid.style.height = `calc(100vh - ${footer?.offsetHeight}px - ${titleBar?.offsetHeight}px)`;
    }
  });

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

  const taskMap = createTaskMap(contentData);
  const instructionHeader = contentData.surveyInstructions?.title;
  const instructionsMsg = contentData.surveyInstructions?.message;
  const scenarioHeader = contentData.taskInstructions?.title;
  const scenarioMsg = contentData.taskInstructions?.message;
  const categories = Array.from(taskMap.keys());
  const numTasks = categories.length === 0 ? 0 :
                     categories.map(category => TaskCard.filterTasks(taskMap.get(category) ?? []))
                       .flat()
                       .map(card => card.tasks)
                       .map(tasks => tasks.length)
                       .reduce((prev, n) => prev + n);

  return (
      <>
        <div id="title-bar" className="title-bar">
          <span>HAX Playbook</span>
          <div className="title-circle-container">
            <button title="Undo" onClick={handleUndo} disabled={undoStack.length === 0} className="circle-text circle-text-large undo-button"><BsArrowCounterclockwise /></button>
            <div className="circle-text circle-text-large">
              {numTasks}
            </div>
          </div>
        </div>
        <div id="grid-container" className="grid-container">
          <div className="left-column">
            <div className="my-3 column-header">
              <span>{instructionHeader}</span>
            </div>
          </div>
          <div className="right-column">
            <TaskHeader title={scenarioHeader} />
          </div>
          <div className="left-column">
            <div className="mb-3 normal-text" dangerouslySetInnerHTML={{ __html: instructionsMsg }} />
          </div>
          <div className="right-column">
            <div className="mb-3 normal-text" dangerouslySetInnerHTML={{ __html: scenarioMsg }} />
          </div>
          <div className="left-column">
            <button onClick={handleClear} className="blue-button">Start over</button>
          </div>
          <div className="right-column d-flex justify-content-end">
            <button onClick={() => window.print()} className="blue-button">Download report</button>
          </div>
          <div className="left-column pt-3 scroll-pane">
            <Survey json={surveyData} onValueChanged={handleValueChanged} />
          </div>
          <div className="right-column scroll-pane">
            <div className="">
              <TaskList taskMap={taskMap} />
            </div>
          </div>
        </div>
        <div id="footer" className="footer">
          <span className="mx-3">Copyright &copy; Microsoft Corporation</span>
          <a style={{marginLeft: "auto", marginRight: "1em"}} href="mailto:aiguidelines@microsoft.com">Contact us</a>
        </div>
      </>
  );
}

export default App;

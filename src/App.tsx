// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// The App component is the top-level component of the application.
// This component manages the state of the survey and determines
// which page to show based on the status of the survey.

import React, { createElement, useEffect, useState } from 'react';
import { ReactSurveyModel, Survey } from 'survey-react';
import Intro from './components/Intro';
import TaskList from './components/TaskList';
import CategoryTags from './components/CategoryTags';
import { TaskCard } from './models/Types';
import { SurveyValueChangedOptions } from './models/SurveyCallbackTypes';
import GithubExportForm from './components/GithubExportForm';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { saveAs } from 'file-saver';
import { getCategorySectionId } from './util/Utils';

interface AppProps {
  surveyData: any,
  contentData: any
}

let isFirstRender = true;

// Captures the survey model object after the page renders
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
  const [showGithubForm, setShowGithubForm] = useState(false);

  console.log("STATE: showIntro=", showIntro, " undo=", undoStack);

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyValueChangedOptions) => {
    console.log("ValueChanged", sender, options);
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

  function deserializeState(state: string) {
    console.log("Deserializing state: ", state);
    let regex = /^[0-9x]*$/g;
    if (!regex.test(state)) {
      console.error("Unsupported state string: ", state);
      return;
    }

    const questions = surveyModel.getAllQuestions();
    if (state.length !== questions.length) {
      console.error("State string length != number of questions");
      return;
    }

    const valueMap = new Map<string, string>();
    let stateIx = 0;
    for (let i = 0; i < surveyData.pages?.length; i++) {
      const page = surveyData.pages[i];
      for (let j = 0; j < page.elements?.length; j++) {
        if (stateIx > state.length) {
          console.error("survey.json contains more questions than state");
          return;
        }
        if (state.charAt(stateIx) === "x") {
          stateIx++;
          continue;
        }
        const choiceIx = parseInt(state.charAt(stateIx));
        const value = page.elements[j].choices[choiceIx];
        const questionName = page.elements[j].name;
        if (value) {
          valueMap.set(questionName, value);
        } else {
          console.error(`Choice not found for state index=${stateIx}`);
          return;
        }
        stateIx++;
      }
    }

    questions.forEach(q => {
      q.value = valueMap.get(q.name);
    });
    setUndoStack([valueMap]);
    console.log("Deserialization successful", valueMap);
  }

  const handleAfterRender = (sender: ReactSurveyModel, options: any) => {
    console.log("AfterRender", sender, options);
    surveyModel = sender;
    // Todo: Deserialize query string (1st time only!)
    if (isFirstRender) {
      isFirstRender = false;
      const urlParams = new URLSearchParams(window.location.search);
      const state = urlParams.get('state');
      if (state) {
        deserializeState(state);
      }
    }
  }

  const handleSerialize = () => {
    if (surveyModel == null) {
      console.log("Can't serialize: surveyModel is undefined");
      return;
    }

    // Values is a map of {questionName: questionValue}
    const values = surveyModel.getAllValues();
    let serialized = "";
    for (let i = 0; i < surveyData.pages?.length; i++) {
      let page = surveyData.pages[i];
      for (let j = 0; j < page.elements?.length; j++) {
        let choices = page.elements[j].choices;
        let questionName = page.elements[j].name;
        let found = false;
        for (let k = 0; k < choices?.length && !found; k++) {
          if (values[questionName] === choices[k].value) {
            serialized += k;
            found = true;
          }
        }
        if (!found) {
          serialized += "x";
        }
      }
    }

    console.log(`Serialized state: ${serialized}`);
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

  const handleCategoryClick = (category: string) => {
    document.getElementById(getCategorySectionId(category))?.scrollIntoView(true);
  }

  useEffect(() => {
    if (showIntro) return;

    const titleBar = document.getElementById("title-bar");
    const grid = document.getElementById("grid-container");
    const footer = document.getElementById("footer");
    if (grid) {
      grid.style.height = `calc(100vh - ${footer?.offsetHeight}px - ${titleBar?.offsetHeight}px)`;
    }

    const svRows = document.getElementsByClassName("sv_row");
    if (svRows.length > 0) {
      svRows[svRows.length - 1].scrollIntoView(true);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const autoScrollScenarios = urlParams.get('autoScrollScenarios');
    if (autoScrollScenarios === "true") {
      const taskCards = document.getElementsByClassName("task-card");
      if (taskCards.length > 0) {
        taskCards[taskCards.length - 1].scrollIntoView(true);
      }
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

  const handleAdoExport = () => {
    let csv = "Work Item Type,Title,Description\n";
    for (const category of categories) {
      const taskCards = taskMap.get(category) ?? [];
      for (const card of taskCards) {
        for (const task of card.tasks) {
          // In CSV, quotation marks are escaped with 2 quotation marks
          // e.g. "Hello World" => ""Hello World""
          const name = task.name.replaceAll(/"/g, "\"\"");
          const details = task.details.replaceAll(/"/g, "\"\"");
          csv += `"Issue","${category}: ${name}","${details}"\n`;
        }
      }
    }
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "azureDevOps.csv");
  }

  return (
    <>
      <div id="title-bar" className="title-bar py-2">
        <span className="title-bar-text ml-3">HAX Playbook</span>
        <div style={{ marginLeft: "auto" }} className="d-flex justify-content-end">
          <button onClick={handleAdoExport} className="blue-button">Export CSV</button>
          <button onClick={() => setShowGithubForm(true)} className="blue-button ml-3">Export to Github</button>
          <button onClick={handleSerialize} className="blue-button ml-3">Serialize</button>
          <button onClick={() => window.print()} className="blue-button mx-3">Print report</button>
        </div>
      </div>
      <div id="grid-container" className="grid-container">
        <div className="left-column">
          <div className="my-3 column-header">
            <span>{instructionHeader}</span>
          </div>
        </div>
        <div className="right-column d-flex flex-row align-items-center">
          <div className="my-3 column-header" >
            <span>{scenarioHeader}</span>
          </div>
          <span style={{ marginLeft: "auto" }}>Total scenarios:</span>
          <div className="circle-text circle-text-large">
            {numTasks}
          </div>
        </div>
        <div className="left-column">
          {instructionsMsg != null && instructionsMsg.length > 0 ? <div className="mb-3 normal-text" dangerouslySetInnerHTML={{ __html: instructionsMsg }} /> : null}
        </div>
        <div className="right-column">
          {scenarioMsg != null && scenarioMsg.length > 0 ? <div className="mb-3 normal-text" dangerouslySetInnerHTML={{ __html: instructionsMsg }} /> : null}
        </div>
        <div className="left-column bottom-shadow py-3">
          <button onClick={handleClear} className="blue-button">Start over</button>
          <button title="Undo" onClick={handleUndo} disabled={undoStack.length === 0} className="blue-button ml-3"><BsArrowCounterclockwise /> Undo</button>
        </div>
        <div className="right-column bottom-shadow">
          <CategoryTags taskMap={taskMap} onClick={handleCategoryClick} />
        </div>
        <div className="left-column pt-3 scroll-pane">
          <Survey json={surveyData} onAfterRenderPage={handleAfterRender} onValueChanged={handleValueChanged} />
        </div>
        <div className="right-column scroll-pane">
          <TaskList taskMap={taskMap} />
        </div>
      </div>
      <GithubExportForm taskMap={taskMap} numTasks={numTasks} showForm={showGithubForm} hideForm={() => setShowGithubForm(false)} />
      <div id="footer" className="footer">
        <span className="mx-3">Copyright &copy; Microsoft Corporation</span>
        <a style={{ marginLeft: "auto", marginRight: "1em" }} href="mailto:aiguidelines@microsoft.com">Contact us</a>
      </div>
    </>
  );
}

export default App;

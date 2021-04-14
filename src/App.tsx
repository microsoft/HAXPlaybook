// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// The App component is the top-level component of the application.
// This component manages the state of the survey and determines
// which page to show based on the status of the survey.

import React, { useEffect, useState } from 'react';
import { ReactSurveyModel, Survey } from 'survey-react';
import Intro from './components/Intro';
import TaskList from './components/TaskList';
import CategoryTags from './components/CategoryTags';
import { TaskCard } from './models/Types';
import { SurveyValueChangedOptions } from './models/SurveyCallbackTypes';
import GithubExportForm from './components/GithubExportForm';
import ExportDialog from './components/ExportDialog';
import LinkDialog from './components/LinkDialog';
import { BsArrowCounterclockwise, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { saveAs } from 'file-saver';
import { getCategorySectionId, isNullOrEmpty } from './util/Utils';

interface AppProps {
  surveyData: any,
  contentData: any
}

// Captures the survey model object after the page renders
// Exposes some encapsulated state needed for undo functionality
export let surveyModel: ReactSurveyModel;

// SurveyJS will re-render its component when pages are changed or when the
// app switches from mobile to desktop view. Some things need to only happen
// on the first render.
let isFirstRender = true;
let isDeserializing = false;

const autoscroll = (() => {
  const urlParams = new URLSearchParams(window.location.search);
  const autoscroll = urlParams.get('autoscroll');
  return autoscroll !== "false";
})();

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

function isWideScreen() {
  return window.innerWidth > 425;
}

// Switches the survey to multi-page or single-page format
function arrangeSurveyPages(surveyData: any, isMobileLayout: boolean) {
  const surveyQuestions = [];
  for (let i = 0; i < surveyData.pages?.length; i++) {
    const page = surveyData.pages[i];
    for (let j = 0; j < page.elements?.length; j++) {
      surveyQuestions.push(page.elements[j]);
    }
  }
  surveyData.pages = [];
  if (isMobileLayout) {
    // Split the survey into multiple pages
    for (let q of surveyQuestions) {
      surveyData.pages.push({ elements: [q] });
    }
  } else {
    // Combine all pages into 1 page
    surveyData.pages.push({ elements: surveyQuestions });
  }
  return surveyData;
}

// vertically align the button row with the category tags row
function adjustVerticalAlignment() {
  const categoryDiv = document.getElementById("category-container");
  const buttonDiv = document.getElementById("survey-buttons");
  if (categoryDiv && buttonDiv) {
    if (isNullOrEmpty(categoryDiv.style.minHeight)) {
      categoryDiv.style.minHeight = `${buttonDiv.clientHeight}px`;
    }
    const heightDiff = categoryDiv.clientHeight - buttonDiv.clientHeight;
    // parse the padding - it will be in format of "5px"
    const matches = buttonDiv.style.paddingBottom?.match(/[0-9]+/);
    const pb = matches == null ? 0 : parseInt(matches[0]);

    if (heightDiff != 0) {
      buttonDiv.style.paddingBottom = `${pb + heightDiff}px`;
    }
  }
}

const App: React.FunctionComponent<AppProps> = ({ surveyData, contentData }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showSurvey, setShowSurvey] = useState(true);
  const [undoStack, setUndoStack] = useState(new Array<Map<string, string>>());
  const [showExportForm, setShowExportForm] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showGithubForm, setShowGithubForm] = useState(false);
  const [isHighContrast, setHighContrast] = useState(false);
  const [isMobileLayout, setMobileLayout] = useState(!isWideScreen());

  console.log("STATE: showIntro=", showIntro, " showSurvey=", showSurvey,
    " isMobileLayout=", isMobileLayout, " isHighContrast=", isHighContrast);

  //surveyData = arrangeSurveyPages(surveyData, isMobileLayout);

  const deserializeState = (state: string) => {
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
    let numQuestions = 0;
    isDeserializing = true;
    for (let i = 0; i < surveyData.pages?.length; i++) {
      const page = surveyData.pages[i];
      for (let j = 0; j < page.elements?.length; j++) {
        numQuestions++;
        if (numQuestions > state.length) {
          console.error("survey.json contains more questions than state");
          isDeserializing = false;
          return;
        }
        if (state.charAt(j) === "x") {
          continue;
        }
        const choiceIx = parseInt(state.charAt(j));
        const value = page.elements[j].choices[choiceIx]?.value;
        const questionName = page.elements[j].name;
        if (value) {
          valueMap.set(questionName, value);
        } else {
          console.error(`Choice not found for state index=${j}`);
          isDeserializing = false;
          return;
        }
      }
    }

    questions.forEach(q => {
      q.value = valueMap.get(q.name);
    });
    if (isFirstRender) {
      setUndoStack([valueMap]);
    }
    isDeserializing = false;
    console.log("Deserialization successful", valueMap);
  }

  const serializeState = () => {
    if (surveyModel == null) {
      console.log("Can't serialize: surveyModel is undefined");
      return "";
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

    console.log("Serialized state: ", serialized);
    return serialized;
  }

  const handleAfterRender = (sender: ReactSurveyModel, options: any) => {
    console.log("AfterRender", sender, options);
    surveyModel = sender;
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    if (state) {
      deserializeState(state);
    }
    isFirstRender = false;
  }

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyValueChangedOptions) => {
    if (isDeserializing) {
      return;
    }
    console.log("ValueChanged", sender, options);
    const questions = sender.getAllQuestions();
    const valueMap = new Map<string, string>();
    questions.forEach(q => {
      // Clear answers from invisible questions
      // Questions can become invisible when the user changes a previous selection
      if (!q.isVisible) {
        q.clearValue();
      }
      valueMap.set(q.name, q.value);
    });
    setUndoStack([...undoStack, valueMap]);
    const url = new URL(window.location.toString());
    url.searchParams.set("state", serializeState());
    window.history.replaceState({}, '', url.toString());
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

    // Detect high contrast mode by checking if the background color has been modified
    if (!isHighContrast) {
      const leftColumnBg = window.getComputedStyle(document.getElementsByClassName("title-bar")[0], null).getPropertyValue('background-color'); 
      if (leftColumnBg !== "rgb(0, 27, 46)") {
        setHighContrast(true);
      }
    }

    // Resize the page to fill the screen vertically
    const titleBar = document.getElementById("title-bar");
    if (isMobileLayout) {
      const viewScenariosBar = document.getElementById("view-scenarios-bar");
      const surveyContainer = document.getElementById("survey-container");
      if (surveyContainer) {
        if (viewScenariosBar) {
          surveyContainer.style.height = `calc(100vh - ${titleBar?.offsetHeight}px - ${viewScenariosBar?.offsetHeight}px)`;
        } else {
          surveyContainer.style.height = `calc(100vh - ${titleBar?.offsetHeight}px)`;
        }
      }

      const scenarioContainer = document.getElementById("scenario-header-container");
      if (scenarioContainer) {
        scenarioContainer.style.height = "";
      }
    } else {
      const footer = document.getElementById("footer");
      const grid = document.getElementById("two-column-grid");
      if (grid) {
        grid.style.height = `calc(100vh - ${footer?.offsetHeight}px - ${titleBar?.offsetHeight}px)`;
      }
      adjustVerticalAlignment();
    }

    // Auto-scroll when the user selects a choice
    if (autoscroll) {
      const svRows = document.getElementsByClassName("sv_row");
      if (svRows.length > 0) {
        svRows[svRows.length - 1].scrollIntoView(true);
      }
    }

    const handleResize = () => {
      if (isMobileLayout && isWideScreen()) {
        console.log("Switching to desktop layout");
        setMobileLayout(false);
      } else if (!isMobileLayout && !isWideScreen()) {
        console.log("Switching to mobile layout");
        setMobileLayout(true);
      } else if (!isMobileLayout) {
        adjustVerticalAlignment();
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
  const highContrastBorder = isHighContrast ? "solid white 1px" : "";
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

  if (isMobileLayout) {
    return (
      <div>
        { showSurvey ?
          <div className="mobile-grid">
            <div id="title-bar" className="title-bar" style={{borderBottom: highContrastBorder}}>
              <header className="title-bar-text">HAX Playbook</header>
              <div id="survey-buttons" style={{ marginLeft: "auto" }} className="d-flex justify-content-end mr-3">
                <button name="Restart" onClick={handleClear} className="blue-button">Restart</button>
                <button name="Undo" onClick={handleUndo} disabled={undoStack.length === 0} className="blue-button ml-3"><BsArrowCounterclockwise /> Undo</button>
              </div>
            </div>
            { numTasks > 0 ? 
            <button onClick={() => setShowSurvey(false)} className="view-scenarios-bar" id="view-scenarios-bar">
              <span style={{ color: "white" }}>View testing scenarios</span>
              <div className="circle-text circle-text-large" style={{border: highContrastBorder}}>
                {numTasks}
              </div>
              <BsChevronRight color={isHighContrast ? "#FFFFFF" : "#708491"} style={{ marginLeft: "auto", fontSize: "24px", paddingRight: "2%" }} />
            </button>
            : <div></div> }
            <div className="left-column scroll-pane" id="survey-container">
              <div className="column-header">
                <span style={{ paddingLeft: "4%", paddingTop: "16px", fontSize: "22px", lineHeight: "26px", color: "#ACDEFB" }}>{instructionHeader}</span>
              </div>
              <Survey json={surveyData} onAfterRenderPage={handleAfterRender} onValueChanged={handleValueChanged} />
            </div>
          </div>
          :
          <>
            <div id="title-bar" className="title-bar py-2" style={{borderBottom: highContrastBorder}}>
              <header className="title-bar-text">HAX Playbook</header>
              <div style={{ marginLeft: "auto" }} className="d-flex justify-content-end mr-3">
                <button name="Export" onClick={() => { setShowExportForm(true) }} className="blue-button mr-3">Export</button>
                <ExportDialog 
                  show={showExportForm}
                  onClose={() => setShowExportForm(false)}
                  onCsvExport={handleAdoExport}
                  onGithubExport={() => setShowGithubForm(true)}
                  onPdfExport={() => window.print()}
                  onLinkExport={() => setShowLinkDialog(true)}/>
                <LinkDialog 
                  show={showLinkDialog}
                  onClose={() => setShowLinkDialog(false)} />
                <GithubExportForm taskMap={taskMap} numTasks={numTasks} showForm={showGithubForm} onClose={() => setShowGithubForm(false)} />
              </div>
            </div>
            <button onClick={() => setShowSurvey(true)} className="back-bar pt-3 pb-1" style={{border: isHighContrast ? "solid white 1px" : ""}}>
              <BsChevronLeft color={isHighContrast ? "#FFFFFF" : "#004578"} style={{ fontSize: "18px", paddingLeft: "2%", marginBottom: "4px" }} />
              <div style={{display: "inline-block", marginLeft: "10px"}}>Back to survey</div>
            </button>
            <div className="right-column d-flex flex-row align-items-center" id="scenario-header-container">
              <div className="mb-2 column-header" >
                <span style={{fontSize: "22px", color:"#004578", fontWeight: "bold"}}>{scenarioHeader}</span>
              </div>
            </div>
            <div className="right-column pb-4">
              <span style={{ fontSize: "14px", border: highContrastBorder}}>Total scenarios:</span>
              <div className="circle-text circle-text-large" style={{border: highContrastBorder}}>
                {numTasks}
              </div>
            </div>
            <div className="right-column">
              {scenarioMsg != null && scenarioMsg.length > 0 ? <div className="mb-3 normal-text" dangerouslySetInnerHTML={{ __html: instructionsMsg }} /> : null}
            </div>
            <div id="category-container" className="right-column bottom-shadow">
              <CategoryTags taskMap={taskMap} onClick={handleCategoryClick} isHighContrast={isHighContrast}/>
            </div>
            <TaskList taskMap={taskMap} isHighContrast={isHighContrast}/>
          </>
        }
      </div>
    );
  } else {
    return (
      <>
        <div id="title-bar" className="title-bar py-2" style={{borderBottom: highContrastBorder}}>
          <header role="banner" className="title-bar-text ml-3">HAX Playbook</header>
          <div style={{ marginLeft: "auto" }} className="d-flex justify-content-end">
            <button name="Export" onClick={() => setShowExportForm(true)} className="blue-button mr-3">Export</button>
          </div>
          <ExportDialog 
            show={showExportForm}
            onClose={() => setShowExportForm(false)}
            onCsvExport={handleAdoExport}
            onGithubExport={() => setShowGithubForm(true)}
            onPdfExport={() => window.print()}
            onLinkExport={() => setShowLinkDialog(true)}/>
          <LinkDialog 
            show={showLinkDialog}
            onClose={() => setShowLinkDialog(false)} />
        </div>
        <div id="two-column-grid" className="two-column-grid">
          <main role="main" className="left-column">
            <h1 className="my-3 column-header side-padding">
              {instructionHeader}
            </h1>
            { isNullOrEmpty(instructionsMsg) ? <div/> : <div className="mb-3 normal-text" aria-label="survey instructions" dangerouslySetInnerHTML={{ __html: instructionsMsg }} /> }
            <div id="survey-buttons" className="bottom-shadow side-padding">
              <button name="Restart" onClick={handleClear} className="blue-button">Restart</button>
              <button name="Undo" onClick={handleUndo} disabled={undoStack.length === 0} className="blue-button ml-3"><BsArrowCounterclockwise /> Undo</button>
            </div>
            <div className="pt-3 scroll-pane">
              <Survey json={surveyData} onAfterRenderPage={handleAfterRender} onValueChanged={handleValueChanged} />
            </div>
          </main>
          <div className="right-column">
            <div className="d-flex flex-row align-items-center">
              <h1 className="my-3 column-header side-padding">
                {scenarioHeader}
              </h1>
              <span id="total-scenarios-label" style={{ marginLeft: "auto" }}>Total scenarios:</span>
              <div className="circle-text circle-text-large" aria-aria-labelledby="total-scenarios-label" style={{border: highContrastBorder}}>
                {numTasks}
              </div>
            </div>
            { isNullOrEmpty(scenarioMsg) ? <div/> : <div className="mb-3 normal-text" dangerouslySetInnerHTML={{ __html: scenarioMsg }} /> }
            <div id="category-container" className="bottom-shadow side-padding">
              <CategoryTags taskMap={taskMap} onClick={handleCategoryClick} isHighContrast={isHighContrast}/>
            </div>
            <div className="scroll-pane side-padding">
              <TaskList taskMap={taskMap} isHighContrast={isHighContrast}/>
            </div>
          </div>
        </div>
        <GithubExportForm taskMap={taskMap} numTasks={numTasks} showForm={showGithubForm} onClose={() => setShowGithubForm(false)} />
        <footer role="contentinfo" id="footer" className="footer">
          <span className="mx-3">Copyright &copy; Microsoft Corporation</span>
          <address style={{ marginLeft: "auto", marginRight: "1em", marginBottom: "0px", display: "inline-block", fontStyle: "normal" }}>
            <a href="mailto:aiguidelines@microsoft.com">Contact us</a>
          </address>
        </footer>
      </>
    );
  }
}

export default App;

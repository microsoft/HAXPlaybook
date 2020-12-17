import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './survey.min.css'
import { PageModel, QuestionRadiogroupModel, ReactSurveyModel, Survey } from 'survey-react';
import surveyData from './data/survey.json';
import helpData from './data/data.json';
import Intro from './Intro';
import TaskList from './TaskList';
import HelpDisplay from './HelpDisplay';
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

class HelpCard {
  topics: HelpTopic[];

  constructor(topics: HelpTopic[]) {
    this.topics = topics;
  }

  static fromQuestionChoice(questionName: string, choiceValue: string) {
    const data: any = helpData;
    if (!(questionName in data)) {
      throw new Error("Could not find " + questionName + " in data");
    }
    if (data[questionName].choices == null) {
      throw new Error("Data for " + questionName + " contains null choices");
    }
    let choice = data[questionName].choices.find((c: any) => c.name === choiceValue);
    if (choice == null || choice.helpCard == null || choice.helpCard.topics == null) {
      console.log("Returning empty HelpCard for question %s choice %s", questionName, choiceValue);
      return new HelpCard([]);
    }
    return new HelpCard(choice.helpCard.topics.map((topic: any) => {
      const level = HelpLevel[topic.level as keyof typeof HelpLevel];
      if (level == null) {
        console.log("HelpLevel from data does not match expected values: ", topic.level);
      }
      return new HelpTopic(topic.name, topic.level, topic.details)
    }));
  }
}

class HelpTopic {
  name: string;
  level: HelpLevel;
  details: string | string[];

  constructor(name: string, level: HelpLevel, details: string | string[]) {
    this.name = name;
    this.level = level;
    this.details = details;
  }
}

enum HelpLevel {
  info,
  warning
}

class TaskCard {
  title: string;
  tasks: Task[];

  constructor(title: string, tasks: Task[]) {
    this.title = title;
    this.tasks = tasks;
  }

  static fromQuestionChoice(questionName: string, choiceValue: string) {
    const data: any = helpData;
    if (!(questionName in data)) {
      throw new Error("Could not find " + questionName + " in data");
    }
    if (data[questionName].choices == null) {
      throw new Error("Data for " + questionName + " contains null choices");
    }
    let choice = data[questionName].choices.find((c: any) => c.name === choiceValue);
    if (choice == null || choice.taskCard == null || choice.taskCard.tasks == null) {
      console.log("Returning empty TaskCard for question %s choice %s", questionName, choiceValue);
      return new TaskCard("", []);
    }
    return new TaskCard(choice.taskCard.title, choice.taskCard.tasks.map((task: any) => {
      return new Task(task.name, task.details)
    }));
  }
}

class Task {
  name: string;
  details: string | string[];

  constructor(name: string, details: string | string[]) {
    this.name = name;
    this.details = details;
  }
}

const App: React.FunctionComponent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [surveyComplete, setSurveyComplete] = useState(false);

  const handleComplete = (sender: ReactSurveyModel, options: SurveyCompleteOptions) => {
    console.log("Complete", sender, options);
    // Sends the survey back to the first page while keeping the response data
    sender.clear(false);
    setSurveyComplete(true);
  }

  const handleValueChanged = (sender: ReactSurveyModel, options: SurveyChangedOptions) => {
    console.log("ValueChanged", sender, options);
    const helpCard = HelpCard.fromQuestionChoice(options.name, options.value);
    const taskCard = TaskCard.fromQuestionChoice(options.name, options.value);
    console.log("HelpCard: ", helpCard);
    console.log("TaskCard: ", taskCard);
  }

  const handleCurrentPageChanged = (sender: ReactSurveyModel, options: CurrentPageChangedOptions) => {
    console.log("CurrentPageChanged", sender, options);
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
        <HelpDisplay />
        <TaskList />
      </div>
    );
  } else {
    return (
      <div className="App">
        <SurveyCompletionMessage onRestartClick={() => setSurveyComplete(false)} />
        <HelpDisplay />
        <TaskList />
      </div>
    );
  }
}

export default App;

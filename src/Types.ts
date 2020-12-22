import { PageModel, QuestionRadiogroupModel } from "survey-react";
import helpData from './data/data.json';

export interface SurveyValueChangedOptions {
  name: string,
  question: QuestionRadiogroupModel,
  value: string
}

export interface SurveyCompleteOptions {
  showDataSaving: (text: string) => any,
  showDataSavingError: (text: string) => any,
  showDataSavingSuccess: (text: string) => any,
  showDataSavingClear: () => any,
  isCompleteOnTrigger: () => boolean
}

export interface CurrentPageChangedOptions {
  oldCurrentPage: PageModel,
  newCurrentPage: PageModel,
  isNextPage: boolean,
  isPrevPage: boolean
}

export enum HelpLevel {
  info,
  warning
}

export class HelpCard {
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

export class HelpTopic {
  name: string;
  level: HelpLevel;
  details: string;

  constructor(name: string, level: HelpLevel, details: string) {
    this.name = name;
    this.level = level;
    this.details = details;
  }
}

export class TaskCard {
  title: string;
  message: string;
  tasks: Task[];

  constructor(title: string, message: string, tasks: Task[]) {
    this.title = title;
    this.message = message;
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
      return new TaskCard("", "", []);
    }
    return new TaskCard(choice.taskCard.title, choice.taskCard.message, choice.taskCard.tasks.map((task: any) => {
      return new Task(task.name, task.details, questionName)
    }));
  }
}

export class Task {
  name: string;
  details: string;
  question: string;

  constructor(name: string, details: string, question: string) {
    this.name = name;
    this.details = details;
    this.question = question;
  }
}

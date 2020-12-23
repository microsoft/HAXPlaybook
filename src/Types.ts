import { PageModel, QuestionRadiogroupModel } from "survey-react";
import contentData from './data/content.json';
import { v4 as uuidv4 } from 'uuid';

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

export type HelpLevel = "info" | "warning";

export class HelpCard {
  topics: HelpTopic[];

  constructor(topics: HelpTopic[]) {
    this.topics = topics;
  }

  static fromQuestionChoice(questionName: string, choiceValue: string) {
    const questions: any = contentData.questions;
    
    if (!(questionName in questions)) {
      console.log("Could not find question %s in content.json", questionName);
      return new HelpCard([]);
    }

    if (questions[questionName].choices == null) {
      console.log("Missing choices array for question %s", questionName);
      return new HelpCard([]);
    }

    let choice = questions[questionName].choices.find((c: any) => c.name === choiceValue);
    if (choice == null || choice.helpCard == null || choice.helpCard.topics == null) {
      console.log("Missing help for question %s choice %s", questionName, choiceValue);
      return new HelpCard([]);
    }

    return new HelpCard(choice.helpCard.topics.map((topic: any) => {
      return new HelpTopic(topic.name, topic.level, topic.details)
    }));
  }
}

export class HelpTopic {
  name: string;
  level: HelpLevel;
  details: string;
  id: string;

  constructor(name: string, level: HelpLevel, details: string) {
    this.name = name;
    this.level = level;
    this.details = details;
    this.id = uuidv4();
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
    const questions: any = contentData.questions;

    if (!(questionName in questions)) {
      console.log("Could not find question %s in content.json", questionName);
      return new TaskCard("", "", []);
    }

    if (questions[questionName].choices == null) {
      console.log("Missing choices array for question %s", questionName);
      return new TaskCard("", "", []);
    }

    let choice = questions[questionName].choices.find((c: any) => c.name === choiceValue);
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
  id: string;

  constructor(name: string, details: string, question: string) {
    this.name = name;
    this.details = details;
    this.question = question;
    this.id = uuidv4();
  }
}

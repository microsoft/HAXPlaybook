// This file defines the types used in the application.

import contentData from '../data/content.json';
import { v4 as uuidv4 } from 'uuid';

export type HelpLevel = "info" | "warning";

function getChoice(questionName: string, choiceValue: string) {
    const metadata: any = contentData.questions.find((q: any) => q.name === questionName);
    // The surveyjs framework sends a boolean value instead of string
    // for boolean questions, so we need to force it to be a string
    choiceValue = choiceValue.toString();
    
    if (metadata == null) {
      console.log("Could not find question %s in content.json", questionName);
      return new HelpCard([]);
    }

    if (metadata.choices == null) {
      console.log("Missing choices array for question %s", questionName);
      return new HelpCard([]);
    }

    return metadata.choices.find((c: any) => c.name === choiceValue);
}

export class HelpCard {
  topics: HelpTopic[];

  constructor(topics: HelpTopic[]) {
    this.topics = topics;
  }

  static fromQuestionChoice(questionName: string, choiceValue: string) {
    const choice = getChoice(questionName, choiceValue);
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
  question: string;
  id: string;
  tasks: Task[];

  constructor(title: string, message: string, question: string, tasks: Task[]) {
    this.title = title;
    this.message = message;
    this.tasks = tasks;
    this.question = question;
    this.id = uuidv4();
  }

  static fromQuestionChoice(questionName: string, choiceValue: string) {
    const choice = getChoice(questionName, choiceValue);
    if (choice == null || choice.taskCard == null || choice.taskCard.tasks == null) {
      console.log("Null taskcard for question %s choice %s", questionName, choiceValue);
      return null;
    }

    const tasks = choice.taskCard.tasks.map((task: any) => { return new Task(task.name, task.details) });
    return new TaskCard(choice.taskCard.title, choice.taskCard.message, questionName, tasks);
  }
}

export class Task {
  name: string;
  details: string;
  id: string;

  constructor(name: string, details: string) {
    this.name = name;
    this.details = details;
    this.id = uuidv4();
  }
}

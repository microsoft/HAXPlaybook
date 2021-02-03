// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This file defines the types used in the application.

import contentData from '../data/content.json';
import { ConditionRunner } from 'survey-react'
import { surveyModel } from '../App'
import { v4 as uuidv4 } from 'uuid';

function getChoiceFromContent(questionName: string, choiceValue: string) {
    if  (questionName == null || choiceValue == null) {
      return null;
    }
    const metadata: any = contentData.questions.find((q: any) => q.name === questionName);
    // The surveyjs framework sends a boolean value instead of string
    // for boolean questions, so we need to force it to be a string
    choiceValue = choiceValue.toString();
    
    if (metadata == null) {
      console.log("Could not find question %s in content.json", questionName);
      return null;
    }

    if (metadata.choices == null) {
      console.log("Missing choices array for question %s", questionName);
      return null;
    }

    return metadata.choices.find((c: any) => c.name === choiceValue);
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
    const choice = getChoiceFromContent(questionName, choiceValue);
    if (choice == null || choice.taskCard == null || choice.taskCard.tasks == null) {
      console.log("Null taskcard for question %s choice %s", questionName, choiceValue);
      return null;
    }

    const tasks = choice.taskCard.tasks.map((task: any) => { return new Task(task.name, task.details, task.visibleIf) });
    return new TaskCard(choice.taskCard.title, choice.taskCard.message, questionName, tasks);
  }

  static filterTasks(taskCards: TaskCard[]) {
    if (surveyModel) {
      const values = surveyModel.getAllValues();
      const properties = surveyModel.getFilteredProperties();
      const filteredCards: TaskCard[] = [];
      taskCards.forEach(tc => {
        const filtered = tc.tasks.filter(task => new ConditionRunner(task.visibleIf ?? "true").run(values, properties))
        filteredCards.push(new TaskCard(tc.title, tc.message, tc.question, filtered));
      })
      return filteredCards;
    } else {
      return taskCards;
    }
  }
}

export class Task {
  name: string;
  details: string;
  visibleIf: string;
  id: string;

  constructor(name: string, details: string, visibleIf: string) {
    this.name = name;
    this.details = details;
    this.visibleIf = visibleIf;
    this.id = uuidv4();
  }
}

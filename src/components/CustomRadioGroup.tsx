// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SurveyQuestionRadiogroup } from 'survey-react';
import * as React from 'react';
import contentData from '../data/content.json';
import RadioDefinition from './RadioDefinition';
import HelpButton from './HelpButton';

export class CustomRadiogroup extends SurveyQuestionRadiogroup {
  protected getItems(cssClasses: any): Array<any> {
    const items = super.getItems(cssClasses);

    const contentQuestion: any = contentData.questions.find(q => q.name === this.question.name);

    const elements = this.question.visibleChoices.map(choice => {
      const contentChoice = contentQuestion.choices.find((cq: any) => cq.name === choice.value);
      return (
        contentChoice != null ? (
          <>
            <HelpButton name={choice.text} examples={contentChoice.examples} />
            <RadioDefinition key={contentChoice.name + "__customradiogroup"}
                            definition={contentChoice.definition}  />
          </>
        ) : null
      )
    });

    const merged = Array(items.length * 2);
    for (let i = 0; i < items.length * 2; i++) {
      const index = Math.floor(i / 2);
      merged[i] = (i % 2 === 0) ? items[index] : elements[index];
    }

    return merged;
  }
}

export default CustomRadiogroup;
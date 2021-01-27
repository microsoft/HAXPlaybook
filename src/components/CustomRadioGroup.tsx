import { SurveyQuestionRadiogroup } from 'survey-react';
import * as React from 'react';
import contentData from '../data/content.json';
import RadioDefinition from './RadioDefinition';

export class CustomRadiogroup extends SurveyQuestionRadiogroup {
  protected getItems(cssClasses: any): Array<any> {
    const items = super.getItems(cssClasses);

    const contentQuestion: any = contentData.questions.find(q => q.name === this.question.name);

    const elements = this.question.visibleChoices.map(choice => {
      const contentChoice = contentQuestion.choices.find((cq: any) => cq.name === choice.value);
      return (
        contentChoice != null ? (
          <RadioDefinition key={contentChoice.name + "__customradiogroup"}
                           name={choice.text} 
                           definition={contentChoice.definition}
                           examples={contentChoice.examples} />
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
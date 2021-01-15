import { SurveyQuestionRadiogroup } from 'survey-react';
import * as React from 'react';
import surveyData from '../data/survey.json';
import contentData from '../data/content.json';
import { BsFillQuestionCircleFill } from 'react-icons/bs'

export class CustomRadiogroup extends SurveyQuestionRadiogroup {
  constructor(props: any) {
    super(props);
  }

  protected getItems(cssClasses: any): Array<any> {
    const items = super.getItems(cssClasses);

    const contentQuestion: any = contentData.questions.find(q => q.name === this.question.name);

    const elements = this.question.visibleChoices.map(choice => {
      const contentChoice = contentQuestion.choices.find((cq: any) => cq.name === choice.value);
      return (
        contentChoice != null ? (
          <div key={contentChoice.name + "__customradiogroup"} style={{ marginLeft: "28px", marginTop: "-15px" }}>
            <div style={{ color: "#848b91", fontSize: "0.75rem", display: "inline" }} dangerouslySetInnerHTML={{ __html: contentChoice.definition }}></div>
            <BsFillQuestionCircleFill style={{ cursor: 'pointer', marginLeft: "0.75em", marginTop: "-3px" }} />
          </div>
        ) : null
      )

    })

    const merged = Array(items.length * 2);
    for (let i = 0; i < items.length * 2; i++) {
      const index = Math.floor(i / 2);
      merged[i] = (i % 2 == 0) ? items[index] : elements[index];
    }

    return merged;
  }
}

export default CustomRadiogroup;
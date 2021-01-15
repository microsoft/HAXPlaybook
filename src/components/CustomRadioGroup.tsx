import { SurveyQuestionRadiogroup } from 'survey-react';
import * as React from 'react';
import surveyData from '../data/survey.json';
import contentData from '../data/content.json';

export class CustomRadiogroup extends SurveyQuestionRadiogroup {
  constructor(props: any) {
    super(props);
  }

  protected getItems(cssClasses: any): Array<any> {
    const items = super.getItems(cssClasses);

    const contentQuestion: any = contentData.questions.find(q => q.name === this.question.name);
    const definitions = this.question.visibleChoices.map(choice => {
      return contentQuestion.choices.find((cq: any) => cq.name === choice.value)?.definition
    });

    const elements = definitions.map(d => {
      // A div is used to make a button because SurveyJS will force default styles on a button element
      return (
        <div>
          { d != null ? (
            <div style={{ marginLeft: "28px", marginTop: "-15px" }}>
              <span style={{ color: "#848b91", fontSize: "0.75rem" }}>{d}</span>
              <div className="btn btn-primary" style={{ display: "inline", color: "white", marginLeft: "10px", fontSize: "0.75rem", padding: "5px", border: "solid gray 1px", borderRadius: "50%", height: "1.2em", width: "1.2em" }}>?</div>
            </div>
          ) : null}
        </div>
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
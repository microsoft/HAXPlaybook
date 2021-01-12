import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/survey.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import surveyData from './data/survey.json';
import contentData from './data/content.json';

// Add the definitions to the survey choice text
// We assume there's always exactly 1 page
const questions = surveyData.pages[0].elements;
for (let i=0; i<questions.length; i++) {
  const contentQuestion: any = contentData.questions.find(q => q.name === questions[i].name);
  if (contentQuestion == null) {
    continue;
  }
  for (let j=0; j<questions[i].choices.length; j++) {
    const contentChoice = contentQuestion.choices.find((c: any) => c.name === questions[i].choices[j].value);
    if (contentChoice != null && contentChoice.definition != null) {
      surveyData.pages[0].elements[i].choices[j].text += " — " + contentChoice.definition;
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid">
      <App surveyData={surveyData} contentData={contentData} />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

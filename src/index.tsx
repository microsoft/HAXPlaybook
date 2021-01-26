import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/survey.min.css';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import surveyData from './data/survey.json';
import contentData from './data/content.json';
import { ReactQuestionFactory } from 'survey-react';
import { CustomRadiogroup } from './components/CustomRadioGroup';

// ReactQuestionFactory sets the type of component that will be rendered for a given
// type of question
ReactQuestionFactory.Instance.registerQuestion("radiogroup", (props) => {
  return React.createElement(CustomRadiogroup, props);
});

ReactDOM.render(
  <React.StrictMode>
    <App surveyData={surveyData} contentData={contentData} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

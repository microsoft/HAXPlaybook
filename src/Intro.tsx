import React from 'react';

interface IntroProps {
  onStartClick(): void
}

const Intro: React.FunctionComponent<IntroProps> = ({ onStartClick }) => {
  return (
    <React.Fragment>
    <h1>AI Playbook</h1>
    <div id="introduction">
      <br/>
      <p>In this session, we'll ask you to walk us through key defining features of a system you are designing. These
        features will determine various types of scenarios that your users might encounter as they interact with your
        system. This playbook will guide you through some of these scenarios and help you understand several techniques
        that you and your team can consider including in user testing.</p>

      <p>You will be asked to complete a total of two tasks. In each task, you will answer a set of multiple choice
        questions (up to 7) related to your design of a feature or system. You will be provided with tips and examples
        in the help center to help guide your selection of choices. As you are answering the questions, you will also
        see a preview of a list of scenarios that you could potetially include in user testing. Once you have completed
        answering the questions, you will see the full list of scenarios and recommendations for simulating the expected
        outcomes (including errors) of an AI system given each scenario.</p>
      <br/>

      <b>Task 1</b> (5 min)
      <p>Design a simple <u>chatbot system</u> that will help its users find a rental apartment that best suits their
        preference.</p>
      <br/>
      <b>Task 2</b> (10 min)
      <p>Design a <u>feature or system that you will work on</u>. Here are some things to keep in mind while completing
        this task:</p>
      <ul>
        <li>Pick an idea that you and your team have just began to conceptualize.</li>
        <li>You can also start with a project that you recently worked on, but has not yet reached full integration with
          AI.</li>
        <li>Please use this Playbook as if it is now part of your practice during early prototyping or design phases.
        </li>
      </ul>
      <br/>
      <p>When you are ready, press start to begin your AI Playbook.</p><br/>
      <p><button id="startPlaybook" className="btn btn-primary" onClick={onStartClick}><i className="fa fa-play-circle"
            aria-hidden="true"></i>&nbsp;Start AI Playbook</button></p>
    </div>
    </React.Fragment>
  );
}

export default Intro;
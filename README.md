# Introduction

The HAX Playbook is an interactive tool for generating interaction scenarios to test when designing
user-facing AI systems.

A default survey about designing an AI system is included in this repository. It provides a 
demonstration of the features supported by the web app.

The web app's features include fully customizable contextual help cards, salutation message,
farewell message, and a list of tasks based on survey results. All of these components are read
from a JSON file. See the Extension section for more details.

# Getting Started

To run the app, open a terminal in the root directory of the repository and run:

```
$> npm install
$> npm start
```

# Extension

The survey and textual content are defined in JSON files. To add your own content, modify the JSON files
as instructed below.

## Survey

The survey is defined in `src/data/survey.json`. SurveyJS is the library used to render
the survey. To create your own survey, use the [survey creator](https://surveyjs.io/create-survey) on the SurveyJS website.

To export the survey you've created, click on the `JSON Editor` tab and copy the contents, then paste into `src/data/survey.json`. 

### Survey guidelines
To make sure your survey is supported, please adhere to the following guidelines:
- Only use the radio group, dropdown, and boolean survey components.
- Specify a `name` for each question. A default name like `question1` will be provided automatically in the SurveyJS builder. It's a good idea to use a more descriptive name to make the generated `content.json` file more readable.

### How to create a cascading survey
The survey included with the HAX Playbook has a cascading question effect, causing new questions appear when the user selects an answer.
Cascading questions are implemented by configuring the visibility rules for questions in the survey.
The visibility rules can be configured in the SurveyJS builder or in the JSON file.
To configure visibility in the SurveyJS builder, select the question to modify, then select the `Visible if` rule in the `Logic` section of the `Properties` toolbar.
A cascading question effect is implemented by using the rule `{previous_question_name} is not empty`.
This rule effectively says, "if an answer has been selected for the previous question, then show this question."


## Textual Content

All of the content outside of the survey itself is defined in `src/data/content.json`. This content is used to enrich the user experience
by providing an introduction, instructions for each survey question, contextual help for each choice, and tasks for each choice. HTML is supported inside of each component.

### Generating a starter file
A starter content.json file can be generated from a survey.json file. The starter file will contain a skeleton of the data with empty strings
ready for you to fill in. There are two options to generate it.

#### Script
To use the script, open a terminal at the repository's root directory and do:

```
$> node scripts/generate.js <path_to_survey.json> <output_file_name>
```

#### API
If you can't run node locally, there is also an API available. Send your `survey.json` in the request body.

`POST https://surveymeta.azurewebsites.net/api/generate`

### Explanation of properties in content.json

#### Top-level properties
- introduction: The message displayed before the survey begins. This is optional.
- surveyInstructions: The message to display above the survey. This property has a `title` and a `message`.
- taskInstructions: The message to display above the list of tasks. This property also has a `title` and a `message`.

#### Question properties
- name: The name of the question. Must match the question name in `survey.json`.
- category: The category for the question. Tasks will be consolidated into sections by category.

#### Choice properties
- name: The name of the choice. Must match the choice name in `survey.json`.
- definition: A message that will appear below the survey choice, along with the ? button.
- examples: Contains an array of examples. These examples are shown in the help popup when the ? button is clicked for that choice.
- taskCard: Defines the tasks corresponding to the question. Tasks are shown in the survey results page.

#### Example properties
- name: The title of the example. Appears in the help dialog as a heading.
- details: The message for the example. HTML is supported.

#### Task card properties
- message: A message to show for the entire group of tasks.
- tasks: An array of tasks.

#### Task properties
- name: The title of the task.
- details: The message for to the task. HTML is supported.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

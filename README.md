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

To make sure your survey is supported, please adhere to the following guidelines:
- Only include 1 question per page.
- Only use the radio group, dropdown, and boolean survey components.
- Specify a `value name` for each question. You can specify it in the `Data` section of the `Properties` toolbar on the right side of the survey builder.

To export the survey you've created, click on the `JSON Editor` tab and copy the contents, then paste into `src/data/survey.json`. 

## Textual Content

All of the content outside of the survey itself is defined in `src/data/content.json`. This content is used to enrich the user experience
by providing an introduction, instructions for each survey question, contextual help for each choice, results for each choice, and a
farewell message. HTML is supported inside of each component.

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
- introduction: The message displayed before the survey begins.
- farewell: The message displayed when the survey is finished.

#### Question properties
- instructions: Instructions for the question.
- category: The category for the question. Used to consolidate results at the end of the survey.

#### Choice properties
- helpCard: Contains an array of topics, where each topic is an individual card shown for that question choice.
- taskCard: Defines the tasks corresponding to the question. Tasks are shown in the survey results page.

#### Help card topic properties
- name: The title of the help topic.
- level: The level of importance. Controls the border color. Options: `warning` or `info`.
- details: The message to show in the card.

#### Task card properties
- message: A message to show for the entire group of tasks.
- tasks: An array of tasks.

#### Tasks properties
- name: The title of the task.
- details: The message corresponding to the task.

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

'use strict';

const { exit } = require("process");
const fs = require("fs");

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("Usage: generate survey.json output.json")
  exit()
}

const rawData = fs.readFileSync(args[0]);
const survey = JSON.parse(rawData);

function generateContent(survey) {
  const content = {
    introduction: "",
    surveyInstructions: {
      title: "",
      message: ""
    },
    taskInstructions: {
      title: "",
      message: ""
    },
    questions: [],
  }

  survey.pages.forEach(page => {
    // pages can contain either "questions" or "elements", both which
    // seem to be the same thing. "Questions" were probably renamed to "elements"
    // in a newer version of the library.
    let questions;
    if (page.questions == null && page.elements == null) {
      console.error("Error: Survey contains a page with no questions");
      return;
    } else if (page.questions != null) {
      questions = page.questions;
    } else {
      questions = page.elements;
    }

    questions.forEach(q => {
      const metadata = {
        name: q.name,
        category: "",
        choices: [],
      }

      const choices = q.type === "boolean" ? [{ value: "true" }, { value: "false" }] : q.choices;

      choices.forEach(c => {
        const choiceMeta = {
          name: c.value,
          definition: "",
          examples: [
            {
              name: "",
              details: "",
            }
          ],
          taskCard: {
            message: "",
            tasks: [
              {
                name: "",
                details: ""
              }
            ]
          }
        }
        metadata.choices.push(choiceMeta);
      })
      content.questions.push(metadata);
    });
  });

  return content;
}

const content = generateContent(survey);
fs.writeFileSync(args[1], JSON.stringify(content));
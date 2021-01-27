// This is intended to run as an Azure Function
// Send a POST request with the survey data in the request body
// The response will contain the generated metadata

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const makeErrorResponse = (msg) => {
      context.res = {
          status: 400,
          body: msg
      };
  }

  const survey = req.body;
  if (survey == null) {
      makeErrorResponse("Request body is empty.");
      return;
  } else if (survey.pages == null) {
      makeErrorResponse("Survey contains no pages.");
      return;
  }

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
  context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(content)
  };
}
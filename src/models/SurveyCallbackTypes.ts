// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This file defines types used by survey.js for callbacks.
// These types were not provided in the survey.js type definitions,
// but they are documented in the official docs.

import { PageModel, QuestionRadiogroupModel } from "survey-react";

export interface SurveyValueChangedOptions {
  name: string,
  question: QuestionRadiogroupModel,
  value: string
}

export interface SurveyCompleteOptions {
  showDataSaving: (text: string) => any,
  showDataSavingError: (text: string) => any,
  showDataSavingSuccess: (text: string) => any,
  showDataSavingClear: () => any,
  isCompleteOnTrigger: () => boolean
}

export interface CurrentPageChangedOptions {
  oldCurrentPage: PageModel,
  newCurrentPage: PageModel,
  isNextPage: boolean,
  isPrevPage: boolean
}

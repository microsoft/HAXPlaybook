// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Put general helper functions here

export function getCategorySectionId(category: string) {
  return `${category}_section`
}

export function isNullOrEmpty(str: string) {
  return (!str || str.trim().length === 0 );
}
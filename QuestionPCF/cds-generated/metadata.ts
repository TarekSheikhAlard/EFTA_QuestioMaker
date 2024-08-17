/* eslint-disable*/
import { axa_choiceMetadata } from "./entities/axa_Choice";
import { axa_promiseMetadata } from "./entities/axa_Promise";
import { axa_questionMetadata } from "./entities/axa_Question";

export const Entities = {
  axa_Choice: "axa_choice",
  axa_Promise: "axa_promise",
  axa_Question: "axa_question",
};

// Setup Metadata
// Usage: setMetadataCache(metadataCache);
export const metadataCache = {
  entities: {
    axa_choice: axa_choiceMetadata,
    axa_promise: axa_promiseMetadata,
    axa_question: axa_questionMetadata,
  },
  actions: {
  }
};
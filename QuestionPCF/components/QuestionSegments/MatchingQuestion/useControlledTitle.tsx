import { useEffect, useState } from "react";
import QuestionsVM from "../../../viewModels/QuestionsVM";
import { ILineError } from './MatchingQuestion'


export const useControlledTitle = (
  vm: QuestionsVM,
  defaultTitle: string,
  index: number,
  lineError: ILineError,
  validateInput: (index: number, type: "option" | "promise") => void,
  fieldType: "option" | "promise"
) => {
  const [controlledTitle, setControlledTitle] = useState(defaultTitle);
  let timeout: NodeJS.Timeout;

  const writeOptionTitle = () => {
    const newOptions = [...vm.QuestionMatchingOptions]
    newOptions[index].title = controlledTitle || '';
    vm.QuestionMatchingOptions = newOptions;
    if (lineError?.[fieldType]?.isError) validateInput(index, fieldType);
  }

  const writePromiseTitle = () => {
    const newPromises = [...vm.QuestionMatchingPromises];
    newPromises[index].title = controlledTitle || '';
    vm.QuestionMatchingPromises = newPromises;
    if (lineError?.[fieldType]?.isError) validateInput(index, fieldType);
  }

  const writeTitle = () => {
    if (fieldType === 'option') writeOptionTitle()
    else writePromiseTitle()
  }

  const resetTimer = () => { if (timeout) clearTimeout(timeout) };

  useEffect(() => {
    setControlledTitle(defaultTitle);
  }, [vm.QuestionMatchingOptions, vm.QuestionMatchingPromises]);

  useEffect(() => {
    if (controlledTitle === defaultTitle) return;
    vm.makeFormDirty();

    timeout = setTimeout(() => {
      console.log("writeTitle")
      writeTitle()
    }, 500);
    return () => resetTimer();
  }, [controlledTitle]);

  return { controlledTitle, setControlledTitle, writeTitle, resetTimer };
};

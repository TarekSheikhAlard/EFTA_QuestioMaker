import {
  ActionButton,
  IStackStyles,
  MessageBar,
  MessageBarType,
  Stack,
} from '@fluentui/react';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { IOption, IPromise } from '../../../cdsService/cdsSerivce';
import { useVM } from '../../../viewModels/context';
import { newId } from '../ScQuestion/ScQuestion';
import MatchingQuestionOption from './MatchingQuestionOption';


export interface ILineError {
  option: {
    isError: boolean,
    errorMessage: string | undefined
  },
  promise: {
    isError: boolean,
    errorMessage: string | undefined
  }
}

const MatchingQuestion = () => {
  const vm = useVM();
  const [error, setError] = useState<string>();
  const [linesError, setLinesError] = useState<ILineError[]>(vm.QuestionMatchingOptions.map(() => ({} as ILineError)));

  const validate = useCallback(() => {
    const newLinesError = validateInputs();
    if (!validateForm()) return false
    if (newLinesError.some(o => o.option.isError || o.promise.isError)) return false
    return true;
  }, [])

  const validateInput = (index: number, field: "promise" | "option") => {
    setLinesError(prev => {
      let newlineError = [...prev]
      let lineError: ILineError = {
        option: { isError: false, errorMessage: undefined },
        promise: { isError: false, errorMessage: undefined }
      };
      if (field === "promise") {
        if ((vm.QuestionMatchingPromises[index].title == undefined || vm.QuestionMatchingPromises[index].title == '' || !vm.QuestionMatchingPromises[index].title) &&
          (vm.QuestionMatchingPromises[index].imageUrl == undefined || vm.QuestionMatchingPromises[index].imageUrl == '' || !vm.QuestionMatchingPromises[index].imageUrl)) {
          lineError = { option: prev[index].option, promise: { isError: true, errorMessage: 'Promise title is required' } };
        } else {
          lineError = {
            option: prev[index].option,
            promise: { isError: false, errorMessage: undefined }
          };
        }
      }
      if (field === "option") {
        if ((vm.QuestionMatchingOptions[index].title == undefined || vm.QuestionMatchingOptions[index].title == '' || !vm.QuestionMatchingOptions[index].title) &&
          (vm.QuestionMatchingOptions[index].imageUrl == undefined || vm.QuestionMatchingOptions[index].imageUrl == '' || !vm.QuestionMatchingOptions[index].imageUrl)) {
          lineError = { promise: prev[index].promise, option: { isError: true, errorMessage: 'Option title is required' } };
        } else {
          lineError = {
            promise: prev[index].promise,
            option: { isError: false, errorMessage: undefined }
          };
        }
      }
      newlineError[index] = lineError;
      return newlineError
    })
  }

  const validateInputs = (): ILineError[] => {
    let newLinesError = vm.QuestionMatchingOptions.map((line, index) => {
      let lineError: ILineError = {
        option: { isError: false, errorMessage: undefined },
        promise: { isError: false, errorMessage: undefined }
      };
      if ((line.title == undefined || line.title == '' || !line.title) &&
        (line.imageUrl == undefined || line.imageUrl == '' || !line.imageUrl)) {
        lineError = { ...lineError, option: { isError: true, errorMessage: 'Option title is required' } };
      } else {
        lineError = {
          ...lineError,
          option: { isError: false, errorMessage: undefined }
        };
      }
      if ((vm.QuestionMatchingPromises[index].title == undefined || vm.QuestionMatchingPromises[index].title == '' || !vm.QuestionMatchingPromises[index].title) &&
        (vm.QuestionMatchingPromises[index].imageUrl == undefined || vm.QuestionMatchingPromises[index].imageUrl == '' || !vm.QuestionMatchingPromises[index].imageUrl)) {
        lineError = { ...lineError, promise: { isError: true, errorMessage: 'Promise title is required' } };
      } else {
        lineError = {
          ...lineError,
          promise: { isError: false, errorMessage: undefined }
        };
      }
      return lineError;
    }) as ILineError[];
    setLinesError(newLinesError)
    return newLinesError;
  }

  const validateForm = (): boolean => {
    if (vm.QuestionMatchingOptions.length < 2) {
      setError('You need at least 2 options');
      return false;
    }
    setError('');
    return true;
  }

  useEffect(() => {
    vm.MatchingQvalidation = validate;
  }, [])


  const removeOption = (index: number) => {
    if (vm.QuestionMatchingOptions[index].Guid) {
      vm.QuestionDeletedOptions = [...vm.QuestionDeletedOptions, vm.QuestionMatchingOptions[index]]
      // vm.QuestionDeletedPromises = [...vm.QuestionDeletedPromises, vm.QuestionMatchingPromises[index]]
    }
    let newOptions = vm.QuestionMatchingOptions.filter((_, i) => i !== index);
    let newPromises = vm.QuestionMatchingPromises.filter((_, i) => i !== index);
    newOptions = newOptions.map((option, i) => {
      option.order = i + 1;
      return option;
    })
    newPromises = newPromises.map((option, i) => {
      option.order = i + 1;
      return option;
    })
    vm.QuestionMatchingOptions = newOptions;
    vm.QuestionMatchingPromises = newPromises;
  }


  return (
    <Stack tokens={{ childrenGap: "1em" }} styles={{ root: { width: '100%' } } as IStackStyles}>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(undefined)}>{error}</MessageBar>
      )}
      {vm.QuestionMatchingOptions && vm.QuestionMatchingOptions.map((option, index) => (
        <MatchingQuestionOption
          key={option.Guid || index}
          option={option}
          promise={option.Guid ? vm.QuestionMatchingPromises.find(p => p.correctOption === option.Guid) ?? {} as IPromise : vm.QuestionMatchingPromises[index]}
          lineError={linesError[index]}
          index={index}
          promiseIndex={option.Guid ? vm.QuestionMatchingPromises.findIndex(p => p.correctOption === option.Guid) : index}
          removeOption={removeOption}
          validateInput={validateInput}
        />
      ))}
      {!vm.isReadOnly &&
        (vm.QuestionMatchingOptions.length < 5 && (
          <Stack.Item order={vm.QuestionMatchingOptions.length + 2} styles={{ root: { marginLeft: '2em' } }}>
            <Stack
              horizontal
              verticalAlign='center'
              horizontalAlign='start'
              styles={{ root: { width: '78%', marginInlineEnd: '0.5em', marginInlineStart: "0.5em", } } as IStackStyles}
              tokens={{ childrenGap: '0.5em' }}
            >
              <Stack horizontal verticalAlign='center' styles={{ root: { paddingLeft: '4px', paddingRight: '4px', height: '2em' } }}>
                <ActionButton styles={{ root: { color: '#999', height: 'fit-content', margin: 0, padding: 0 } }} onClick={() => {
                  let id = newId();
                  vm.QuestionMatchingOptions = [...vm.QuestionMatchingOptions, { title: '', order: vm.QuestionMatchingOptions.length > 0 ? vm.QuestionMatchingOptions[vm.QuestionMatchingOptions.length - 1].order + 1 : 1, id: id, isCorrect: false, isOther: false }]
                  vm.QuestionMatchingPromises = [...vm.QuestionMatchingPromises, { title: '', order: vm.QuestionMatchingPromises.length > 0 ? vm.QuestionMatchingPromises[vm.QuestionMatchingPromises.length - 1].order + 1 : 1, id: id, correctOption: { ...vm.QuestionMatchingOptions.find((option) => { option.id == id }) || {} as IOption }.Guid! }]
                }}>Add option</ActionButton>
              </Stack>
            </Stack>
          </Stack.Item >
        ))
      }
    </Stack >
  )
}


export default observer(MatchingQuestion);

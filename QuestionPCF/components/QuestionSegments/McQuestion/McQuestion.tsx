import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Checkbox,
  IStackStyles,
  Stack,
  Text,
  ActionButton,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { useVM } from '../../../viewModels/context';
import { IOption } from '../../../cdsService/cdsSerivce';
import { IOptionError, newId } from '../ScQuestion/ScQuestion';
import McqOption from './McqOption';


const McQuestion = () => {
  const vm = useVM();
  const [isThereOther, setIsThereOther] = useState<boolean>(vm.QuestionMCOptions.some((o) => o.isOther));
  const [isThereAllofabove, setIsThereAllofabove] = useState<boolean>(vm.QuestionMCOptions.some((o) => o.isOther && o.title == "All of the above"));
  const [isThereNoneofabove, setIsThereNoneofabove] = useState<boolean>(vm.QuestionMCOptions.some((o) => o.isOther && o.title == "None of the above"));
  const [error, setError] = useState<string>();
  const [optionsError, setOptionsError] = useState<IOptionError[]>(vm.QuestionMCOptions.map(() => ({} as IOptionError)));

  const validate = useCallback(() => {
    const inputs = validateInputs();
    const form = validateForm();
    if (!form || !inputs) return false;
    return true;
  }, [])

  const validateInputs = () => {
    let newOptionsError = vm.QuestionMCOptions.map((option) => {
      let optionError: IOptionError = { isError: false, errorMessage: undefined };
      if ((option.title == undefined || option.title == '' || !option.title) &&
        (option.imageUrl == undefined || option.imageUrl == '' || !option.imageUrl)) {
        optionError = { isError: true, errorMessage: 'Option title is required' };
        return optionError;
      }
      optionError = { isError: false, errorMessage: undefined };
      return optionError;
    }) as IOptionError[];
    setOptionsError(newOptionsError)
    if (newOptionsError.some(o => o.isError)) return false
    return true;
  }

  const validateInput = (index: number) => {
    setOptionsError(prev => {
      let newOptionsError = prev.map((optionError, i) => {
        if (i == index) {
          let optionError: IOptionError = { isError: false, errorMessage: undefined };
          if (vm.QuestionMCOptions[index].title == undefined || vm.QuestionMCOptions[index].title == '' || !vm.QuestionMCOptions[index].title) {
            optionError = { isError: true, errorMessage: 'Option title is required' };
            return optionError;
          }
          optionError = { isError: false, errorMessage: undefined };
          return optionError;
        }
        return optionError;
      })
      return newOptionsError
    })
  }

  const validateForm = () => {
    if (vm.QuestionMCOptions.length < 2) {
      setError('You need at least 2 options');
      return false;
    }
    if (vm.QuestionMCOptions.filter((o) => o.isCorrect).length < 1) {
      setError('There must be at least one correct option')
      return false
    }
    if (vm.QuestionMCOptions.some(o => o.isOther) && vm.QuestionMCOptions.length < 3) {
      setError('You need at least 2 options other than "Other"')
      return false
    }
    setError('');
    return true;
  }

  useEffect(() => {
    if (!vm.MCQvalidation) { vm.MCQvalidation = validate; }
  }, [])

  const removeOption = (option: IOption, index: number) => {
    if (vm.QuestionMCOptions[index].Guid) {
      vm.QuestionDeletedOptions = [...vm.QuestionDeletedOptions, vm.QuestionMCOptions[index]]
    }
    let newOptions = vm.QuestionMCOptions.filter((_, i) => i !== index);
    newOptions = newOptions.map((option, i) => {
      option.order = i + 1;
      return option;
    })
    vm.QuestionMCOptions = newOptions;
    setOptionsError(prev => {
      let newErrors = [...prev]
      newErrors = newErrors.filter((_, i) => i !== index)
      return newErrors;
    })
    if (option.isOther && option.title == "None of the above") {
      setIsThereNoneofabove(false);
      if (!isThereAllofabove) setIsThereOther(false)
    }
    if (option.isOther && option.title == "All of the above") {
      setIsThereAllofabove(false);
      if (!isThereNoneofabove) setIsThereOther(false)
    }
  }

  return (
    <Stack tokens={{ childrenGap: "1em" }} styles={{ root: { width: '100%' } } as IStackStyles}>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(undefined)}>{error}</MessageBar>
      )}
      {vm.QuestionMCOptions && vm.QuestionMCOptions.map((option, index) => (
        <McqOption
          key={option.Guid || index}
          option={option}
          index={index}
          removeOption={removeOption}
          optionError={optionsError[index]}
          isThereOther={isThereOther}
          isThereAllofabove={isThereAllofabove}
          isThereNoneofabove={isThereNoneofabove}
          validateInput={validateInput}
        />
      ))}
      {!vm.isReadOnly &&
        (vm.QuestionMCOptions.length < 5 && (
          <Stack.Item order={vm.QuestionMCOptions.length + 2} styles={{ root: { marginLeft: '2em' } }}>
            <Stack
              horizontal
              verticalAlign='center'
              horizontalAlign='start'
              styles={{ root: { width: '100%', marginInlineEnd: '0.5em', marginInlineStart: "0.5em", } } as IStackStyles}
              tokens={{ childrenGap: '0.5em' }}
            >
              <Checkbox disabled />
              <Stack horizontal verticalAlign='center' styles={{ root: { paddingLeft: '4px', paddingRight: '4px', height: '2em' } }}>
                <ActionButton styles={{ root: { color: '#999', height: 'fit-content', margin: 0, padding: 0 } }} onClick={() => {
                  if (isThereOther) {
                    if (isThereAllofabove && isThereNoneofabove) {
                      let newOptions = [...vm.QuestionMCOptions]
                      newOptions[newOptions.length - 1].order++;
                      newOptions[newOptions.length - 2].order++;
                      newOptions = [...newOptions, { order: vm.QuestionMCOptions[vm.QuestionMCOptions.length - 2].order - 1, isCorrect: false, title: '', id: newId(), isOther: false } as IOption]
                      newOptions.sort((a, b) => a.order - b.order);
                      vm.QuestionMCOptions = newOptions;
                      return
                    }
                    let newOptions = [...vm.QuestionMCOptions]
                    newOptions[newOptions.length - 1].order++;
                    newOptions = [...newOptions, { order: vm.QuestionMCOptions[vm.QuestionMCOptions.length - 1].order - 1, isCorrect: false, title: '', id: newId(), isOther: false } as IOption]
                    newOptions.sort((a, b) => a.order - b.order);
                    vm.QuestionMCOptions = newOptions;
                    return
                  }
                  vm.QuestionMCOptions = [...vm.QuestionMCOptions, { order: vm.QuestionMCOptions.length > 0 ? vm.QuestionMCOptions[vm.QuestionMCOptions.length - 1].order + 1 : 1, isCorrect: false, title: '', id: newId(), isOther: false } as IOption]
                }}>Add option</ActionButton>
                {!isThereNoneofabove && vm.QuestionMCOptions.length > 1 && (
                  <>
                    <Text styles={{ root: { height: 'fit-content' } }}> or </Text>
                    <ActionButton styles={{ root: { color: '#0c6baf', height: 'fit-content', margin: 0, padding: 0 } }} onClick={() => {
                      vm.QuestionMCOptions = [
                        ...vm.QuestionMCOptions, {
                          order: vm.QuestionMCOptions[vm.QuestionMCOptions.length - 1].order + 1,
                          title: "None of the above",
                          isCorrect: false,
                          isOther: true,
                          id: newId()
                        } as IOption
                      ]
                      setIsThereOther(true);
                      setIsThereNoneofabove(true);
                    }}>&quot;None of the above&quot;</ActionButton>
                  </>
                )}
                {!isThereAllofabove && vm.QuestionMCOptions.length > 1 && (
                  <>
                    <Text styles={{ root: { height: 'fit-content' } }}> or </Text>
                    <ActionButton styles={{ root: { color: '#0c6baf', height: 'fit-content', margin: 0, padding: 0 } }} onClick={() => {
                      vm.QuestionMCOptions = [
                        ...vm.QuestionMCOptions, {
                          order: vm.QuestionMCOptions[vm.QuestionMCOptions.length - 1].order + 1,
                          title: "All of the above",
                          isCorrect: false,
                          isOther: true,
                          id: newId()
                        } as IOption
                      ]
                      setIsThereOther(true);
                      setIsThereAllofabove(true);
                    }}>&quot;All of the above&quot;</ActionButton>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack.Item >
        ))
      }
    </Stack >
  )
}

export default observer(McQuestion);

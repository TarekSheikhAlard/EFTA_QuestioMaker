import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  IStackStyles,
  makeStyles,
  Stack,
  Text,
  ActionButton,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { useVM } from '../../../viewModels/context';
import ScqOption from './ScqOption';
import { IOption } from '../../../cdsService/cdsSerivce';

const useStyles = makeStyles({
  showOnHover: {
    ' .showAndHide': {
      display: 'none',
      TransitionEvent: 'display 0.5s ease-in-out',
    },
    ':hover .showAndHide': {
      display: 'block',
      TransitionEvent: 'display 0.5s ease-in-out',
    }
  },
  radioButtonInput: {
    height: '2em',
    width: '1.5em',
    margin: '0 !important',
    marginLeft: '0.1em',
    marginRight: '0.1em',
  }
})

export interface IOptionError {
  isError: boolean,
  errorMessage: string | undefined
}

const MsQuestion = () => {
  const styles = useStyles();
  const vm = useVM();
  const [isThereOther, setIsThereOther] = useState<boolean>(vm.QuestionSCOptions.some((o) => o.isOther));
  const [isThereAllofabove, setIsThereAllofabove] = useState<boolean>(vm.QuestionSCOptions.some((o) => o.isOther && o.title == "All of the above"));
  const [isThereNoneofabove, setIsThereNoneofabove] = useState<boolean>(vm.QuestionSCOptions.some((o) => o.isOther && o.title == "None of the above"));
  const [optionsError, setOptionsError] = useState<IOptionError[]>(vm.QuestionSCOptions.map(() => ({} as IOptionError)));
  const [error, setError] = useState<string>();

  const validate = useCallback(() => {
    const inputs = validateInputs();
    const form = validateForm();
    if (!inputs || !form) return false;
    return true;
  }, [])

  const validateInputs = () => {
    let newOptionsError = vm.QuestionSCOptions.map((option) => {
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
  };

  const validateInput = (index: number) => {
    setOptionsError(prev => {
      let newOptionsError = prev.map((optionError, i) => {
        if (i == index) {
          let optionError: IOptionError = { isError: false, errorMessage: undefined };
          if (vm.QuestionSCOptions[index].title == undefined || vm.QuestionSCOptions[index].title == '' || !vm.QuestionSCOptions[index].title) {
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
  };

  const validateForm = () => {
    if (vm.QuestionSCOptions.length < 2) {
      setError('You need at least 2 options');
      return false;
    }
    if (vm.QuestionSCOptions.filter((o) => o.isCorrect).length < 1) {
      setError('There must be one correct option')
      return false
    }
    if (vm.QuestionSCOptions.some(o => o.isOther) && vm.QuestionSCOptions.length < 3) {
      setError('You need at least 2 options other than "Other"')
      return false
    }
    setError('');
    return true;
  };

  useEffect(() => {
    if (!vm.SCQvalidation) { vm.SCQvalidation = validate; }
  }, [])

  const removeOption = (option: IOption, index: number) => {
    if (vm.QuestionSCOptions[index].Guid) {
      vm.QuestionDeletedOptions = [...vm.QuestionDeletedOptions, vm.QuestionSCOptions[index]]
    }
    let newOptions = vm.QuestionSCOptions.filter((_, i) => i !== index);
    newOptions = newOptions.map((option, i) => {
      option.order = i + 1;
      return option;
    })
    vm.QuestionSCOptions = newOptions;
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
      {vm.QuestionSCOptions && vm.QuestionSCOptions.map((option, index) => (
        <ScqOption
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
      {!vm.isReadOnly && (
        vm.QuestionSCOptions.length < 5 && (
          <Stack.Item order={vm.QuestionSCOptions.length + 2} styles={{ root: { marginLeft: '2em' } }}>
            <Stack
              horizontal
              verticalAlign='center'
              horizontalAlign='start'
              styles={{ root: { width: '100%', marginInlineEnd: '0.5em', marginInlineStart: "0.5em", } } as IStackStyles}
              tokens={{ childrenGap: '0.5em' }}
            >
              <Stack horizontalAlign='center' verticalAlign='center' disableShrink >
                <input type="radio" disabled className={styles.radioButtonInput} />
              </Stack>
              <Stack horizontal verticalAlign='center' styles={{ root: { paddingLeft: '4px', paddingRight: '4px', height: '2em' } }}>
                <ActionButton styles={{ root: { color: '#999', height: 'fit-content', margin: 0, padding: 0 } }} onClick={() => {
                  if (isThereOther) {
                    if (isThereAllofabove && isThereNoneofabove) {
                      let newOptions = [...vm.QuestionSCOptions]
                      newOptions[newOptions.length - 1].order++;
                      newOptions[newOptions.length - 2].order++;
                      newOptions = [...newOptions, { order: vm.QuestionSCOptions[vm.QuestionSCOptions.length - 2].order - 1, isCorrect: false, title: '', id: newId(), isOther: false } as IOption]
                      newOptions.sort((a, b) => a.order - b.order);
                      vm.QuestionSCOptions = newOptions;
                      return
                    }
                    let newOptions = [...vm.QuestionSCOptions]
                    newOptions[newOptions.length - 1].order++;
                    newOptions = [...newOptions, { order: vm.QuestionSCOptions[vm.QuestionSCOptions.length - 1].order - 1, isCorrect: false, title: '', id: newId(), isOther: false } as IOption]
                    newOptions.sort((a, b) => a.order - b.order);
                    vm.QuestionSCOptions = newOptions;
                    return
                  }
                  vm.QuestionSCOptions = [...vm.QuestionSCOptions, { order: vm.QuestionSCOptions.length > 0 ? vm.QuestionSCOptions[vm.QuestionSCOptions.length - 1].order + 1 : 1, isCorrect: false, title: '', id: newId(), isOther: false } as IOption]
                }}>Add option</ActionButton>
                {!isThereNoneofabove && vm.QuestionSCOptions.length > 1 && (
                  <>
                    <Text styles={{ root: { height: 'fit-content' } }}> or </Text>
                    <ActionButton styles={{ root: { color: '#0c6baf', height: 'fit-content', margin: 0, padding: 0 } }} onClick={() => {
                      vm.QuestionSCOptions = [
                        ...vm.QuestionSCOptions, {
                          order: vm.QuestionSCOptions[vm.QuestionSCOptions.length - 1].order + 1,
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
                {!isThereAllofabove && vm.QuestionSCOptions.length > 1 && (
                  <>
                    <Text styles={{ root: { height: 'fit-content' } }}> or </Text>
                    <ActionButton styles={{ root: { color: '#0c6baf', height: 'fit-content', margin: 0, padding: 0 } }} onClick={() => {
                      vm.QuestionSCOptions = [
                        ...vm.QuestionSCOptions, {
                          order: vm.QuestionSCOptions[vm.QuestionSCOptions.length - 1].order + 1,
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
        )
      )}
    </Stack >
  )
};

export const newId = (): string => {
  return Math.random().toString(36).substring(2, 9);
}

export default observer(MsQuestion);

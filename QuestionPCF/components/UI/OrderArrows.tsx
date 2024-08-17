import { IButtonStyles, IconButton, Stack } from '@fluentui/react';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { axa_questiontype } from '../../cds-generated/enums/axa_questiontype';
import { useVM } from '../../viewModels/context';


const OrderArrows = ({ order, isOther, index, isThereOther, isThereTwoOther }: { isThereOther?: boolean; isThereTwoOther?: boolean; order: number, isOther?: boolean, index: number }) => {
  const vm = useVM();
  const length = useMemo(() => {
    if (vm.QuestionType == axa_questiontype.Matching) return vm.QuestionMatchingOptions.length;
    else if (vm.QuestionType == axa_questiontype.MCQ) return vm.QuestionMCOptions.length;
    else return vm.QuestionSCOptions.length;
  }, [vm.QuestionType, vm.QuestionMatchingOptions.length, vm.QuestionMCOptions.length, vm.QuestionSCOptions.length])

  const moveFunction = (direction: "up" | "down") => {
    const newOptions = vm.QuestionType == axa_questiontype.MCQ ? [...vm.QuestionMCOptions] : vm.QuestionType == axa_questiontype.SCQ ? [...vm.QuestionSCOptions] : [...vm.QuestionMatchingOptions];
    if (direction == "up") {
      newOptions[index].order -= 1;
      newOptions[index - 1].order += 1;
      newOptions.sort((a, b) => a.order - b.order);
      if (vm.QuestionType == axa_questiontype.Matching) {
        const newPromises = [...vm.QuestionMatchingPromises];
        newPromises[index].order -= 1;
        newPromises[index - 1].order += 1;
        newPromises.sort((a, b) => a.order - b.order);
        vm.QuestionMatchingPromises = newPromises;
      }
    } else {
      newOptions[index].order += 1;
      newOptions[index + 1].order -= 1;
      newOptions.sort((a, b) => a.order - b.order);
      if (vm.QuestionType == axa_questiontype.Matching) {
        const newPromises = [...vm.QuestionMatchingPromises];
        newPromises[index].order += 1;
        newPromises[index + 1].order -= 1;
        newPromises.sort((a, b) => a.order - b.order);
        vm.QuestionMatchingPromises = newPromises;
      }
    }
    if (vm.QuestionType == axa_questiontype.MCQ) vm.QuestionMCOptions = newOptions;
    if (vm.QuestionType == axa_questiontype.SCQ) vm.QuestionSCOptions = newOptions;
    if (vm.QuestionType == axa_questiontype.Matching) vm.QuestionMatchingOptions = newOptions;
  }

  return (
    <>
      {order > 1 && !isOther && (
        <Stack.Item grow>
          <IconButton className="showAndHide" styles={{ root: { height: '40%' } } as IButtonStyles} iconProps={{ iconName: 'ChevronUp', styles: { root: { color: 'black' } } }} onClick={() => moveFunction('up')} />
        </Stack.Item>
      )}
      {isThereOther ? isThereTwoOther ? (
        order < length - 2 && !isOther && (
          <Stack.Item grow>
            <IconButton className="showAndHide" styles={{ root: { height: '40%' } } as IButtonStyles} iconProps={{ iconName: 'ChevronDown', styles: { root: { color: 'black' } } }} onClick={() => moveFunction('down')} />
          </Stack.Item>
        )
      ) : (
        order < length - 1 && !isOther && (
          <Stack.Item grow>
            <IconButton className="showAndHide" styles={{ root: { height: '40%' } } as IButtonStyles} iconProps={{ iconName: 'ChevronDown', styles: { root: { color: 'black' } } }} onClick={() => moveFunction('down')} />
          </Stack.Item>
        )
      ) : (
        order < length && !isOther && (
          <Stack.Item grow>
            <IconButton className="showAndHide" styles={{ root: { height: '40%' } } as IButtonStyles} iconProps={{ iconName: 'ChevronDown', styles: { root: { color: 'black' } } }} onClick={() => moveFunction('down')} />
          </Stack.Item>
        )
      )}
    </>
  )
}


export default observer(OrderArrows);

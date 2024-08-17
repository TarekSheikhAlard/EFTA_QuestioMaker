import React from 'react';
import { observer } from "mobx-react-lite"
import { ISpinButtonStyles, SpinButton, } from '@fluentui/react';
import { useVM } from '../../viewModels/context';

//TODO make the TextFields have icons in them to show what they are for
//TODO use SpinButton for Time input

const QuestionOptions = ({ field, width = "75%" }: { field: "time" | "points", width?: string }) => {
  const vm = useVM();
  const [suffix,] = React.useState(field === "time" ? " Min" : " Points");

  const min = 0;
  const max = 100;
  const step = 1;

  /** Remove the suffix or any other text after the numbers, or return undefined if not a number */
  const getNumericPart = (value: string): number | undefined => {
    const valueRegex = /^(\d+(\.\d+)?).*/;
    if (valueRegex.test(value)) {
      const numericValue = Number(value.replace(valueRegex, '$1'));
      return isNaN(numericValue) ? undefined : numericValue;
    }
    return undefined;
  };

  /** Increment the value (or return nothing to keep the previous value if invalid) */
  const onIncrement = (value: string, _event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      return String(Math.min(numericValue + step, max)) + suffix;
    }
  };

  /** Decrement the value (or return nothing to keep the previous value if invalid) */
  const onDecrement = (value: string, _event?: React.SyntheticEvent<HTMLElement>): string | void => {
    const numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      return String(Math.max(numericValue - step, min)) + suffix;
    }
  };

  /**
   * Clamp the value within the valid range (or return nothing to keep the previous value
   * if there's not valid numeric input)
   */
  const onValidate = (value: string, _event?: React.SyntheticEvent<HTMLElement>): string | void => {
    let numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
      numericValue = Math.min(numericValue, max);
      numericValue = Math.max(numericValue, min);
      return String(numericValue) + suffix;
    }
  };


  return (
    <SpinButton
      placeholder='Time'
      defaultValue={(() => {
        return vm.QuestionTime ? vm.QuestionTime.toString() + suffix : '0' + suffix
      })()}
      max={max}
      min={min}
      disabled={vm.isReadOnly}
      step={1}
      onValidate={onValidate}
      onIncrement={(value: string, event?: React.SyntheticEvent<HTMLElement>) => onIncrement(value, event)}
      onChange={(_event?: React.SyntheticEvent<HTMLElement>, value?: string) => {
        if (value === undefined) return;
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
          vm.QuestionTime = Math.min(numericValue, max);
        }
      }}
      onDecrement={(value: string, event?: React.SyntheticEvent<HTMLElement>) => onDecrement(value, event)}
      styles={{ root: { width: width } } as ISpinButtonStyles}
    />
  )
}

export default observer(QuestionOptions);

import { IStackStyles, Stack, TextField } from '@fluentui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useVM } from '../../viewModels/context';

const CalcQuestion = () => {
  const vm = useVM();
  const [maxError, setMaxError] = React.useState('');
  const [minError, setMinError] = React.useState('');

  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const validate = (): boolean => {
    let isError: boolean = false;
    const isThereMax = vm.QuestionMax != undefined;
    const isThereMin = vm.QuestionMin != undefined;
    const min: any = vm.QuestionMin;
    const max: any = vm.QuestionMax;
    if (!isThereMin) {
      setErrors({ min: 'Required!' })
      isError = true;
    }
    if (!isThereMax) {
      setErrors({ max: 'Required!' })
      isError = true;
    }
    if (isError) return false;
    if (max < min) {
      setErrors({
        max: 'Max value cannot be smaller than Min value',
        min: 'Min value cannot be greater than Max value'
      })
      return false
    }
    setErrors({})
    return true
  }

  const setErrors = ({ min, max }: { min?: string, max?: string }) => {
    setMaxError(max ? max : '')
    setMinError(min ? min : '')
    forceUpdate();
  }

  React.useEffect(() => {
    if (vm.CalcQvalidation == undefined) { vm.CalcQvalidation = validate; }
  }, [])


  const maxChangeHandler = (_e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => {
    if (value == undefined) return;
    const min = vm.QuestionMin;
    if (!min) {
      vm.QuestionMax = Number.parseFloat(value);
      return
    }
    if (min > Number.parseFloat(value)) {
      setMaxError('Max value cannot be smaller than Min value')
    } else { setErrors({}); }
    vm.QuestionMax = Number.parseFloat(value);
  }

  const minChangeHandler = (_e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => {
    if (value == undefined) return;
    const max = vm.QuestionMax;
    if (!max) {
      vm.QuestionMin = Number.parseFloat(value);
      return
    }
    if (max < Number.parseFloat(value)) {
      setMinError('Min value cannot be greater than Max Value')
    } else { setErrors({}); }
    vm.QuestionMin = Number.parseFloat(value);
  }

  return (
    <Stack horizontal tokens={{ childrenGap: "0.5em" }} styles={{ root: { width: "100%" } } as IStackStyles}>
      <TextField
        type='number'
        prefix='Max'
        errorMessage={maxError}
        required
        readOnly={vm.isReadOnly}
        placeholder='Maximum Value'
        onChange={maxChangeHandler}
        value={vm.QuestionMax?.toString()}
        styles={{ root: { width: '100%' } }}
      />
      <TextField
        type='number'
        prefix='Min'
        readOnly={vm.isReadOnly}
        errorMessage={minError}
        placeholder='Minimum Value'
        required
        onChange={minChangeHandler}
        value={vm.QuestionMin?.toString()}
        styles={{ root: { width: '100%' } }}
      />
    </Stack>
  )
}

export default observer(CalcQuestion);

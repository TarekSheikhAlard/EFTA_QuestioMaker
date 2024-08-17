import { ITextFieldStyles, Stack, TextField } from '@fluentui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { useVM } from '../../viewModels/context';

const DateQuestion = () => {
  const vm = useVM();
  const [error, setError] = React.useState('');
  const [, update] = React.useState({});
  const forceUpdate = React.useCallback(() => update({}), []);

  const validate = (value?: string): boolean => {
    const date = value ? value : vm.QuestionDateAnswer;
    if (date === '' || date === undefined) {
      setError('');
      setError('Please enter a date');
      return false;
    }
    setError('');
    forceUpdate();
    return true;
  }

  React.useEffect(() => {
    if (!vm.DateQvalidation) {
      vm.DateQvalidation = validate;
    }
  }, [])

  const onChangeHandler = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    if (!newValue) return
    if (validate(newValue)) {
      vm.QuestionDateAnswer = newValue;
    }
  }

  return (
    <Stack styles={{ root: { width: '100%' } }}>
      <TextField
        label='Answer'
        underlined
        required
        type='date'
        readOnly={vm.isReadOnly}
        errorMessage={error}
        value={vm.QuestionDateAnswer?.toString()}
        onChange={onChangeHandler}
        styles={{ root: { width: 'fit-content' } } as ITextFieldStyles}
      />
    </Stack>
  )
}


export default observer(DateQuestion);

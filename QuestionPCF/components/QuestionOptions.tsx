import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite"
import { Dropdown, Icon, IDropdownOption, IDropdownStyles, makeStyles, Stack, Toggle, TooltipHost, } from '@fluentui/react';
import { useVM } from '../viewModels/context';
import CustomSpinButton from './UI/CustomSpinButton';
import { axa_questiontype } from '../cds-generated/enums/axa_questiontype';
import { axa_difficulty } from '../cds-generated/enums/axa_difficulty';

const useStyles = makeStyles({
  container: {
    border: '1px solid #ccc',
    borderRadius: '2px',
    boxSizing: 'border-box',
    padding: '1em',
    width: '13em',
  }
})


const QuestionOptions = () => {
  const vm = useVM();
  const styles = useStyles();

  const validate = () => {
    return true;
  };

  const difficulties = React.useMemo(() => {
    return Object.entries(axa_difficulty).map(([key, value]) => {
      if (typeof value !== 'string') return;
      return { key, text: value as string }
    }).filter((x): x is { key: string, text: string } => x !== undefined);
  }, []);

  const dropdownChangeHandler = (_e: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (!option) return;
    vm.QuestionDifficulty = option.key as unknown as number as axa_difficulty;
  }

  useEffect(() => { if (!vm.OptionsValidate) { vm.OptionsValidate = validate; } }, [])

  return (
    <Stack className={styles.container} tokens={{ childrenGap: '0.5em' }}>
      <Stack horizontal tokens={{ childrenGap: '0.5em' }}>
        <Stack styles={{ root: { width: '2em', margin: 'auto' } }}>
          <TooltipHost content='Time'>
            <Icon iconName='Stopwatch' styles={{ root: { fontSize: '20px', margin: 'auto', userSelect: 'none' } }} />
          </TooltipHost>
        </Stack>
        <CustomSpinButton field="time" width="75%" />
      </Stack>
      <Stack horizontal tokens={{ childrenGap: '0.5em' }}>
        <Stack styles={{ root: { width: '2em', margin: 'auto' } }}>
          <TooltipHost content='Difficulty'>
            <Icon iconName='Weights' styles={{ root: { fontSize: '20px', margin: 'auto', userSelect: 'none' } }} />
          </TooltipHost>
        </Stack>
        <Dropdown
          placeholder="Choose"
          options={difficulties}
          disabled={vm.isReadOnly}
          defaultSelectedKey={vm.QuestionDifficulty ? difficulties.find(x => x.key === vm.QuestionDifficulty?.toString())?.key : axa_difficulty.Easy.toString()}
          onChange={dropdownChangeHandler}
          styles={{ root: { width: '75%' }, title: { textAlign: 'start' } } as IDropdownStyles}
        />
      </Stack>
      {(vm.QuestionType == axa_questiontype.MCQ ||
        vm.QuestionType == axa_questiontype.SCQ ||
        vm.QuestionType == axa_questiontype.Matching) && (
          <Stack horizontal tokens={{ childrenGap: '0.5em' }}>
            <Stack styles={{ root: { width: '2em', margin: 'auto' } }} disableShrink >
              <TooltipHost content='Enable Shuffle'>
                <Icon iconName='Sort' styles={{ root: { fontSize: '20px', margin: 'auto', userSelect: 'none' } }} />
              </TooltipHost>
            </Stack>
            <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { width: '75%' } }}>
              <Toggle
                checked={vm.QuestionIsShuffle}
                onChange={(_e, checked) => { if (vm.isReadOnly) return; vm.QuestionIsShuffle = checked ? checked : false; }}
                styles={{ root: { margin: '0' } }}
              />
            </Stack>
          </Stack>
        )}
    </Stack >
  )
}

export default observer(QuestionOptions);

import React from 'react';
import { observer } from 'mobx-react';
import { useVM } from '../../viewModels/context';
import { makeStyles, MessageBar, MessageBarType, Stack } from '@fluentui/react';
import TopSegment from './TopSegment';
import { axa_questiontype } from '../../cds-generated/enums/axa_questiontype';
import HorizontalDivider from '../UI/HorizontalDivider';
import DateQuestion from './DateQuestion';
import CalcQuestion from './CalcQuestion';
import McQuestion from './McQuestion/McQuestion';
import ScQuestion from './ScQuestion/ScQuestion';
import MatchingQuestion from './MatchingQuestion/MatchingQuestion';

const useStyles = makeStyles({
  container: {
    border: '1px solid #ccc',
    borderRadius: '2px',
    padding: '1em'
  }
})

const QuestionContainer = () => {
  const vm = useVM();
  const styles = useStyles();


  return (
    <Stack className={styles.container} verticalAlign='center' horizontalAlign='center' tokens={{ childrenGap: "1em", maxWidth: "800px" }} style={{ width: "calc(100% - 14rem)" }}>
      <TopSegment />
      {vm.errorMessage && (
        <MessageBar messageBarType={MessageBarType.error}>{vm.errorMessage}</MessageBar>
      )}
      {(vm.QuestionType != axa_questiontype.Theory) && (
        <HorizontalDivider />
      )}
      {
        (vm.QuestionType == axa_questiontype.Theory) ? (
          <></>
        ) : (vm.QuestionType == axa_questiontype.Date) ? (
          <DateQuestion />
        ) : vm.QuestionType == axa_questiontype.Calculation ? (
          <CalcQuestion />
        ) : vm.QuestionType == axa_questiontype.SCQ ? (
          <ScQuestion />
        ) : vm.QuestionType == axa_questiontype.MCQ ? (
          <McQuestion />
        ) : vm.QuestionType == axa_questiontype.Matching && (
          <MatchingQuestion />
        )
      }
    </Stack >
  );
};

export default observer(QuestionContainer);

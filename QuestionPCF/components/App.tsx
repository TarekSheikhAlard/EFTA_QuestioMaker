import { observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { MessageBar, MessageBarType, Spinner, Stack, } from '@fluentui/react';
import QuestionsVM, { serviceProviderName } from '../viewModels/QuestionsVM';
import ContextProvider from '../viewModels/context';
import QuestionContainer from './QuestionSegments/QuestionContainer';
import QuestionOptions from './QuestionOptions';
import ServiceProvider from '../ServiceProvider';
import './globals.css'

export interface props {
  isReadOnly: boolean;
  serviceProvider: ServiceProvider,
  entityId?: string;
}

const App = ({ serviceProvider, entityId, isReadOnly }: props) => {
  const VM = serviceProvider.get<QuestionsVM>(serviceProviderName);
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  useEffect(() => {
    VM.forceUpdate = forceUpdate;
  }, [VM.errorMessage])

  useEffect(() => {
    VM.isReadOnly = isReadOnly
  }, [isReadOnly])

  useEffect(() => {
    VM.EntityId = entityId || '';
    VM.init();
  }, [entityId])

  return (
    <ContextProvider value={VM} >
      <Stack tokens={{ childrenGap: "1em" }} className="my-class">
        {!VM.isMounted && VM.PCFerror ? (
          <MessageBar messageBarType={MessageBarType.blocked} isMultiline={true} >
            {VM.PCFerror}
          </MessageBar>
        ) : VM.isLoading ? (
          <>
            <Spinner label="Loading..." styles={{ root: { margin: '5rem' } }} />
          </>
        ) : (
          <>
            {VM.PCFerror && (
              <MessageBar messageBarType={MessageBarType.error} isMultiline={true} onDismiss={() => { VM.PCFerror = undefined; forceUpdate() }}>
                {VM.errorMessage}
              </MessageBar>
            )}
            {VM.errorMessage && (
              <MessageBar messageBarType={MessageBarType.error} isMultiline={true} onDismiss={() => { VM.errorMessage = undefined; forceUpdate() }}>
                {VM.errorMessage}
              </MessageBar>
            )}
            <Stack horizontal verticalAlign='start' horizontalAlign='start' tokens={{ childrenGap: "1em" }} styles={{ root: { width: '100%' } }} >
              <QuestionContainer />
              <QuestionOptions />
            </Stack>
          </>
        )}
      </Stack>
    </ContextProvider >
  )
}

export default observer(App);

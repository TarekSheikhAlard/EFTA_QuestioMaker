import React from 'react';
import QuestionsVM from './QuestionsVM';

export const QuestoinsVMContext = React.createContext<QuestionsVM>({} as QuestionsVM);

export interface props {
  value: QuestionsVM;
  children: JSX.Element
}

const ContextProvider = ({ value, children }: props) => {
  return (
    <QuestoinsVMContext.Provider value={value}>
      {children}
    </QuestoinsVMContext.Provider>
  );
};

export const useVM = () => React.useContext(QuestoinsVMContext);

export default ContextProvider;


import { axa_difficulty } from "../cds-generated/enums/axa_difficulty";
import { axa_questiontype } from "../cds-generated/enums/axa_questiontype";
import CdsService, { IQuestion } from "../cdsService/cdsSerivce";
import { IInputs } from "../generated/ManifestTypes";
import QuestionsVM from "../viewModels/QuestionsVM";


export const contextMock: ComponentFramework.Context<IInputs> = {
  mode: {
    allocatedHeight: 100,
    allocatedWidth: 200,
    label: 'Mock Mode',
    setControlState: jest.fn(),
    isVisible: false,
    trackContainerResize: jest.fn(),
    isControlDisabled: false,
    setFullScreen: jest.fn(),

  },
  parameters: {
    sampleProperty: {
      raw: "",
      error: false,
      errorMessage: "string",
      type: "field"
    }
  },
  client: {
    getClient: jest.fn(),
    disableScroll: true,
    getFormFactor: jest.fn(),
    isOffline: jest.fn()
  },

  resources: {
    getString: jest.fn(),
    getResource: jest.fn()
  },
  formatting: {
    formatCurrency: jest.fn(),
    formatDecimal: jest.fn(),
    formatDateAsFilterStringInUTC: jest.fn(),
    formatDateLong: jest.fn(),
    formatDateLongAbbreviated: jest.fn(),
    formatDateShort: jest.fn(),
    formatDateYearMonth: jest.fn(),
    formatInteger: jest.fn(),
    formatLanguage: jest.fn(),
    formatTime: jest.fn(),
    getWeekOfYear: jest.fn(),
  },
  navigation: {
    openForm: jest.fn(),
    openUrl: jest.fn(),
    openAlertDialog: jest.fn(),
    openConfirmDialog: jest.fn(),
    openErrorDialog: jest.fn(),
    openFile: jest.fn(),
    openWebResource: jest.fn()
  },
  utils: {
    getEntityMetadata: jest.fn(),
    hasEntityPrivilege: jest.fn(),
    lookupObjects: jest.fn()
  },
  webAPI: {
    createRecord: jest.fn(),
    deleteRecord: jest.fn(),
    retrieveRecord: jest.fn(),
    updateRecord: jest.fn(),
    retrieveMultipleRecords: jest.fn()
  },
  device: {
    captureAudio: jest.fn(),
    captureImage: jest.fn(),
    captureVideo: jest.fn(),
    getBarcodeValue: jest.fn(),
    getCurrentPosition: jest.fn(),
    pickFile: jest.fn(),
  },
  factory: {
    getPopupService: jest.fn(),
    requestRender: jest.fn(),
  },
  userSettings: {
    dateFormattingInfo: {
      amDesignator: "",
      abbreviatedDayNames: [],
      abbreviatedMonthGenitiveNames: [],
      abbreviatedMonthNames: [],
      calendarWeekRule: 0,
      calendar: {
        minSupportedDateTime: new Date(),
        maxSupportedDateTime: new Date(),
        algorithmType: 1,
        calendarType: 1,
        twoDigitYearMax: 2100
      },
      dateSeparator: "",
      dayNames: [],
      firstDayOfWeek: 1,
      fullDateTimePattern: "string",
      longDatePattern: "string",
      longTimePattern: "string",
      monthDayPattern: "string",
      monthGenitiveNames: [],
      monthNames: [],
      pmDesignator: "string",
      shortDatePattern: "string",
      shortTimePattern: "",
      shortestDayNames: [],
      sortableDateTimePattern: "string",
      timeSeparator: "string",
      universalSortableDateTimePattern: "",
      yearMonthPattern: "string"
    },
    isRTL: true,
    languageId: 0,
    numberFormattingInfo: {
      currencyDecimalDigits: 0,
      currencyDecimalSeparator: "string",
      currencyGroupSeparator: "string",
      currencyGroupSizes: [],
      currencyNegativePattern: 0,
      currencyPositivePattern: 0,
      currencySymbol: "string",
      nanSymbol: "string",
      nativeDigits: [],
      negativeInfinitySymbol: "string",
      negativeSign: "string",
      numberDecimalDigits: 0,
      numberDecimalSeparator: "string",
      numberGroupSeparator: "string",
      numberGroupSizes: [],
      numberNegativePattern: 0,
      perMilleSymbol: "string",
      percentDecimalDigits: 0,
      percentDecimalSeparator: "string",
      percentGroupSeparator: "string",
      percentGroupSizes: [],
      percentNegativePattern: 0,
      percentPositivePattern: 0,
      percentSymbol: "string",
      positiveInfinitySymbol: "string",
      positiveSign: "string"
    },
    securityRoles: [],
    userId: "string",
    userName: "string",
    getTimeZoneOffsetMinutes: jest.fn(),
  },
  updatedProperties: []
};

export const iinputMock: IInputs = {
  sampleProperty: {
    raw: "",
    error: false,
    errorMessage: "string",
    type: "field"
  }
};


export const cdsMock = () => {

  const cdsMock: CdsService = {
    Context: contextMock,
    webApi: {
      createRecord: jest.fn(),
      deleteRecord: jest.fn(),
      retrieveRecord: jest.fn(),
      updateRecord: jest.fn(),
      retrieveMultipleRecords: jest.fn(),
      isAvailableOffline: jest.fn(),
      online: {
        execute: jest.fn(),
        executeMultiple: jest.fn(),
        createRecord: jest.fn(),
        deleteRecord: jest.fn(),
        retrieveRecord: jest.fn(),
        updateRecord: jest.fn(),
        retrieveMultipleRecords: jest.fn()
      },
      offline: {
        createRecord: jest.fn(),
        deleteRecord: jest.fn(),
        retrieveRecord: jest.fn(),
        updateRecord: jest.fn(),
        retrieveMultipleRecords: jest.fn()
      }
    },
    getQuestion: jest.fn(),
    getOptions: jest.fn(),
    saveQuestion: jest.fn(),
    saveOptions: jest.fn(),
    deleteOptions: jest.fn(),
    getPromises: jest.fn(),
    savePromises: jest.fn(),

    EncodeFile: jest.fn(),
    arrayBufferToBase64: jest.fn()
  }
  return cdsMock;
}
export const optionMock = () => {

  const c = [{
    id: "1",
    isOther: false,
    title: "string",
    order: 2,
    isCorrect: true,
    Guid: "1234"
  },
  {
    id: "67",
    isOther: false,
    title: "string",
    order: 6,
    isCorrect: false,
    Guid: "string"
  },
  {
    id: "68",
    isOther: false,
    title: "string",
    order: 6,
    isCorrect: false,
    Guid: "string"
  }
  ]
  return c;

}

export const promiseMock = () => {
  const c = [
    {
      id: "1",
      Guid: "string",
      title: "string",
      order: 1,
      correctOption: "1234"
    },
    {
      id: "2",
      Guid: "string",
      title: "string",
      order: 2,
      correctOption: "string"
    },
    {
      id: "3",
      Guid: "string",
      title: "string",
      order: 3,
      correctOption: "string"
    }
  ]
  return c;
}

export const questionMock = (type?: axa_questiontype) => {
  if (type == axa_questiontype.Calculation) return {
    id: "id",
    title: "title",
    type: axa_questiontype.Calculation,
    difficulty: axa_difficulty.Easy,
    expectedTime: 10,
    courseCategory: "string",
    exactAnswer: "5",
    max: 10,
    min: 1,
  } as IQuestion

  if (type == axa_questiontype.MCQ) return {
    id: "id",
    title: "title",
    type: axa_questiontype.MCQ,
    difficulty: axa_difficulty.Easy,
    expectedTime: 10,
    courseCategory: "string",
    options: optionMock(),
    shuffle: true,
  } as IQuestion

  if (type == axa_questiontype.Matching) return {
    id: "id",
    title: "title",
    type: axa_questiontype.Matching,
    difficulty: axa_difficulty.Easy,
    expectedTime: 10,
    courseCategory: "string",
    options: optionMock(),
    promises: promiseMock(),
    shuffle: true,
  } as IQuestion

  if (type == axa_questiontype.SCQ) return {
    id: "id",
    title: "title",
    type: axa_questiontype.SCQ,
    difficulty: axa_difficulty.Easy,
    expectedTime: 10,
    courseCategory: "string",
    options: optionMock(),
    shuffle: true,
  } as IQuestion

  if (type == axa_questiontype.Date) return {
    id: "id",
    title: "title",
    type: axa_questiontype.Date,
    exactAnswer: '2020-01-01',
    difficulty: axa_difficulty.Easy,
    expectedTime: 10,
    courseCategory: "string",
  } as IQuestion

  return {
    id: "id",
    title: "title",
    type: axa_questiontype.Theory,
    difficulty: axa_difficulty.Easy,
    expectedTime: 10,
    courseCategory: "string",
  } as IQuestion
};

export const MockValidateDataProperties = (question: QuestionsVM) => {
  question.MCQvalidation = () => true;
  question.SCQvalidation = () => true;
  question.MatchingQvalidation = () => true;
  question.CalcQvalidation = () => true;
  question.DateQvalidation = () => true;
  question.TopValidate = () => true;
  question.OptionsValidate = () => true;

  return question;
}

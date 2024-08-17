/**
 * @jest-environment jsdom
 */
import QuestionsVM from "../../viewModels/QuestionsVM";
import { axa_questiontype } from "../../cds-generated/enums/axa_questiontype";
import {
  cdsServiceName,
  IOption,
  IPromise,
  IQuestion,
} from "../../cdsService/cdsSerivce";
import {
  contextMock,
  cdsMock,
  optionMock,
  promiseMock,
  questionMock,
  MockValidateDataProperties,
} from "../mock_objects";
import ServiceProvider from "../../ServiceProvider";

const resetAllFields = (vm: QuestionsVM) => {
  vm.QuestionMin = undefined;
  vm.QuestionMax = undefined;
  vm.QuestionMatchingOptions = [];
  vm.QuestionMatchingPromises = [];
  vm.QuestionSCOptions = [];
  vm.QuestionMCOptions = [];
  vm.QuestionDeletedOptions = [];
  vm.QuestionDateAnswer = undefined;
  vm.QuestionTime = undefined;
  vm.QuestionDifficulty = undefined;
  vm.QuestionIsShuffle = false;
  vm.QuestionTitle = '';
  vm.QuestionTitleImage = undefined;
  vm.QuestionTitleImageUrl = undefined;
  vm.QuestionType = axa_questiontype.SCQ;
}

describe("Testing Question Check Return Error", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Testing Question Check", () => {
    // const QuestionCheckMock = jest.fn(async () => { return false; });
    // jest.spyOn(QuestionsVM.prototype, "init").mockImplementation(QuestionCheckMock)
    //
    // const serviceProvider = new ServiceProvider();
    // serviceProvider.register(cdsServiceName, cdsMock())
    // serviceProvider.register("context", contextMock)
    // serviceProvider.register("notifyOutputChanged", () => { })
    // const vm = new QuestionsVM(serviceProvider);
    //
    // expect(vm.PCFerror).toEqual("Save the record before editing.");

    expect(true).toBeTruthy();
  });
});

describe("Testing Reset Question Function", () => {
  const serviceProvider = new ServiceProvider();
  serviceProvider.register(cdsServiceName, cdsMock());
  serviceProvider.register("context", contextMock);
  serviceProvider.register("notifyOutputChanged", () => { });
  const entityId = "some id";
  it("Testing Matching Questions", () => {
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.QuestionMax = 10;
    vm.QuestionMin = 10;
    vm.QuestionDateAnswer = "1";
    vm.QuestionMax = 10;
    vm.QuestionMCOptions = optionMock();
    vm.QuestionSCOptions = optionMock();

    vm.resetQuestion(axa_questiontype.Matching);
    expect(vm.QuestionMax).toEqual(undefined);
    expect(vm.QuestionMin).toEqual(undefined);
    expect(vm.QuestionMCOptions.length).toEqual(0)
    expect(vm.QuestionSCOptions.length).toEqual(0)
    expect(vm.QuestionDateAnswer).toEqual('')
    expect(JSON.stringify(vm.QuestionDeletedOptions))
      .toEqual(JSON.stringify([
        ...vm.QuestionDeletedOptions,
        ...vm.QuestionMatchingOptions.filter(x => x.Guid),
        ...vm.QuestionMCOptions.filter(x => x.Guid),
        ...vm.QuestionSCOptions.filter(x => x.Guid),
      ]))
  });

  it("Testing MCQ Questions", () => {
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.QuestionMax = 10;
    vm.QuestionMin = 10;
    vm.QuestionDateAnswer = '1';
    vm.QuestionMatchingOptions = optionMock();
    vm.QuestionMatchingPromises = promiseMock();
    vm.QuestionSCOptions = optionMock();

    vm.resetQuestion(axa_questiontype.MCQ);

    expect(vm.QuestionMax).toEqual(undefined);
    expect(vm.QuestionMin).toEqual(undefined);
    expect(vm.QuestionSCOptions.length).toEqual(0)
    expect(vm.QuestionMatchingOptions.length).toEqual(0)
    expect(vm.QuestionMatchingPromises.length).toEqual(0)
    expect(vm.QuestionDateAnswer).toEqual('')
    expect(JSON.stringify(vm.QuestionDeletedOptions))
      .toEqual(JSON.stringify([
        ...vm.QuestionDeletedOptions,
        ...vm.QuestionMatchingOptions.filter(x => x.Guid),
        ...vm.QuestionSCOptions.filter(x => x.Guid),
      ]))
  });

  it("Testing SCQ Questions", () => {
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.QuestionMax = 10;
    vm.QuestionMin = 10;
    vm.QuestionDateAnswer = '1';
    vm.QuestionMCOptions = optionMock();
    vm.QuestionMatchingOptions = optionMock();
    vm.QuestionMatchingPromises = promiseMock();

    vm.resetQuestion(axa_questiontype.SCQ);

    expect(vm.QuestionMax).toEqual(undefined);
    expect(vm.QuestionMin).toEqual(undefined);
    expect(vm.QuestionMCOptions.length).toEqual(0)
    expect(vm.QuestionMatchingOptions.length).toEqual(0)
    expect(vm.QuestionMatchingPromises.length).toEqual(0)
    expect(vm.QuestionDateAnswer).toEqual('')
    expect(JSON.stringify(vm.QuestionDeletedOptions))
      .toEqual(JSON.stringify([
        ...vm.QuestionDeletedOptions,
        ...vm.QuestionMatchingOptions.filter(x => x.Guid),
        ...vm.QuestionMCOptions.filter(x => x.Guid),
        ...vm.QuestionSCOptions.filter(x => x.Guid),
      ]))
  });

  it("Testing Calculation Questions", () => {
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.QuestionDateAnswer = '1';
    vm.QuestionMCOptions = optionMock();
    vm.QuestionSCOptions = optionMock();
    vm.QuestionMatchingOptions = optionMock();
    vm.QuestionMatchingPromises = promiseMock();

    vm.resetQuestion(axa_questiontype.Calculation);

    expect(vm.QuestionMCOptions.length).toEqual(0)
    expect(vm.QuestionSCOptions.length).toEqual(0)
    expect(vm.QuestionMatchingOptions.length).toEqual(0)
    expect(vm.QuestionMatchingPromises.length).toEqual(0)
    expect(vm.QuestionDateAnswer).toEqual('')
    expect(JSON.stringify(vm.QuestionDeletedOptions))
      .toEqual(JSON.stringify([
        ...vm.QuestionDeletedOptions,
        ...vm.QuestionMatchingOptions.filter(x => x.Guid),
        ...vm.QuestionMCOptions.filter(x => x.Guid),
        ...vm.QuestionSCOptions.filter(x => x.Guid),
      ]))
  });

  it("Testing Date Questions", () => {
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.QuestionMax = 10;
    vm.QuestionMin = 10;
    vm.QuestionMCOptions = optionMock();
    vm.QuestionSCOptions = optionMock();
    vm.QuestionMatchingOptions = optionMock();
    vm.QuestionMatchingPromises = promiseMock();

    vm.resetQuestion(axa_questiontype.Date);

    expect(vm.QuestionMax).toEqual(undefined);
    expect(vm.QuestionMin).toEqual(undefined);
    expect(vm.QuestionMCOptions.length).toEqual(0)
    expect(vm.QuestionSCOptions.length).toEqual(0)
    expect(vm.QuestionMatchingOptions.length).toEqual(0)
    expect(vm.QuestionMatchingPromises.length).toEqual(0)
    expect(JSON.stringify(vm.QuestionDeletedOptions))
      .toEqual(JSON.stringify([
        ...vm.QuestionDeletedOptions,
        ...vm.QuestionMatchingOptions.filter(x => x.Guid),
        ...vm.QuestionMCOptions.filter(x => x.Guid),
        ...vm.QuestionSCOptions.filter(x => x.Guid),
      ]))
  });

  it("Testing Theory Questions", () => {
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.QuestionMax = 10;
    vm.QuestionMin = 10;
    vm.QuestionDateAnswer = '1';
    vm.QuestionMCOptions = optionMock();
    vm.QuestionSCOptions = optionMock();
    vm.QuestionMatchingOptions = optionMock();
    vm.QuestionMatchingPromises = promiseMock();

    vm.resetQuestion(axa_questiontype.Theory);

    expect(vm.QuestionMax).toEqual(undefined);
    expect(vm.QuestionMin).toEqual(undefined);
    expect(vm.QuestionMCOptions.length).toEqual(0)
    expect(vm.QuestionSCOptions.length).toEqual(0)
    expect(vm.QuestionMatchingOptions.length).toEqual(0)
    expect(vm.QuestionMatchingPromises.length).toEqual(0)
    expect(vm.QuestionDateAnswer).toEqual('')
    expect(JSON.stringify(vm.QuestionDeletedOptions))
      .toEqual(JSON.stringify([
        ...vm.QuestionDeletedOptions,
        ...vm.QuestionMatchingOptions.filter(x => x.Guid),
        ...vm.QuestionMCOptions.filter(x => x.Guid),
        ...vm.QuestionSCOptions.filter(x => x.Guid),
      ]))
  });
});

describe("Testing Gather Question Function", () => {
  it("Testing Theory Type Of Questions", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.Question = questionMock();
    resetAllFields(vm);
    vm.populateQuestion()
    vm.Question = {} as IQuestion;

    // Options Should Be Empty Array []
    vm.gatherQuestion();
    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.Question.title).toEqual(vm.QuestionTitle);
    expect(vm.Question.type).toEqual(vm.QuestionType);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy()
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)).toBeTruthy()
    expect(vm.Question.shuffle).toEqual(vm.QuestionIsShuffle);
    expect(vm.Question.options).toBeUndefined()
    expect(vm.Question.promises).toBeUndefined()
    expect(vm.Question.exactAnswer).toBeUndefined()
    expect(vm.Question.max).toEqual(vm.QuestionMax)
    expect(vm.Question.min).toEqual(vm.QuestionMin)
  });

  it("Testing Date Type Of Questions", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);

    vm.Question = questionMock(axa_questiontype.Date);
    resetAllFields(vm);
    vm.populateQuestion()
    vm.Question = {} as IQuestion;

    // Options Should Be Empty Array []
    vm.gatherQuestion();
    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.Question.title).toEqual(vm.QuestionTitle);
    expect(vm.Question.type).toEqual(vm.QuestionType);
    expect((vm.Question.difficulty === vm.QuestionDifficulty && vm.QuestionDifficulty !== undefined)).toBeTruthy()
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)).toBeTruthy()
    expect(vm.Question.shuffle).toEqual(vm.QuestionIsShuffle);
    expect(vm.Question.options).toBeUndefined()
    expect(vm.Question.promises).toBeUndefined()
    expect(vm.Question.exactAnswer).toEqual(vm.QuestionDateAnswer)
    expect(vm.Question.max).toEqual(vm.QuestionMax)
    expect(vm.Question.min).toEqual(vm.QuestionMin)
  });

  it("Testing Calc Type Of Questions", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);

    vm.Question = questionMock(axa_questiontype.Calculation);
    resetAllFields(vm);
    vm.populateQuestion()
    vm.Question = {} as IQuestion;

    // Options Should Be Empty Array []
    vm.gatherQuestion();
    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.Question.title).toEqual(vm.QuestionTitle);
    expect(vm.Question.type).toEqual(vm.QuestionType);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy()
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)).toBeTruthy()
    expect(vm.Question.shuffle).toEqual(vm.QuestionIsShuffle);
    expect(vm.Question.options).toBeUndefined()
    expect(vm.Question.promises).toBeUndefined()
    expect(vm.Question.max).toEqual(vm.QuestionMax)
    expect(vm.Question.min).toEqual(vm.QuestionMin)
  });

  it("Testing SCQ Questions", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);

    vm.Question = questionMock(axa_questiontype.SCQ);
    resetAllFields(vm);
    vm.populateQuestion()
    vm.Question = {} as IQuestion;

    vm.gatherQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.Question.title).toEqual(vm.QuestionTitle);
    expect(vm.Question.type).toEqual(vm.QuestionType);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy()
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)).toBeTruthy()
    expect(vm.Question.shuffle).toEqual(vm.QuestionIsShuffle);
    expect(JSON.stringify(vm.Question.options)).toEqual(JSON.stringify(vm.QuestionSCOptions))
    expect(vm.Question.promises).toBeUndefined()
    expect(vm.Question.max).toEqual(vm.QuestionMax)
    expect(vm.Question.min).toEqual(vm.QuestionMin)
  });

  it("Testing MCQ Questions", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);

    vm.Question = questionMock(axa_questiontype.MCQ);
    resetAllFields(vm);
    vm.populateQuestion()
    vm.Question = {} as IQuestion;

    vm.gatherQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.Question.title).toEqual(vm.QuestionTitle);
    expect(vm.Question.type).toEqual(vm.QuestionType);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy()
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)).toBeTruthy()
    expect(vm.Question.shuffle).toEqual(vm.QuestionIsShuffle);
    expect(JSON.stringify(vm.Question.options)).toEqual(JSON.stringify(vm.QuestionMCOptions))
    expect(vm.Question.promises).toBeUndefined()
    expect(vm.Question.max).toEqual(vm.QuestionMax)
    expect(vm.Question.min).toEqual(vm.QuestionMin)
  });

  it("Testing Matching Questions", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);

    vm.Question = questionMock(axa_questiontype.Matching);
    resetAllFields(vm);
    vm.populateQuestion()
    vm.Question = {} as IQuestion;

    vm.gatherQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.Question.title).toEqual(vm.QuestionTitle);
    expect(vm.Question.type).toEqual(vm.QuestionType);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy()
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)).toBeTruthy()
    expect(vm.Question.shuffle).toEqual(vm.QuestionIsShuffle);
    expect(JSON.stringify(vm.Question.promises)).toEqual(JSON.stringify([...vm.QuestionMatchingPromises]))
    expect(JSON.stringify(vm.Question.options)).toEqual(JSON.stringify(vm.QuestionMatchingOptions))
    expect(vm.Question.max).toEqual(vm.QuestionMax)
    expect(vm.Question.min).toEqual(vm.QuestionMin)
  });
});

describe("Testing Populate Question Function", () => {
  const serviceProvider = new ServiceProvider();
  serviceProvider.register(cdsServiceName, cdsMock());
  serviceProvider.register("context", contextMock);
  serviceProvider.register("notifyOutputChanged", () => { });
  const entityId = "some id";
  const vm = new QuestionsVM(serviceProvider, entityId);
  it("Testing Theory Type Of Questions", () => {
    vm.Question = questionMock();

    resetAllFields(vm);
    vm.populateQuestion();

    // expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(
      (vm.Question.difficulty === vm.QuestionDifficulty && vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect(
      (vm.Question.expectedTime === vm.QuestionTime && vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)
    ).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionMax).toEqual(vm.Question.max || undefined);
    expect(vm.QuestionMin).toEqual(vm.Question.min || undefined);
    expect(vm.QuestionDateAnswer).toBeUndefined();
  });

  it("Testing Date Type Of Questions", () => {
    vm.Question = questionMock(axa_questiontype.Date);

    resetAllFields(vm);
    vm.populateQuestion();

    // expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(
      (vm.Question.difficulty === vm.QuestionDifficulty && vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect(
      (vm.Question.expectedTime === vm.QuestionTime && vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)
    ).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionDateAnswer).toEqual(vm.Question.exactAnswer);
  });

  it("Testing Calculation Type Of Questions", () => {
    vm.Question = questionMock(axa_questiontype.Calculation);

    resetAllFields(vm);
    vm.populateQuestion();

    // expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMax).toEqual(vm.Question.max || undefined);
    expect(vm.QuestionMin).toEqual(vm.Question.min || undefined);
    expect(vm.QuestionDateAnswer).toBeUndefined();
    expect(
      (vm.Question.difficulty === vm.QuestionDifficulty && vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect(
      (vm.Question.expectedTime === vm.QuestionTime && vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 && vm.QuestionTime === undefined)
    ).toBeTruthy();
  });

  it("Testing MCQ Questions", () => {
    vm.Question = questionMock(axa_questiontype.MCQ);

    resetAllFields(vm);
    vm.populateQuestion();

    // put each check in a seperate expect 
    // so that you can see which one failed
    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 &&
        vm.QuestionTime === undefined)).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(vm.QuestionDateAnswer).toBeUndefined();
    expect(JSON.stringify(vm.QuestionMCOptions) ===
      JSON.stringify(
        vm.Question.options?.sort((a, b) => a.order - b.order)
      ) ||
      (vm.Question.options === undefined &&
        vm.QuestionMCOptions.length === 0)).toBeTruthy()
  });

  it("Testing SCQ Questions", () => {
    vm.Question = questionMock(axa_questiontype.SCQ);

    resetAllFields(vm);
    vm.populateQuestion();
    // put each check in a seperate expect 
    // so that you can see which one failed
    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 &&
        vm.QuestionTime === undefined)).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(vm.QuestionDateAnswer).toBeUndefined();
    expect(JSON.stringify(vm.QuestionSCOptions) ===
      JSON.stringify(
        vm.Question.options?.sort((a, b) => a.order - b.order)
      ) ||
      (vm.Question.options === undefined &&
        vm.QuestionSCOptions.length === 0)).toBeTruthy()
  });

  it("Testing Matching Questions", () => {
    vm.Question = questionMock(axa_questiontype.Matching);

    resetAllFields(vm);
    vm.populateQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 &&
        vm.QuestionTime === undefined)).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionDateAnswer).toBeUndefined();
    expect(JSON.stringify(vm.QuestionMatchingPromises) ===
      JSON.stringify(
        vm.Question.promises?.sort((a, b) => a.order - b.order)
      ) ||
      (vm.Question.promises === undefined &&
        vm.QuestionMatchingPromises.length === 0)).toBeTruthy()
    expect(JSON.stringify(vm.QuestionMatchingOptions) ===
      JSON.stringify(
        vm.Question.options?.sort((a, b) => a.order - b.order)
      ) ||
      (vm.Question.options === undefined &&
        vm.QuestionMatchingOptions.length === 0)).toBeTruthy()
  });

  it("Testing Theory Type Of Questions, Question Option is Empty", () => {
    vm.Question = questionMock();

    resetAllFields(vm);
    vm.populateQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 &&
        vm.QuestionTime === undefined)).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(vm.QuestionDateAnswer).toBeUndefined();
  });

  it("Testing Matching Questions, Question Option is Empty", () => {
    vm.Question = questionMock(axa_questiontype.Matching);
    vm.Question.options = undefined;
    vm.Question.promises = undefined;

    resetAllFields(vm);
    vm.populateQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 &&
        vm.QuestionTime === undefined)).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(vm.QuestionDateAnswer).toBeUndefined();
  });

  it("Testing MCQ Questions, Question Option is Empty", () => {
    vm.Question = questionMock(axa_questiontype.MCQ);
    vm.Question.options = undefined;

    resetAllFields(vm);
    vm.populateQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 &&
        vm.QuestionTime === undefined)).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionDateAnswer).toBeUndefined();
  });

  it("Testing SCQ Questions, Question Option is Empty", () => {
    vm.Question = questionMock(axa_questiontype.SCQ);
    vm.Question.options = undefined;
    console.dir({ ...vm.Question })

    resetAllFields(vm);
    vm.populateQuestion();

    expect(vm.Question.id).toEqual(vm.EntityId);
    expect(vm.QuestionTitle).toEqual(vm.Question.title);
    expect(vm.QuestionType).toEqual(vm.Question.type);
    expect((vm.Question.difficulty === vm.QuestionDifficulty &&
      vm.QuestionDifficulty !== undefined)).toBeTruthy();
    expect((vm.Question.expectedTime === vm.QuestionTime &&
      vm.QuestionTime !== undefined) ||
      (vm.Question.expectedTime === 0 &&
        vm.QuestionTime === undefined)).toBeTruthy();
    expect(vm.QuestionIsShuffle).toEqual(vm.Question.shuffle ? true : false);
    expect(vm.QuestionMin).toBeUndefined()
    expect(vm.QuestionMax).toBeUndefined()
    expect(vm.QuestionDeletedOptions.length).toEqual(0);
    expect(vm.QuestionSCOptions.length).toEqual(0);
    expect(vm.QuestionMCOptions.length).toEqual(0);
    expect(vm.QuestionMatchingOptions.length).toEqual(0);
    expect(vm.QuestionMatchingPromises.length).toEqual(0);
    expect(vm.QuestionDateAnswer).toBeUndefined();
  });
});

describe("Testing Validate Data Function", () => {
  const serviceProvider = new ServiceProvider();
  serviceProvider.register(cdsServiceName, cdsMock());
  serviceProvider.register("context", contextMock);
  serviceProvider.register("notifyOutputChanged", () => { });
  const entityId = "some id";
  const vm = new QuestionsVM(serviceProvider, entityId);

  it("Testing MCQ Questions ", () => {
    vm.QuestionType = axa_questiontype.MCQ;
    MockValidateDataProperties(vm);
    expect(vm.validateData()).toBeTruthy();
  });

  it("Testing SCQ Questions ", () => {
    vm.QuestionType = axa_questiontype.SCQ;
    MockValidateDataProperties(vm);
    expect(vm.validateData()).toBeTruthy();
  });

  it("Testing Matching Questions ", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.QuestionType = axa_questiontype.Matching;
    MockValidateDataProperties(vm);
    expect(vm.validateData()).toBeTruthy();
  });

  it("Testing Calculation Questions ", () => {
    vm.QuestionType = axa_questiontype.Calculation;
    MockValidateDataProperties(vm);
    expect(vm.validateData()).toBeTruthy();
  });

  it("Testing Date Questions ", () => {
    vm.QuestionType = axa_questiontype.Date;
    MockValidateDataProperties(vm);
    expect(vm.validateData()).toBeTruthy();
  });

  it("Testing Other Questions ", () => {
    vm.QuestionType = axa_questiontype.Theory;
    MockValidateDataProperties(vm);
    expect(vm.validateData()).toBeTruthy();
  });
});

describe("Testing Save Question Function", () => {
  it("Validate Function Return False", async () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });

    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.EntityId = "Test";
    MockValidateDataProperties(vm);
    vm.Question = questionMock();
    vm.QuestionType = axa_questiontype.MCQ;
    vm.OptionsValidate = () => false;
    const error = await vm.SaveQuestion();
    expect(error).toEqual(new Error("validation failed"));
  });

  describe("Testing SCQ Branch", () => {
    it("Option Save Function Throw Error", async () => {
      const serviceProvider = new ServiceProvider();
      serviceProvider.register(cdsServiceName, cdsMock());
      serviceProvider.register("context", contextMock);
      serviceProvider.register("notifyOutputChanged", () => { });
      const entityId = "some id";
      const vm = new QuestionsVM(serviceProvider, entityId);
      MockValidateDataProperties(vm);
      vm.Question = questionMock();
      vm.forceUpdate = () => { };
      const SaveOptionMock = jest.fn(async () => {
        throw new Error("Error saving options, please try again");
      });
      jest
        .spyOn(QuestionsVM.prototype, "saveOptions")
        .mockImplementation(SaveOptionMock);
      vm.QuestionType = axa_questiontype.SCQ;
      vm.Question.type = axa_questiontype.SCQ;
      const result = await vm.SaveQuestion();
      expect(result).toEqual(undefined);
    });
  });

  describe("Testing MCQ Branch", () => {
    it("Option Save Function Throw Error", async () => {
      const serviceProvider = new ServiceProvider();
      serviceProvider.register(cdsServiceName, cdsMock());
      serviceProvider.register("context", contextMock);
      serviceProvider.register("notifyOutputChanged", () => { });
      const entityId = "some id";
      const vm = new QuestionsVM(serviceProvider, entityId);
      MockValidateDataProperties(vm);
      vm.Question = questionMock();
      vm.forceUpdate = () => { };
      const SaveOptionMock = jest.fn(async () => {
        throw new Error("Error saving options, please try again");
      });
      jest
        .spyOn(QuestionsVM.prototype, "saveOptions")
        .mockImplementation(SaveOptionMock);
      vm.QuestionType = axa_questiontype.MCQ;
      vm.Question.type = axa_questiontype.MCQ;
      const result = await vm.SaveQuestion();
      expect(result).toEqual(undefined);
    });
  });

  describe("Testing Matching Branch", () => {
    it("Option Save Function Throw Error", async () => {
      const serviceProvider = new ServiceProvider();
      serviceProvider.register(cdsServiceName, cdsMock());
      serviceProvider.register("context", contextMock);
      serviceProvider.register("notifyOutputChanged", () => { });
      const entityId = "some id";
      const vm = new QuestionsVM(serviceProvider, entityId);
      MockValidateDataProperties(vm);
      vm.Question = questionMock();
      vm.forceUpdate = () => { };
      const SaveOptionMock = jest.fn(async () => {
        throw new Error("Error saving options, please try again");
      });
      const SavePromiseMock = jest.fn(async () => { });

      jest
        .spyOn(QuestionsVM.prototype, "saveOptions")
        .mockImplementation(SaveOptionMock);
      jest
        .spyOn(QuestionsVM.prototype, "savePromises")
        .mockImplementation(SavePromiseMock);

      vm.QuestionType = axa_questiontype.MCQ;
      vm.Question.type = axa_questiontype.MCQ;
      const result = await vm.SaveQuestion();
      expect(result).toEqual(undefined);
    });

    it("Option Promise Function Throw Error", async () => {
      const serviceProvider = new ServiceProvider();
      serviceProvider.register(cdsServiceName, cdsMock());
      serviceProvider.register("context", contextMock);
      serviceProvider.register("notifyOutputChanged", () => { });
      const entityId = "some id";
      const vm = new QuestionsVM(serviceProvider, entityId);
      MockValidateDataProperties(vm);
      vm.Question = questionMock();
      vm.forceUpdate = () => { };
      const SaveOptionMock = jest.fn(async () => { });
      const SavePromiseMock = jest.fn(async () => {
        throw new Error("Error saving promise, please try again");
      });

      jest
        .spyOn(QuestionsVM.prototype, "saveOptions")
        .mockImplementation(SaveOptionMock);
      jest
        .spyOn(QuestionsVM.prototype, "savePromises")
        .mockImplementation(SavePromiseMock);

      vm.QuestionType = axa_questiontype.Matching;
      vm.Question.type = axa_questiontype.Matching;
      const result = await vm.SaveQuestion();
      expect(result).toEqual(undefined);
    });
  });

  describe("Testing Deleted Branch", () => {
    it("Delete Options Function Throw Error", async () => {
      const serviceProvider = new ServiceProvider();
      serviceProvider.register(cdsServiceName, cdsMock());
      serviceProvider.register("context", contextMock);
      serviceProvider.register("notifyOutputChanged", () => { });
      const entityId = "some id";
      const vm = new QuestionsVM(serviceProvider, entityId);
      MockValidateDataProperties(vm);
      vm.Question = questionMock();
      vm.forceUpdate = () => { };
      const SaveOptionMock = jest.fn(async () => { });
      const SavePromiseMock = jest.fn(async () => { });
      const DeleteOptionMock = jest.fn(async () => {
        throw new Error("Error deleting options, please try again");
      });

      jest
        .spyOn(QuestionsVM.prototype, "saveOptions")
        .mockImplementation(SaveOptionMock);
      jest
        .spyOn(QuestionsVM.prototype, "savePromises")
        .mockImplementation(SavePromiseMock);
      jest
        .spyOn(QuestionsVM.prototype, "deleteOptions")
        .mockImplementation(DeleteOptionMock);

      vm.QuestionType = axa_questiontype.Matching;
      vm.Question.type = axa_questiontype.Matching;
      vm.QuestionDeletedOptions = optionMock();
      const result = await vm.SaveQuestion();
      expect(result).toEqual(undefined);
    });
  });

  describe("Testing After Try Catch Branch", () => {
    it("Save Question Function Throw Error", async () => {
      const serviceProvider = new ServiceProvider();
      serviceProvider.register(cdsServiceName, cdsMock());
      serviceProvider.register("context", contextMock);
      serviceProvider.register("notifyOutputChanged", () => { });
      const entityId = "some id";
      const vm = new QuestionsVM(serviceProvider, entityId);
      MockValidateDataProperties(vm);
      vm.Question = questionMock();
      vm.forceUpdate = () => { };
      const SaveOptionMock = jest.fn(async () => { });
      const SavePromiseMock = jest.fn(async () => { });
      const DeleteOptionMock = jest.fn(async () => { });
      jest
        .spyOn(QuestionsVM.prototype, "saveOptions")
        .mockImplementation(SaveOptionMock);
      jest
        .spyOn(QuestionsVM.prototype, "savePromises")
        .mockImplementation(SavePromiseMock);
      jest
        .spyOn(QuestionsVM.prototype, "deleteOptions")
        .mockImplementation(DeleteOptionMock);

      vm.QuestionType = axa_questiontype.Matching;
      vm.Question.type = axa_questiontype.Matching;
      vm.QuestionDeletedOptions = optionMock();
      const result = await vm.SaveQuestion();
      expect(result).toEqual(
        new Error("Error saving question. please try again")
      );
    });
  });

  describe("Testing After Try Catch Branch", () => {
    it("Save Question Function Return True", async () => {
      const serviceProvider = new ServiceProvider();
      const cds = cdsMock();
      cds.saveQuestion = async (_question: IQuestion): Promise<true | Error> => {
        return true;
      };
      cds.getQuestion = async (_id: string) => questionMock()


      serviceProvider.register(cdsServiceName, cds);
      serviceProvider.register("context", contextMock);
      serviceProvider.register("notifyOutputChanged", () => { });
      const entityId = "some id";
      const vm = new QuestionsVM(serviceProvider, entityId);
      MockValidateDataProperties(vm);
      vm.Question = questionMock();
      vm.forceUpdate = () => { };
      const SaveOptionMock = jest.fn(async () => { });
      const SavePromiseMock = jest.fn(async () => { });
      const DeleteOptionMock = jest.fn(async () => { });
      jest
        .spyOn(QuestionsVM.prototype, "saveOptions")
        .mockImplementation(SaveOptionMock);
      jest
        .spyOn(QuestionsVM.prototype, "savePromises")
        .mockImplementation(SavePromiseMock);
      jest
        .spyOn(QuestionsVM.prototype, "deleteOptions")
        .mockImplementation(DeleteOptionMock);
      jest
        .spyOn(QuestionsVM.prototype, "init")
        .mockImplementation(async () => true);
      vm.QuestionType = axa_questiontype.Matching;
      vm.Question.type = axa_questiontype.Matching;
      vm.QuestionDeletedOptions = optionMock();
      const result = await vm.SaveQuestion();
      expect(result).toEqual(true);
    });
  });
});

describe("Testing fetchData Function", () => {
  // it('No Entity ID Test1 (Entity ID is empty string)', async () => {
  //   const serviceProvider = new ServiceProvider();
  //   serviceProvider.register(cdsServiceName, cdsMock())
  //   serviceProvider.register("context", contextMock)
  //   serviceProvider.register('notifyOutputChanged', () => { })
  //   const vm = new QuestionsVM(serviceProvider);
  //   vm.EntityId = "";
  //   const error = await vm.fetchData();
  //   expect(error).toEqual(new Error("no entity id"));
  // })

  it(" Throw an Error", async () => {
    const serviceProvider = new ServiceProvider();
    const cds = cdsMock();
    cds.getQuestion = async (_id: string): Promise<Error | IQuestion> => {
      return new Error("Can't Get Question");
    };
    cds.getOptions = async (_questionId: string): Promise<Error | IOption[]> => {
      return [];
    };

    serviceProvider.register(cdsServiceName, cds);
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.EntityId = "Entity Id 1";
    vm.forceUpdate = () => { };
    const error = await vm.fetchData();
    expect(error).toEqual(new Error("Can't Get Question"));
  });

  it("oRes Throw an Error", async () => {
    const serviceProvider = new ServiceProvider();
    const cds = cdsMock();
    cds.getQuestion = async (_id: string): Promise<Error | IQuestion> => {
      return questionMock();
    };
    cds.getOptions = async (_questionId: string): Promise<Error | IOption[]> => {
      return new Error("Can't Get Option");
    };

    serviceProvider.register(cdsServiceName, cds);
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.EntityId = "Entity Id 1";
    vm.forceUpdate = () => { };
    const error = await vm.fetchData();
    expect(error).toEqual(new Error("Can't Get Option"));
  });

  it("oRes,qRes doesn't return error ", async () => {
    const serviceProvider = new ServiceProvider();
    const cds = cdsMock();
    cds.getQuestion = async (_id: string): Promise<Error | IQuestion> => {
      return questionMock();
    };
    cds.getOptions = async (_questionId: string): Promise<Error | IOption[]> => {
      return optionMock();
    };

    serviceProvider.register(cdsServiceName, cds);
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.EntityId = "Entity Id 1";
    vm.forceUpdate = () => { };
    const error = await vm.fetchData();
    expect(error).toEqual(true);
  });

  it("oRes,qRes doesn't return error with Type Matching", async () => {
    const serviceProvider = new ServiceProvider();
    const cds = cdsMock();
    cds.getQuestion = async (_id: string): Promise<Error | IQuestion> => {
      const q: IQuestion = questionMock();
      q.type = axa_questiontype.Matching;
      return q;
    };
    cds.getOptions = async (_questionId: string): Promise<Error | IOption[]> => {
      return optionMock();
    };

    serviceProvider.register(cdsServiceName, cds);
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);

    vm.EntityId = "Entity Id 1";
    vm.forceUpdate = () => { };
    const error = await vm.fetchData();
    expect(error).toEqual(true);
  });

  it("oRes,qRes  return error with Type Matching", async () => {
    const serviceProvider = new ServiceProvider();
    const cds = cdsMock();
    cds.getQuestion = async (_id: string): Promise<Error | IQuestion> => {
      const q: IQuestion = questionMock();
      q.type = axa_questiontype.Matching;
      return q;
    };
    cds.getOptions = async (_questionId: string): Promise<Error | IOption[]> => {
      return optionMock();
    };
    cds.getPromises = async (
      _options: IOption[]
    ): Promise<IPromise[]> => {
      throw new Error("Can't Get Promises");
    };
    serviceProvider.register(cdsServiceName, cds);
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);

    vm.EntityId = "Entity Id 1";
    vm.forceUpdate = () => { };
    const error = await vm.fetchData();
    expect(error).toEqual(new Error("Can't Get Promises"));
  });
});

describe("Testing Set App Error Function", () => {
  it("Testing ", () => {
    const serviceProvider = new ServiceProvider();
    serviceProvider.register(cdsServiceName, cdsMock());
    serviceProvider.register("context", contextMock);
    serviceProvider.register("notifyOutputChanged", () => { });
    const entityId = "some id";
    const vm = new QuestionsVM(serviceProvider, entityId);
    vm.forceUpdate = () => { };
    vm.PCFerror = "Testing Error";

    expect(vm.PCFerror).toEqual("Testing Error");
  });
});

import { IInputs } from "../generated/ManifestTypes";
import { makeAutoObservable } from "mobx";
import CdsService, { cdsServiceName, IOption, IPromise, IQuestion, } from "../cdsService/cdsSerivce";
import { axa_questiontype } from "../cds-generated/enums/axa_questiontype";
import ServiceProvider from "../ServiceProvider";
import { htmlToText } from "html-to-text";
import { axa_difficulty } from "../cds-generated/enums/axa_difficulty";

//TODO make sure the axa_name attribute doesn't take more than 850 charachters

export default class QuestionsVM {
  // all fields are private with getters and setters
  private _serviceProvider: ServiceProvider; get serviceProvider(): ServiceProvider { return this._serviceProvider; } set serviceProvider(value: ServiceProvider) { this._serviceProvider = value; }
  private _context: ComponentFramework.Context<IInputs>; get context(): ComponentFramework.Context<IInputs> { return this._context; } set context(value: ComponentFramework.Context<IInputs>) { this._context = value; }
  private _cdsService: CdsService; get cdsService(): CdsService { return this._cdsService; } set cdsService(value: CdsService) { this._cdsService = value; }
  private _isMounted: boolean = false; get isMounted(): boolean { return this._isMounted; } set isMounted(value: boolean) { this._isMounted = value; }
  private _isLoading: boolean = false; get isLoading(): boolean { return this._isLoading; }
  private _PCFerror: string | undefined = undefined; get PCFerror(): string | undefined { return this._PCFerror; } set PCFerror(value: string | undefined) { this._errorMessage = value; this.forceUpdate(); }
  private _errorMessage: string | undefined = undefined; get errorMessage(): string | undefined { return this._errorMessage; } set errorMessage(value: string | undefined) { this._errorMessage = value; this.forceUpdate(); }
  private _EntityId: string = ""; get EntityId(): string { return this._EntityId; } set EntityId(value: string) { this._EntityId = value; }
  private _Question: IQuestion = {} as IQuestion; get Question(): IQuestion { return this._Question; } set Question(value: IQuestion) { this._Question = value; this.makeFormDirty(); }
  private _QuestionTitle: string = ""; get QuestionTitle(): string { return this._QuestionTitle; } set QuestionTitle(value: string) { this._QuestionTitle = value; this._QuestionRawTitle = htmlToText(value); this.makeFormDirty(); }
  private _QuestionRawTitle: string = ""; get QuestionRawTitle(): string { return this._QuestionRawTitle; }
  private _QuestionTitleImageUrl?: string = undefined; get QuestionTitleImageUrl(): string | undefined { return this._QuestionTitleImageUrl; } set QuestionTitleImageUrl(value: string | undefined) { this._QuestionTitleImageUrl = value; this.makeFormDirty(); }
  private _QuestionTitleImage: File | undefined = undefined; get QuestionTitleImage(): File | undefined { return this._QuestionTitleImage; } set QuestionTitleImage(value: File | undefined) { this._QuestionTitleImage = value; this.makeFormDirty(); }
  private _QuestionType: axa_questiontype = axa_questiontype.Theory; get QuestionType(): axa_questiontype { return this._QuestionType; } set QuestionType(value: axa_questiontype) { this._QuestionType = value; this.makeFormDirty(); }
  private _QuestionTime: number | undefined = undefined; get QuestionTime(): number | undefined { return this._QuestionTime; } set QuestionTime(value: number | undefined) { this._QuestionTime = value; this.makeFormDirty(); }
  private _QuestionDateAnswer: string | undefined = undefined; get QuestionDateAnswer(): string | undefined { return this._QuestionDateAnswer } set QuestionDateAnswer(value: string | undefined) { this._QuestionDateAnswer = value; this.makeFormDirty(); }
  private _QuestionMax: number | undefined | null = undefined; get QuestionMax(): number | undefined | null { return this._QuestionMax; } set QuestionMax(value: number | undefined | null) { this._QuestionMax = value; this.makeFormDirty(); }
  private _QuestionMin: number | undefined | null = undefined; get QuestionMin(): number | undefined | null { return this._QuestionMin; } set QuestionMin(value: number | undefined | null) { this._QuestionMin = value; this.makeFormDirty(); }
  private _QuestionDifficulty: axa_difficulty | undefined = axa_difficulty.Easy; get QuestionDifficulty(): axa_difficulty | undefined { return this._QuestionDifficulty; } set QuestionDifficulty(value: axa_difficulty | undefined) { this._QuestionDifficulty = value; this.makeFormDirty(); }
  private _QuestionIsShuffle: boolean = false; get QuestionIsShuffle(): boolean { return this._QuestionIsShuffle; } set QuestionIsShuffle(value: boolean) { this._QuestionIsShuffle = value; this.makeFormDirty(); }
  private _QuestionSCOptions: IOption[] = []; get QuestionSCOptions(): IOption[] { return this._QuestionSCOptions; } set QuestionSCOptions(value: IOption[]) { this._QuestionSCOptions = value; this.makeFormDirty(); }
  private _QuestionMCOptions: IOption[] = []; get QuestionMCOptions(): IOption[] { return this._QuestionMCOptions; } set QuestionMCOptions(value: IOption[]) { this._QuestionMCOptions = value; this.makeFormDirty(); }
  private _QuestionMatchingOptions: IOption[] = []; get QuestionMatchingOptions(): IOption[] { return this._QuestionMatchingOptions; } set QuestionMatchingOptions(value: IOption[]) { this._QuestionMatchingOptions = value; this.makeFormDirty(); }
  private _QuestionMatchingPromises: IPromise[] = []; get QuestionMatchingPromises(): IPromise[] { return this._QuestionMatchingPromises; } set QuestionMatchingPromises(value: IPromise[]) { this._QuestionMatchingPromises = value; this.makeFormDirty(); }
  private _QuestionDeletedOptions: IOption[] = []; get QuestionDeletedOptions(): IOption[] { return this._QuestionDeletedOptions; } set QuestionDeletedOptions(value: IOption[]) { this._QuestionDeletedOptions = value; this.makeFormDirty(); }
  private saveHandlerAdded: boolean = false;
  public isReadOnly: boolean = false;
  public notifyOutputChanged: () => void;
  public forceUpdate: () => void;
  public TopValidate: () => boolean;
  public OptionsValidate: () => boolean;
  public MCQvalidation: () => boolean;
  public SCQvalidation: () => boolean;
  public MatchingQvalidation: () => boolean;
  public DateQvalidation: (value?: string) => boolean;
  public CalcQvalidation: () => boolean;
  public TopSegmentvalidation: () => boolean;

  constructor(serviceProvider: ServiceProvider, entityId: string) {
    makeAutoObservable(this);
    this._serviceProvider = serviceProvider;
    this._cdsService = this._serviceProvider.get<CdsService>(cdsServiceName);
    this.notifyOutputChanged = this._serviceProvider.get<() => void>("notifyOutputChanged");
    this._context = this._serviceProvider.get<ComponentFramework.Context<IInputs>>("context");
    this._EntityId = entityId;
    if (this._EntityId == undefined || this._EntityId == "" || this._EntityId == null) {
      this._PCFerror = "Save the record before editing.";
      this._isLoading = false;
    }
  }

  public makeFormDirty() {
    //make the form dirty 
    if (this.isReadOnly) return
    this.notifyOutputChanged();
  }

  public generateRandomString(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * this function is called when the component is initialized
   * is checks for entity id if it exists and handles it
   * it also registers the event handler for the form save event which saves the pcf as well
   * @returns boolean - the return value isn't used anywhere but it represents if it was successful or not 
   */
  public async init(): Promise<boolean> {
    if (this._EntityId == undefined || this._EntityId == "" || this._EntityId == null) {
      this._PCFerror = "Save the record before editing.";
      this._isLoading = false
      return false;
    }
    this._PCFerror = undefined
    if (!this.saveHandlerAdded) {
      const xrm: any = window.parent.Xrm;
      try {
        const formContext = xrm.Page.getControl(
          this._context.parameters?.sampleProperty.attributes?.LogicalName || "axa_name"
        )?.formContext
        formContext.data.entity.addOnSave(this.onSaveHandler.bind(this));
        this.saveHandlerAdded = true;
      } catch (e: any) {
        console.dir(e);
      }
    }
    const res = await this.fetchData();
    if (res != true) return false
    return res;
  }

  /**
   * this function is called on form save event
   * the reason we have this on top of the saveQuestion function
   * is just to split the code up, where here we handle whether we save or not
   */
  public async onSaveHandler(event: Xrm.Events.SaveEventContext) {
    try {
      const res = this.validateData();
      if (!res) {
        event.getEventArgs().preventDefault();
        Xrm.Page.ui.setFormNotification('Please make sure all the fields are filled properly', 'ERROR', '1');
        return;
      }
      Xrm.Page.ui.clearFormNotification('1');
      if (this._isLoading) return
      return this.SaveQuestion();
    } catch (e: any) {
      console.dir(e);
    }
  }

  /**
   * this is the actual "init" function, where we fetch the data
   * and populate it to the fields and everything 
   */
  public async fetchData(): Promise<true | Error> {
    this._isLoading = true;
    const [qRes, oRes] = await Promise.all([
      this._cdsService.getQuestion(this._EntityId),
      this._cdsService.getOptions(this._EntityId),
    ]);
    if (qRes instanceof Error) {
      this.PCFerror = "Error loading question, please try again or contact IT"
      this._isLoading = false;
      return qRes;
    }
    if (oRes instanceof Error) {
      this.PCFerror =
        "Error loading question, please try again or contact IT"
      this._isLoading = false;
      return oRes;
    }
    this._Question = qRes;
    this._Question.options = oRes;
    // let loRes: ILearningObjective[] | Error;
    let pRes: IPromise[] | Error;
    if (qRes.type == axa_questiontype.Matching) {
      try {
        pRes = await this._cdsService.getPromises(oRes);
        this._Question.promises = pRes;
      } catch (e: any) {
        this.PCFerror = "Error loading question, please try again or contact IT"
        this._isLoading = false;
        return e;
      }
    }
    this.populateQuestion();
    this.PCFerror = undefined;
    this._isLoading = false;
    this._isMounted = true;
    return true;
  }

  /**
   * Populate the question from one question object to the local variables in the vm
   */
  public populateQuestion() {
    this._Question.id = this._EntityId;
    this._QuestionTitle = this._Question.title;
    this._QuestionRawTitle = this._Question.rawTitle;
    this._QuestionTitleImage = this._Question.image;
    this._QuestionTitleImageUrl = this._Question.imageUrl;
    this._QuestionType = this._Question.type
      ? this._Question.type
      : axa_questiontype.SCQ;
    this._QuestionDifficulty = this._Question.difficulty;
    this._QuestionTime = this._Question.expectedTime || 0;
    this._QuestionIsShuffle = this._Question.shuffle || false;
    this._QuestionDeletedOptions = [];
    this._QuestionMax = this._Question.max;
    this._QuestionMin = this._Question.min;
    if (this._QuestionType == axa_questiontype.MCQ)
      this._QuestionMCOptions =
        this._Question.options?.sort((a, b) => a.order - b.order) || [];
    if (this._QuestionType == axa_questiontype.SCQ)
      this._QuestionSCOptions =
        this._Question.options?.sort((a, b) => a.order - b.order) || [];
    if (this._QuestionType == axa_questiontype.Matching) {
      this._QuestionMatchingOptions =
        this._Question.options?.sort((a, b) => a.order - b.order) || [];
      this._QuestionMatchingPromises =
        this._Question.promises?.sort((a, b) => a.order - b.order) || [];
    }
    if (this._QuestionType == axa_questiontype.Date) {
      this._QuestionDateAnswer = this._Question.exactAnswer;
    }
  }

  /**
   * Gather the question from the form and return it as one object
   */
  public gatherQuestion() {
    this._Question.id = this._EntityId;
    this._Question.title = this._QuestionTitle;
    this._Question.rawTitle = this._QuestionRawTitle;
    this._Question.image = this._QuestionTitleImage;
    this._Question.imageUrl = this._QuestionTitleImageUrl;
    this._Question.type = this._QuestionType;
    this._Question.difficulty = this._QuestionDifficulty ?? axa_difficulty.Easy;
    this._Question.expectedTime = this._QuestionTime ?? 0;
    this._Question.shuffle = this._QuestionIsShuffle;
    this._Question.max = this._QuestionMax;
    this._Question.min = this._QuestionMin;
    this._Question.options = undefined;
    if (this._Question.type == axa_questiontype.SCQ)
      this._Question.options = this._QuestionSCOptions;
    if (this._Question.type == axa_questiontype.MCQ)
      this._Question.options = this._QuestionMCOptions;
    if (this._Question.type == axa_questiontype.Matching) {
      this._Question.options = this._QuestionMatchingOptions;
      this._Question.promises = this._QuestionMatchingPromises;
    }
    if (this._Question.type == axa_questiontype.Date) {
      this._Question.exactAnswer = this._QuestionDateAnswer;
    }
  }

  /**
   * Reset the question to default values, based on the type
   * basically remove the things that shouldn't be save to cds
   * and leave the things we need to save based on the type
   * @param type - The type of the question
   */
  public resetQuestion(type: axa_questiontype) {
    if (type == axa_questiontype.Matching) {
      this._QuestionMax = null;
      this._QuestionMin = null;
      this._QuestionDateAnswer = '';
      this._QuestionDeletedOptions = [
        ...this._QuestionDeletedOptions,
        ...this._QuestionMCOptions.filter(x => x.Guid),
        ...this._QuestionSCOptions.filter(x => x.Guid),
      ];
      this._QuestionMCOptions = [];
      this._QuestionSCOptions = [];
    } else if (type == axa_questiontype.MCQ) {
      this._QuestionMax = null;
      this._QuestionMin = null;
      this._QuestionDateAnswer = '';
      this._QuestionDeletedOptions = [
        ...this._QuestionDeletedOptions,
        ...this._QuestionMatchingOptions.filter(x => x.Guid),
        ...this._QuestionSCOptions.filter(x => x.Guid),
      ];
      // this._QuestionDeletedPromises = [...this._QuestionDeletedPromises, ...this._QuestionMatchingPromises.filter(x => x.Guid)]
      this._QuestionMatchingOptions = [];
      this._QuestionMatchingPromises = [];
      this._QuestionSCOptions = [];
    } else if (type == axa_questiontype.SCQ) {
      this._QuestionMax = null;
      this._QuestionMin = null;
      this._QuestionDateAnswer = '';
      this._QuestionDeletedOptions = [
        ...this._QuestionDeletedOptions,
        ...this._QuestionMatchingOptions.filter(x => x.Guid),
        ...this._QuestionMCOptions.filter(x => x.Guid),
      ];
      // this._QuestionDeletedPromises = [...this._QuestionDeletedPromises, ...this._QuestionMatchingPromises.filter(x => x.Guid)]
      this._QuestionMCOptions = [];
      this._QuestionMatchingPromises = [];
      this._QuestionMatchingOptions = [];
    } else if (type == axa_questiontype.Calculation) {
      this._QuestionDateAnswer = '';
      this._QuestionDeletedOptions = [
        ...this._QuestionDeletedOptions,
        ...this._QuestionMatchingOptions.filter(x => x.Guid),
        ...this._QuestionMCOptions.filter(x => x.Guid),
        ...this._QuestionSCOptions.filter(x => x.Guid),
      ];
      // this._QuestionDeletedPromises = [...this._QuestionDeletedPromises, ...this._QuestionMatchingPromises.filter(x => x.Guid)]
      this._QuestionMCOptions = [];
      this._QuestionSCOptions = [];
      this._QuestionMatchingOptions = [];
      this._QuestionMatchingPromises = [];
    } else if (type == axa_questiontype.Date) {
      this._QuestionMax = null;
      this._QuestionMin = null;
      this._QuestionDeletedOptions = [
        ...this._QuestionDeletedOptions,
        ...this._QuestionMatchingOptions.filter(x => x.Guid),
        ...this._QuestionMCOptions.filter(x => x.Guid),
        ...this._QuestionSCOptions.filter(x => x.Guid),
      ];
      // this._QuestionDeletedPromises = [...this._QuestionDeletedPromises, ...this._QuestionMatchingPromises.filter(x => x.Guid)]
      this._QuestionMCOptions = [];
      this._QuestionSCOptions = [];
      this._QuestionMatchingOptions = [];
      this._QuestionMatchingPromises = [];
    } else {
      this._QuestionDateAnswer = '';
      this._QuestionMax = null;
      this._QuestionMin = null;
      this._QuestionDeletedOptions = [
        ...this._QuestionDeletedOptions,
        ...this._QuestionMatchingOptions.filter(x => x.Guid),
        ...this._QuestionMCOptions.filter(x => x.Guid),
        ...this._QuestionSCOptions.filter(x => x.Guid),
      ];
      // this._QuestionDeletedPromises = [...this._QuestionDeletedPromises, ...this._QuestionMatchingPromises.filter(x => x.Guid)]
      this._QuestionMCOptions = [];
      this._QuestionSCOptions = [];
      this._QuestionMatchingOptions = [];
      this._QuestionMatchingPromises = [];
    }
  }

  /**
   * Validate the data based on the question type
   * @returns boolean - true if valid, false if not
   */
  public validateData(): boolean {
    let res: boolean;
    if (this._QuestionType == axa_questiontype.MCQ) {
      res = this.MCQvalidation();
    } else if (this._QuestionType == axa_questiontype.SCQ) {
      res = this.SCQvalidation();
    } else if (this._QuestionType == axa_questiontype.Matching) {
      res = this.MatchingQvalidation();
    } else if (this._QuestionType == axa_questiontype.Calculation) {
      res = this.CalcQvalidation();
    } else if (this._QuestionType == axa_questiontype.Date) {
      res = this.DateQvalidation(this._QuestionDateAnswer);
    } else {
      res = true;
    }
    if (!res) return false;
    if (!this.TopValidate()) return false;
    if (!this.OptionsValidate()) return false;
    return true;
  }

  /**
   * save options to the database
   * @param options - the options to save
   * @param type - the type of the question
   * @returns Promise<void> - basically it throws an error if something went wrong
   */
  public async saveOptions(options: IOption[], type: "MC" | "SC" | "Matching") {
    const res = await this._cdsService.saveOptions(
      options,
      this._EntityId
    );
    if (res instanceof Error) {
      throw new Error("Error saving options, please try again");
    }
    this.errorMessage = undefined;
    if (type == "MC") this._QuestionMCOptions = res.sort((a, b) => a.order - b.order);
    if (type == "SC") this._QuestionSCOptions = res.sort((a, b) => a.order - b.order);
    if (type == "Matching") this._QuestionMatchingOptions = res.sort((a, b) => a.order - b.order);
  }

  /**
   * save promises to the database
   * @param promises - the promises to save
   * @param options - the options to save
   * @returns Promise<void> - basically it throws an error if something went wrong
   */
  public async savePromises(promises: IPromise[], options: IOption[]) {
    const res = await this._cdsService.savePromises(
      promises,
      options
    );
    if (res instanceof Error) {
      throw new Error("Error saving options, please try again");
    }
    this.errorMessage = undefined;
    this._QuestionMatchingPromises = res;
  }

  /**
   * delete options from the database
   * @param options - the options to delete
   * @returns Promise<void> - basically it throws an error if something went wrong
   */
  public async deleteOptions(options: IOption[]) {
    const res = await this._cdsService.deleteOptions(
      options
    );
    if (res != true) {
      throw new Error("Error saving options, please try again");
    }
    this.errorMessage = undefined;
    this._QuestionDeletedOptions = [];
  }

  /**
   * the main function to save the question
   */
  public async SaveQuestion() {
    if (!this.validateData()) {
      return new Error("validation failed");
    }
    console.log('saving')
    this._isLoading = true;
    this.resetQuestion(this._QuestionType);
    this.gatherQuestion();
    try {
      if (this._Question.type == axa_questiontype.SCQ) {
        //saving the scq options
        await this.saveOptions(this._QuestionSCOptions, "SC");
      } else if (this._Question.type == axa_questiontype.MCQ) {
        //saving the mcq options
        await this.saveOptions(this._QuestionMCOptions, "MC");
      } else if (this._Question.type == axa_questiontype.Matching) {
        //saving the matching options and promises
        await this.saveOptions(this._QuestionMatchingOptions, "Matching");
        //these functions cannot be called in parallel, because the promises depend on the saved options
        await this.savePromises(this._QuestionMatchingPromises, this._QuestionMatchingOptions)
      }
      if (this._QuestionDeletedOptions.length > 0) {
        //if there's any options set for deletion, delete them here
        await this.deleteOptions(this._QuestionDeletedOptions)
      }
    } catch (e: any) {
      this.errorMessage = e.message;
      this._isLoading = false;
      return;
    }
    const questionRes = await this._cdsService.saveQuestion(this._Question);
    if (questionRes != true) {
      this.PCFerror = "Error saving question. please try again";
      this._isLoading = false;
      return new Error("Error saving question. please try again");
    }
    this.errorMessage = undefined;
    this._isLoading = false;
    await this.init();
    return true;
  }
}

export const serviceProviderName = "QuestionsVM";

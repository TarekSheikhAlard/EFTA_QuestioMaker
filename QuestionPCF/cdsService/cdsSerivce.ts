import { axa_ChoiceAttributes, axa_choiceMetadata } from "../cds-generated/entities/axa_Choice";
import { axa_PromiseAttributes, axa_promiseMetadata } from "../cds-generated/entities/axa_Promise";
import { axa_QuestionAttributes, axa_questionMetadata } from "../cds-generated/entities/axa_Question";
import { axa_difficulty } from "../cds-generated/enums/axa_difficulty";
import { axa_questiontype } from "../cds-generated/enums/axa_questiontype";
import { IInputs } from "../generated/ManifestTypes";

//TODO make an interface for the question, check cds-generated for the types
export interface IQuestion {
  id: string;
  title: string;
  type: axa_questiontype;
  difficulty: axa_difficulty;
  expectedTime: number;
  courseCategory: string;
  rawTitle: string;
  exactAnswer?: string;
  max?: number | null;
  min?: number | null;
  imageUrl?: string;
  image?: File | undefined;
  options?: IOption[];
  promises?: IPromise[];
  shuffle?: boolean;
}

export interface IOption {
  id: string;
  isOther: boolean;
  title: string;
  order: number;
  isCorrect: boolean;
  Guid?: string;
  imageUrl?: string;
  image?: File | undefined;
}

export interface IPromise {
  id: string;
  Guid?: string;
  title: string;
  order: number;
  correctOption: string;
  imageUrl?: string;
  image?: File | undefined;
}

/**
 *
 * A service to interact with the CDS, all WebApi calls should be made through this service
 * All methods return a promise with either an Error if something went wrong or the result
 * @param context - the context of the component framework to get the webapi
 */
export default class CdsService {
  public Context: ComponentFramework.Context<IInputs>;
  public webApi: Xrm.WebApi = Xrm.WebApi;
  constructor(context: ComponentFramework.Context<IInputs>) {
    this.Context = context;
  }

  /**
   *
   * Get a question by id
   * @param id - the id of the question
   * @returns a promise with either an Error if something went wrong, or the question on success
   */
  public async getQuestion(id: string): Promise<IQuestion | Error> {
    try {
      const fetchXml = [
        '?fetchXml=',
        '<fetch>',
        `<entity name="${axa_questionMetadata.logicalName}">`,
        `<attribute name="${axa_QuestionAttributes.axa_QuestionId}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_Difficulty}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_Max}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_Min}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_Text}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_RawText}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_CourseCategory}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_Type}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_RandomizeAnswers}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_ExactAnswer}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_ExpectedTime}"/>`,
        `<attribute name="${axa_QuestionAttributes.axa_QuestionImage_URL}"/>`,
        '<filter>',
        `<condition attribute="${axa_QuestionAttributes.axa_QuestionId}" operator="eq" value="${id}" />"`,
        '</filter>',
        '</entity>',
        '</fetch>',
      ].join("");
      const result = await this.webApi.retrieveMultipleRecords(
        axa_questionMetadata.logicalName,
        fetchXml
      )
      if (result instanceof Error) console.log('something went wrong 1')
      const question: IQuestion = {
        id: result.entities[0][axa_QuestionAttributes.axa_QuestionId],
        title: result.entities[0][axa_QuestionAttributes.axa_Text],
        rawTitle: result.entities[0][axa_QuestionAttributes.axa_RawText],
        courseCategory: result.entities[0]['_axa_coursecategory_value'],
        difficulty: result.entities[0].axa_difficulty,
        expectedTime: result.entities[0].axa_expectedtime,
        type: result.entities[0].axa_type as axa_questiontype,
        min: result.entities[0].axa_min,
        max: result.entities[0].axa_max,
        shuffle: result.entities[0].axa_randomizeanswers,
        imageUrl: result.entities[0].axa_questionimage_url,
      }
      if (question.type == axa_questiontype.Date) {
        question.exactAnswer = result.entities[0].axa_exactanswer.substring(0, 10)
      } else {
        question.exactAnswer = result.entities[0].axa_exactanswer
      }
      return question;
    } catch (e: any) {
      return new Error(e);
    }
  }

  /**
   *
   * Get all options related to this question
   * @param questionId - the id of the question to get the options for
   * @returns a promise with either an Error if something went wrong, or an array of options on success
   */
  public async getOptions(questionId: string): Promise<IOption[] | Error> {
    //get options for question
    //return array of IOption[] 
    const fetchXml = [
      '?fetchXml=',
      '<fetch>',
      `<entity name="${axa_choiceMetadata.logicalName}" >`,
      `<attribute name="${axa_ChoiceAttributes.axa_Text}" />`,
      `<attribute name="${axa_ChoiceAttributes.axa_ChoiceId}" />`,
      `<attribute name="${axa_ChoiceAttributes.axa_IsOther}" />`,
      `<attribute name="${axa_ChoiceAttributes.axa_IsCorrect}" />`,
      `<attribute name="${axa_ChoiceAttributes.axa_order}" />`,
      `<attribute name="${axa_ChoiceAttributes.axa_ChoiceImage_URL}" />`,
      '<filter>',
      `<condition attribute="axa_question" operator = "eq" value = "${questionId}" />`,
      '</filter>',
      '</entity>',
      '</fetch>',
    ].join('');
    try {
      const res = await this.webApi.retrieveMultipleRecords(axa_choiceMetadata.logicalName, fetchXml);
      const options: IOption[] = res.entities.map((entity, index) => {
        const option: IOption = {
          id: index.toString(),
          Guid: entity[axa_choiceMetadata.primaryIdAttribute] as string,
          title: entity[axa_ChoiceAttributes.axa_Text],
          order: entity[axa_ChoiceAttributes.axa_order],
          isCorrect: entity[axa_ChoiceAttributes.axa_IsCorrect],
          isOther: entity[axa_ChoiceAttributes.axa_IsOther],
          imageUrl: entity[axa_ChoiceAttributes.axa_ChoiceImage_URL],
        }
        return option;
      })
      return options;
    } catch (e: any) {
      console.dir(e);
      return e as Error;
    }
  }

  /**
   * encodes a arrayBuffer to base64
   * @param array - arrayBuffer to encode
   * @returns base64 encoded string
   */
  public arrayBufferToBase64(array: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(array);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
   * encodes a file to base64
   * @param file - file to encode
   * @returns base64 encoded string
   */
  public EncodeFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const result = this.arrayBufferToBase64(arrayBuffer);
        // this is the first request. We are passing content as null.
        resolve(result);
      };
      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };


  // /**
  //  * Remove HTML tags from a string
  //  * @param str - the string to remove the HTML tags from
  //  * @returns the string without HTML tags
  //  */
  // private removeHTMLtagsfromstring(str: string) {
  //     return str.replace(/<[^>]*>/g, '');
  // }


  /**
   *
   * Save a question to CDS
   * @param question - the question to save, this is a partial question, so only the fields that are filled in will be saved
   * however if the question type required some fields, they should be filled in as well. if not, the function will throw an error
   * also if the question has an id, it will be updated, otherwise it will be created
   * @returns a promise with either an Error if something went wrong, or the saved question on success
   */
  public async saveQuestion(question: IQuestion): Promise<true | Error> {
    //save question to CDS, this is difficult and not finalized 
    try {
      // const loRelation = {
      //     "axa_LearningObjective@odata.bind": "/" + axa_learningobjectiveMetadata.collectionName + "(" + question.learningObjective + ")",
      // }
      let fileContent = null;
      if (question.image) fileContent = await this.EncodeFile(question.image)
      const fileData = { [axa_QuestionAttributes.axa_QuestionImage]: fileContent }
      const options = {
        "axa_text": question.title,
        "axa_rawtext": question.rawTitle,
        "axa_randomizeanswers": question.shuffle,
        "axa_type": question.type,
        "axa_expectedtime": question.expectedTime,
        "axa_min": question.min,
        "axa_exactanswer": question.exactAnswer,
        "axa_difficulty": question.difficulty,
        "axa_max": question.max,
      }
      if (fileContent || question.imageUrl == undefined) {
        // concat the options with the relation
        Object.assign(options, fileData)
      }
      const result = await this.webApi.updateRecord(axa_questionMetadata.logicalName, question.id, options)
      if (result instanceof Error) {
        return result as Error;
      }
      return true;
    } catch (e: any) {
      console.dir(e);
      return new Error(e);
    }
  }

  /**
   *
   * Save an option to CDS
   * @param option - the option to save, this is a partial option, so that you can supply and option without an id, and it will be created
   * @returns a promise with either an Error if something went wrong, or the saved option on success
   */
  public async saveOptions(_options: Partial<IOption>[], questionID: string): Promise<IOption[] | Error> {
    //save option to CDS, will get option title order and support shuffle as params 
    try {
      const results = await Promise.all(_options.map(async (option) => {
        let fileContent = null;
        if (option.image) fileContent = await this.EncodeFile(option.image)
        const fileData = { [axa_ChoiceAttributes.axa_ChoiceImage]: fileContent }
        const options = {
          "axa_text": option.title,
          "axa_order": option.order,
          "axa_iscorrect": option.isCorrect,
          "axa_isother": option.isOther,
          "axa_Question@odata.bind": `/${axa_questionMetadata.collectionName}(${questionID})`
        };
        if (fileContent || option.imageUrl == undefined) {
          // concat the options with the relation
          Object.assign(options, fileData)
        }
        if (option.Guid) {
          const result = await this.webApi.updateRecord(axa_choiceMetadata.logicalName, option.Guid, options);
          if (result instanceof Error) {
            return result as Error;
          }
          return option as IOption;
        } else {
          const result = await this.webApi.createRecord(axa_choiceMetadata.logicalName, options);
          if (result instanceof Error) {
            return result as Error;
          }
          return { ...option, Guid: result.id } as IOption
        }
      }))
      const errors = results.filter((result) => result instanceof Error) as Error[];
      if (errors.length > 0) {
        return errors[0];
      }
      return results as IOption[];
    } catch (e: any) {
      return Error(e.message)
    }
  }

  public async deleteOptions(_options: IOption[]): Promise<true | Error> {
    try {
      await Promise.all(_options.map(async (option) => {
        if (!option.Guid) return
        await this.webApi.deleteRecord(axa_choiceMetadata.logicalName, option.Guid);
        return
      }))
      return true;
    } catch (e: any) {
      console.dir(e);
      return e as Error;
    }
  }

  public async getPromises(options: IOption[]): Promise<IPromise[]> {
    try {
      const res = await Promise.all(options.map(async (option, index) => {
        const fetchXml = [
          '?fetchXml=',
          '<fetch>',
          `<entity name="${axa_promiseMetadata.logicalName}" >`,
          `<attribute name="${axa_PromiseAttributes.axa_Order}" />`,
          `<attribute name="${axa_PromiseAttributes.axa_Text}" />`,
          `<attribute name="${axa_PromiseAttributes.axa_PromiseId}" />`,
          `<attribute name="${axa_PromiseAttributes.axa_PromiseImage_URL}" />`,
          '<filter>',
          `<condition attribute="axa_correctoption" operator = "eq" value = "${option.Guid}" />`,
          '</filter>',
          '</entity>',
          '</fetch>',
        ].join('');
        const res = await this.webApi.retrieveMultipleRecords(axa_promiseMetadata.logicalName, fetchXml);
        if (res.entities.length == 0) return {} as IPromise;
        const promise = {
          id: index.toString(),
          Guid: res.entities[0][axa_promiseMetadata.primaryIdAttribute],
          title: res.entities[0][axa_PromiseAttributes.axa_Text],
          order: res.entities[0][axa_PromiseAttributes.axa_Order],
          imageUrl: res.entities[0][axa_PromiseAttributes.axa_PromiseImage_URL],
          correctOption: option.Guid
        } as IPromise;
        return promise;
      }))
      return res;
    } catch (e: any) {
      console.dir(e);
      throw e as Error;
    }
  }

  /**
   *
   * Save a promise to CDS
   * @param promise - the promise to save, this is a partial promise, so that you can supply and promise without an id, and it will be created
   * @param optionId - the id of the option to which the promise belongs
   * @returns a promise with either an Error if something went wrong, or the saved promise on success
   */
  public async savePromises(promises: Partial<IPromise>[], options: IOption[]): Promise<IPromise[] | Error> {
    try {
      const results = await Promise.all(promises.map(async (promise, index) => {
        let fileContent = null;
        if (promise.image) fileContent = await this.EncodeFile(promise.image)
        const fileData = { [axa_PromiseAttributes.axa_PromiseImage]: fileContent }
        const params = {
          "axa_text": promise.title,
          "axa_order": promise.order,
          "axa_CorrectOption@odata.bind": `/${axa_choiceMetadata.collectionName}(${options[index].Guid})`
        };
        if (fileContent || promise.imageUrl == undefined) {
          // concat the options with the relation
          Object.assign(params, fileData)
        }
        if (!promise.Guid) {
          const res = await this.webApi.createRecord(axa_promiseMetadata.logicalName, params);
          if (res instanceof Error) {
            return res as Error;
          }
          return { ...promise, Guid: res.id } as IOption
        } else {
          const res = await this.webApi.updateRecord(axa_promiseMetadata.logicalName, promise.Guid, params);
          if (res instanceof Error) {
            return res as Error;
          }
          return promise
        }
      }))
      const errors = results.filter((result) => result instanceof Error) as Error[];
      if (errors.length > 0) {
        return errors[0];
      }
      return results as IPromise[];
    } catch (e: any) {
      console.log(e);
      return e as Error;
    }
  }
}


export const cdsServiceName = 'cdsService';

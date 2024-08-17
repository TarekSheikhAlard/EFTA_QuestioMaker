/* eslint-disable*/
import { IEntity } from "cdsify";
// Entity axa_Question
export const axa_questionMetadata = {
  typeName: "mscrm.axa_question",
  logicalName: "axa_question",
  collectionName: "axa_questions",
  primaryIdAttribute: "axa_questionid",
  attributeTypes: {
    // Numeric Types
    axa_expectedtime: "Integer",
    axa_max: "Decimal",
    axa_min: "Decimal",
    axa_questionimage_timestamp: "BigInt",
    axa_suggestedpoints: "Integer",
    importsequencenumber: "Integer",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    axa_difficulty: "Optionset",
    axa_type: "Optionset",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
    axa_CourseCategory: ["mscrm.axa_coursecategory"],
  },
};

// Attribute constants
export enum axa_QuestionAttributes {
  axa_CourseCategory = "axa_coursecategory",
  axa_CourseCategoryName = "axa_coursecategoryname",
  axa_Difficulty = "axa_difficulty",
  axa_ExactAnswer = "axa_exactanswer",
  axa_ExpectedTime = "axa_expectedtime",
  axa_Keywords = "axa_keywords",
  axa_Max = "axa_max",
  axa_Min = "axa_min",
  axa_Name = "axa_name",
  axa_PCFisError = "axa_pcfiserror",
  axa_QuestionId = "axa_questionid",
  axa_QuestionImage = "axa_questionimage",
  axa_QuestionImage_Timestamp = "axa_questionimage_timestamp",
  axa_QuestionImage_URL = "axa_questionimage_url",
  axa_QuestionImageId = "axa_questionimageid",
  axa_QuestionNumber = "axa_questionnumber",
  axa_RandomizeAnswers = "axa_randomizeanswers",
  axa_RawText = "axa_rawtext",
  axa_SuggestedPoints = "axa_suggestedpoints",
  axa_Text = "axa_text",
  axa_Type = "axa_type",
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ImportSequenceNumber = "importsequencenumber",
  ModifiedBy = "modifiedby",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  OverriddenCreatedOn = "overriddencreatedon",
  OwnerId = "ownerid",
  OwnerIdName = "owneridname",
  OwnerIdType = "owneridtype",
  OwnerIdYomiName = "owneridyominame",
  OwningBusinessUnit = "owningbusinessunit",
  OwningBusinessUnitName = "owningbusinessunitname",
  OwningTeam = "owningteam",
  OwningUser = "owninguser",
  statecode = "statecode",
  statuscode = "statuscode",
  TimeZoneRuleVersionNumber = "timezoneruleversionnumber",
  UTCConversionTimeZoneCode = "utcconversiontimezonecode",
  VersionNumber = "versionnumber",
}

// Early Bound Interface
export interface axa_Question extends IEntity {
  // Course Category LookupType
  axa_coursecategory?: import("cdsify").EntityReference | null;
  //  StringType
  axa_coursecategoryname?: string | null;
  // Difficulty axa_difficulty
  axa_difficulty?: import("../enums/axa_difficulty").axa_difficulty | null;
  // ExactAnswer StringType
  axa_exactanswer?: string | null;
  // Expected Time IntegerType the expected time from the student to finish the question 
  axa_expectedtime?: number | null;
  // Keywords StringType
  axa_keywords?: string | null;
  // Max DecimalType the maximum value accepted as answer 
  axa_max?: number | null;
  // Min DecimalType Minimum value accepted as correct answer,
  axa_min?: number | null;
  // Name [Required] StringType
  axa_name?: string;
  // PCFisError BooleanType this field is used as a workaround for the pcf validation and form save rejection
  axa_pcfiserror?: boolean | null;
  // Question UniqueidentifierType Unique identifier for entity instances
  axa_questionid?: import("cdsify").Guid | null;
  // QuestionImage ImageType
  axa_questionimage?: string | null;
  //  BigIntType
  axa_questionimage_timestamp?: number | null;
  //  StringType
  axa_questionimage_url?: string | null;
  //  UniqueidentifierType
  axa_questionimageid?: import("cdsify").Guid | null;
  // QuestionNumber StringType
  axa_questionnumber?: string | null;
  // Randomize Answers BooleanType
  axa_randomizeanswers?: boolean | null;
  // Raw Text StringType the same as the text, but no rich formatting, aka no html, plain text
  axa_rawtext?: string | null;
  // Suggested Points IntegerType
  axa_suggestedpoints?: number | null;
  // Text StringType
  axa_text?: string | null;
  // Type [Required] axa_questiontype
  axa_type?: import("../enums/axa_questiontype").axa_questiontype;
  // Created By LookupType Unique identifier of the user who created the record.
  createdby?: import("cdsify").EntityReference | null;
  //  StringType
  createdbyname?: string | null;
  //  StringType
  createdbyyominame?: string | null;
  // Created On DateTimeType Date and time when the record was created. DateAndTime:UserLocal
  createdon?: Date | null;
  // Created By (Delegate) LookupType Unique identifier of the delegate user who created the record.
  createdonbehalfby?: import("cdsify").EntityReference | null;
  //  StringType
  createdonbehalfbyname?: string | null;
  //  StringType
  createdonbehalfbyyominame?: string | null;
  // Import Sequence Number IntegerType Sequence number of the import that created this record.
  importsequencenumber?: number | null;
  // Modified By LookupType Unique identifier of the user who modified the record.
  modifiedby?: import("cdsify").EntityReference | null;
  //  StringType
  modifiedbyname?: string | null;
  //  StringType
  modifiedbyyominame?: string | null;
  // Modified On DateTimeType Date and time when the record was modified. DateAndTime:UserLocal
  modifiedon?: Date | null;
  // Modified By (Delegate) LookupType Unique identifier of the delegate user who modified the record.
  modifiedonbehalfby?: import("cdsify").EntityReference | null;
  //  StringType
  modifiedonbehalfbyname?: string | null;
  //  StringType
  modifiedonbehalfbyyominame?: string | null;
  // Record Created On DateTimeType Date and time that the record was migrated. DateOnly:UserLocal
  overriddencreatedon?: Date | null;
  // Owner OwnerType Owner Id
  ownerid?: import("cdsify").EntityReference | null;
  //  StringType Name of the owner
  owneridname?: string | null;
  //  EntityNameType Owner Id Type
  owneridtype?: string | null;
  //  StringType Yomi name of the owner
  owneridyominame?: string | null;
  // Owning Business Unit LookupType Unique identifier for the business unit that owns the record
  owningbusinessunit?: import("cdsify").EntityReference | null;
  //  StringType
  owningbusinessunitname?: string | null;
  // Owning Team LookupType Unique identifier for the team that owns the record.
  owningteam?: import("cdsify").EntityReference | null;
  // Owning User LookupType Unique identifier for the user that owns the record.
  owninguser?: import("cdsify").EntityReference | null;
  // Status axa_question_axa_question_statecode Status of the Question
  statecode?: import("../enums/axa_question_axa_question_statecode").axa_question_axa_question_statecode | null;
  // Status Reason axa_question_axa_question_statuscode Reason for the status of the Question
  statuscode?: import("../enums/axa_question_axa_question_statuscode").axa_question_axa_question_statuscode | null;
  // Time Zone Rule Version Number IntegerType For internal use only.
  timezoneruleversionnumber?: number | null;
  // UTC Conversion Time Zone Code IntegerType Time zone code that was in use when the record was created.
  utcconversiontimezonecode?: number | null;
  // Version Number BigIntType Version Number
  versionnumber?: number | null;
}

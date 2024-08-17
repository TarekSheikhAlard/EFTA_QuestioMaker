/* eslint-disable*/
import { IEntity } from "cdsify";
// Entity axa_Choice
export const axa_choiceMetadata = {
  typeName: "mscrm.axa_choice",
  logicalName: "axa_choice",
  collectionName: "axa_choices",
  primaryIdAttribute: "axa_choiceid",
  attributeTypes: {
    // Numeric Types
    axa_choiceimage_timestamp: "BigInt",
    axa_order: "Integer",
    importsequencenumber: "Integer",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
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
    axa_Question: ["mscrm.axa_question"],
  },
};

// Attribute constants
export enum axa_ChoiceAttributes {
  axa_ChoiceId = "axa_choiceid",
  axa_ChoiceImage = "axa_choiceimage",
  axa_ChoiceImage_Timestamp = "axa_choiceimage_timestamp",
  axa_ChoiceImage_URL = "axa_choiceimage_url",
  axa_ChoiceImageId = "axa_choiceimageid",
  axa_IsCorrect = "axa_iscorrect",
  axa_IsOther = "axa_isother",
  axa_Name = "axa_name",
  axa_order = "axa_order",
  axa_Question = "axa_question",
  axa_QuestionName = "axa_questionname",
  axa_Text = "axa_text",
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
export interface axa_Choice extends IEntity {
  // Choice UniqueidentifierType Unique identifier for entity instances
  axa_choiceid?: import("cdsify").Guid | null;
  // Choice Image ImageType
  axa_choiceimage?: string | null;
  //  BigIntType
  axa_choiceimage_timestamp?: number | null;
  //  StringType
  axa_choiceimage_url?: string | null;
  //  UniqueidentifierType
  axa_choiceimageid?: import("cdsify").Guid | null;
  // Is Correct BooleanType
  axa_iscorrect?: boolean | null;
  // Is Other BooleanType
  axa_isother?: boolean | null;
  // Name [Required] StringType
  axa_name?: string;
  // order IntegerType
  axa_order?: number | null;
  // Question LookupType
  axa_question?: import("cdsify").EntityReference | null;
  //  StringType
  axa_questionname?: string | null;
  // Text StringType
  axa_text?: string | null;
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
  // Status axa_choice_axa_choice_statecode Status of the Choice
  statecode?: import("../enums/axa_choice_axa_choice_statecode").axa_choice_axa_choice_statecode | null;
  // Status Reason axa_choice_axa_choice_statuscode Reason for the status of the Choice
  statuscode?: import("../enums/axa_choice_axa_choice_statuscode").axa_choice_axa_choice_statuscode | null;
  // Time Zone Rule Version Number IntegerType For internal use only.
  timezoneruleversionnumber?: number | null;
  // UTC Conversion Time Zone Code IntegerType Time zone code that was in use when the record was created.
  utcconversiontimezonecode?: number | null;
  // Version Number BigIntType Version Number
  versionnumber?: number | null;
}

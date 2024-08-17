/* eslint-disable*/
import { IEntity } from "cdsify";
// Entity axa_LearningObjective
export const axa_learningobjectiveMetadata = {
  typeName: "mscrm.axa_learningobjective",
  logicalName: "axa_learningobjective",
  collectionName: "axa_learningobjectives",
  primaryIdAttribute: "axa_learningobjectiveid",
  attributeTypes: {
    // Numeric Types
    importsequencenumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    timezoneruleversionnumber: "Integer",
    // Optionsets
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    modifiedon: "DateAndTime:UserLocal",
    createdon: "DateAndTime:UserLocal",
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
export enum axa_LearningObjectiveAttributes {
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  OwningTeam = "owningteam",
  statecode = "statecode",
  OwnerIdName = "owneridname",
  axa_Description = "axa_description",
  CreatedOnBehalfBy = "createdonbehalfby",
  axa_CourseCategoryName = "axa_coursecategoryname",
  OwningUser = "owninguser",
  ImportSequenceNumber = "importsequencenumber",
  ModifiedByYomiName = "modifiedbyyominame",
  UTCConversionTimeZoneCode = "utcconversiontimezonecode",
  CreatedByYomiName = "createdbyyominame",
  OwningBusinessUnit = "owningbusinessunit",
  ModifiedByName = "modifiedbyname",
  VersionNumber = "versionnumber",
  axa_ID = "axa_id",
  ModifiedBy = "modifiedby",
  CreatedBy = "createdby",
  TimeZoneRuleVersionNumber = "timezoneruleversionnumber",
  OwnerIdType = "owneridtype",
  axa_LearningObjectiveId = "axa_learningobjectiveid",
  axa_CourseCategory = "axa_coursecategory",
  OwnerIdYomiName = "owneridyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  statuscode = "statuscode",
  CreatedByName = "createdbyname",
  CreatedOn = "createdon",
  OwningBusinessUnitName = "owningbusinessunitname",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  OwnerId = "ownerid",
  OverriddenCreatedOn = "overriddencreatedon",
  axa_Name = "axa_name",
}

// Early Bound Interface
export interface axa_LearningObjective extends IEntity {
  //  StringType
  createdonbehalfbyyominame?: string | null;
  // Modified By (Delegate) LookupType Unique identifier of the delegate user who modified the record.
  modifiedonbehalfby?: import("cdsify").EntityReference | null;
  // Owning Team LookupType Unique identifier for the team that owns the record.
  owningteam?: import("cdsify").EntityReference | null;
  // Status axa_learningobjective_axa_learningobjective_statecode Status of the Learning Objective
  statecode?: import("../enums/axa_learningobjective_axa_learningobjective_statecode").axa_learningobjective_axa_learningobjective_statecode | null;
  //  StringType Name of the owner
  owneridname?: string | null;
  // Description StringType
  axa_description?: string | null;
  // Created By (Delegate) LookupType Unique identifier of the delegate user who created the record.
  createdonbehalfby?: import("cdsify").EntityReference | null;
  //  StringType
  axa_coursecategoryname?: string | null;
  // Owning User LookupType Unique identifier for the user that owns the record.
  owninguser?: import("cdsify").EntityReference | null;
  // Import Sequence Number IntegerType Sequence number of the import that created this record.
  importsequencenumber?: number | null;
  //  StringType
  modifiedbyyominame?: string | null;
  // UTC Conversion Time Zone Code IntegerType Time zone code that was in use when the record was created.
  utcconversiontimezonecode?: number | null;
  //  StringType
  createdbyyominame?: string | null;
  // Owning Business Unit LookupType Unique identifier for the business unit that owns the record
  owningbusinessunit?: import("cdsify").EntityReference | null;
  //  StringType
  modifiedbyname?: string | null;
  // Version Number BigIntType Version Number
  versionnumber?: number | null;
  // ID [Required] StringType
  axa_id?: string;
  // Modified By LookupType Unique identifier of the user who modified the record.
  modifiedby?: import("cdsify").EntityReference | null;
  // Created By LookupType Unique identifier of the user who created the record.
  createdby?: import("cdsify").EntityReference | null;
  // Time Zone Rule Version Number IntegerType For internal use only.
  timezoneruleversionnumber?: number | null;
  //  EntityNameType Owner Id Type
  owneridtype?: string | null;
  // Learning Objective UniqueidentifierType Unique identifier for entity instances
  axa_learningobjectiveid?: import("cdsify").Guid | null;
  // Course Category [Required] LookupType
  axa_coursecategory?: import("cdsify").EntityReference;
  //  StringType Yomi name of the owner
  owneridyominame?: string | null;
  // Modified On DateTimeType Date and time when the record was modified. DateAndTime:UserLocal
  modifiedon?: Date | null;
  //  StringType
  modifiedonbehalfbyyominame?: string | null;
  // Status Reason axa_learningobjective_axa_learningobjective_statuscode Reason for the status of the Learning Objective
  statuscode?: import("../enums/axa_learningobjective_axa_learningobjective_statuscode").axa_learningobjective_axa_learningobjective_statuscode | null;
  //  StringType
  createdbyname?: string | null;
  // Created On DateTimeType Date and time when the record was created. DateAndTime:UserLocal
  createdon?: Date | null;
  //  StringType
  owningbusinessunitname?: string | null;
  //  StringType
  createdonbehalfbyname?: string | null;
  //  StringType
  modifiedonbehalfbyname?: string | null;
  // Owner OwnerType Owner Id
  ownerid?: import("cdsify").EntityReference | null;
  // Record Created On DateTimeType Date and time that the record was migrated. DateOnly:UserLocal
  overriddencreatedon?: Date | null;
  // Name [Required] StringType
  axa_name?: string;
}

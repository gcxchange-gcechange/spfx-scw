declare interface IScwWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  title_details: string;
  provide_bilingual_name: string;
  create_a_community: string;
  community_details: string;
  community_classification: string;
  terms: string;
  invite_owners_members: string;
  review_submit: string;
  unclassified_button: string;
  CommPurpose: string;
  engName_title: string;
  engName_desc: string;
  engName_Instruction: string;
  frCommName_title: string,
  frCommName_desc:string,
  shEngDesc_title: string;
  shEngDesc_desc: string;
  shEngDesc_Instruction: string;
  shFrDesc_title: string;
  shFrDesc_desc: string;
  shFrDesc_Instruction: string;
  owners: string;
  members: string;
  community_classification_desc: string;
  community_classification_link: string;

}

declare module 'ScwWebPartStrings' {
  const strings: IScwWebPartStrings;
  export = strings;
}

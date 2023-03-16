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
}

declare module 'ScwWebPartStrings' {
  const strings: IScwWebPartStrings;
  export = strings;
}

/* eslint-disable no-undef */

define([], function() {
  return {
    // "userLang": "EN",
    "PropertyPaneDescription": "Description",
    "BasicGroupName": "Group Name",
    "DescriptionFieldLabel": "Description Field",
    "AppLocalEnvironmentSharePoint": "The app is running on your local environment as SharePoint web part",
    "AppLocalEnvironmentTeams": "The app is running on your local environment as Microsoft Teams app",
    "AppLocalEnvironmentOffice": "The app is running on your local environment in office.com",
    "AppLocalEnvironmentOutlook": "The app is running on your local environment in Outlook",
    "AppSharePointEnvironment": "The app is running on SharePoint page",
    "AppTeamsTabEnvironment": "The app is running in Microsoft Teams",
    "AppOfficeEnvironment": "The app is running in office.com",
    "AppOutlookEnvironment": "The app is running in Outlook",
    
    //Initial page
    "SP_TeamsLogos": "SharePoint and Teams logos with arrows indicating the sharing capability between the tools.",
    "create_a_community": "Create a community",
    "collaborate":"Collaborate with colleagues across departments using Microsoft Teams\n and SharePoint to share ideas, documents across departments and agencies, and much more.",
    "a_few_things":"A few things before you start",
    "to_create": "To create a community, you will need to:",
    "provide_bilingual_name": "Provide <strong className={ styles.blue }>bilingual</strong>\nnames and descriptions",
    "bilingual_name_smallText": "Community name and description need to be fully bilingual to comply with the <i>Official Languages Act</i>",
    "indentify_one_more_owner": "Identify at least <strong className={ styles.blue }>one more Owner</strong>\n already registered to GCXchange",
    "indentify_one_more_owner_smallText": "Identifying more than one Owner ensures the <br> continuity of the community if one Owner leaves",
    "initial_thirdCardText": "Identify whether your community will be \n <strong className={ styles.blue }>Protected</strong> or <strong className={ styles.blue }>Unclassified</strong>",
    "initial_thirCardSmallText": "Terms and conditions for creating a protected community will need to be accepted prior to creating one ",
    
    //STEPPER
    "title_details": "Details",
    'classification': 'Classification',
    'term_of_use': 'Terms and conditions',
    "comm_desc_title": "Community description",
    "comm_name":"Community name",
    'owners':'Owners',
    "review_submit":"Review and submit",

    //buttons
    "Lets_go": "Let's go",
    "prev_btn":"Previous",
    "next_btn": "Next",
    "submit_btn": "Let’s do this",
    'close': 'Close',
    "unclassified_button": "I don't want to store protected documents anymore",
    "complete_button": "GCXchange Homepage",
    
  
    //validations
    'max500_validation': 'Must be between 5 and 500 characters.',
    'special_char_validation': 'Special characters are not permitted.',
    'between_5_80_char_validation': 'Must be between 5 and 80 characters.',
    'max100_validation':'Must be between 5 and 100 characters.',

    //First Step
    "community_details": "Community details",
    "commPurpose_title": "Community purpose",
    "commPurpose_desc": 'The GCX Support Team needs to know the purpose of the new community to determine whether it can be <strong>approved</strong>.',
    "commPurpose_Instruction":"This will not show up on your site. Write it in the official language of your choice. Must be between 5 and 500 characters.",
    "engName_title": 'English community name',
    "engName_desc": 'The community’s name is the title of your community. Create a short descriptive name. A bilingual name complies with the Official Languages Act and makes it easier for others to find your community in the GCXchange Catalogue.',
    "engName_Instruction": "Use keywords, not abbreviations, to help people find your community. Must be between 5 and 80 characters. Only alphabets (with French accents), numbers, spaces and apostrophes are allowed.",
    "frCommName_title": "French community name",
    "frCommName_desc":"The community’s name is the title of your community. Create a short descriptive name. A bilingual name complies with the Official Languages Act and makes it easier for others to find your community in the GCXchange Catalogue.",
    "frCommName_Instruction": "Use keywords, not abbreviations, to help people find your community. Must be between 5 and 80 characters. Only alphabets (with French accents), numbers, spaces and apostrophes are allowed.",
    "shEngDesc_title": 'Short English description',
    "shEngDesc_desc": 'The community description will be visible to users when they use the “All Communities” page and when they search for it.',
    "shEngDesc_Instruction": 'Must be between 5 and 100 characters.',
    "shFrDesc_title": 'Short French description',
    "shFrDesc_desc": 'The community description will be visible to users when they use the “All Communities” page and when they search for it. ',
    "shFrDesc_Instruction": 'Must be between 5 and 100 characters.',
    'required': 'required field',

    //Second Step
    "community_classification": "Community classification",
    "comm_classification_para1": "You may need to store protected information in your community’s library. GCXchange can provide a space for protected A and B information. First, let’s find out whether you will be storing protected information in your community.",
    "unclassified_cardTitle":"Unclassified community",
    "unclassified_cardText": "No, I don’t need to store protected information. <strong>All users will be able to find your community, and search for it.</strong>",
    "protected_cardTitle":"Protected A or B community",
    "protected_cardText":"Yes, I need to store protected information such as: consent forms, financial documentation, or other documents that, if compromised, <strong>could cause injury to an individual, organization or the government.</strong>",
    
    //Third Step
    "protectedTermTitle":"Protected community - terms and conditions",
    "protected_para1":"Looks like you need a space to store protected documents and information on GCXchange. We have a few terms and conditions for protected communities.",
    "protected_para2":"The security of documents is the responsibility of all Members on GCXchange, including yourself. We ask that you review your departmental security guidelines to make sure you are familiar with your responsibilities and so that you can inform your Members about their responsibilities, before agreeing to the terms and conditions below.",
    "agree_to_terms":"I agree to the terms and conditions below",
    'agree':'<span style="fontWeight:normal"> agree to all </span>',
     
    "chk1":"Protected A/B  communities are accessible and visible to Owners and Members only.",
    "chk1b":"I understand that my community will only be visible to Owners and Members.",
    "chk2":"GCXchange users cannot request to join protected A/B communities, they must be invited by the community Owner.",
    "chk2b":"I understand that Owners must invite Members to protected A/B  communities.",
    "chk3":"All Members of protected A/B communities must have a multi-factor authentication prior to accessing any protected A/B community.",
    "chk3b":"I understand that Members of my community must have a multi-factor authentication.",
    "chk4":"All Members must use Government Furnished Equipment (GFE) to access protected A/B communities.",
    "chk4b":"I understand that my community Members must use GFE to access my community.",
    "chk5":"Owners and Members must have a valid Government of Canada security clearance (Reliability or higher) to access protected A/B communities.",
    "chk5b":"I understand that my community Members must meet these requirements to access my community",
    "chk6":"GCXchange Support Team does not have access to protected A/B  communities. If they are required to provide help, the Owner is responsible for adding them to the community.",
    "chk6b":"I agree to grant access to GCXchange Support when needed.",
    "chk7":"Owners are responsible for managing community access. Only users with a need-to-know protected information should be included in protected A/B communities.",
    "chk7b":"I will regularly review membership of my community and remove Members who have changed roles or responsabilities. I will ensure that there are at least two (2) Owners at all times.",
    "chk7c": "",
    "chk8": "GCXchange (unclassified and protected A/B) is a transitory environment with a retention policy of two (2) years for all documents. The Owner is responsible for ensuring their documents are transferred to their department's official repository, as required.",
    "chk8b": "I agree to transfer my community documents on my department's official repository if they contain information of business value.",

    "unclassifiedTermTitle":"Unclassified community - terms and conditions",
    "unclassified": "Make sure <strong>not to store</strong> any classified information in your library. If you are unsure what information is classified you can check with your departmental security policy or information management branch.",
    "unclassified_para2":"GCXchange is a transitory environment with a retation policy of two (2) years for all documents. The Owner is responsible for ensuring their information is transferred to their department's official repository, as required.",
    
    //Fourth page
    "invite_owners_title": "Invite Owners",
    "invite_owners_para1": "We need you to add at least one more Owner before your community can be created. Please remember that Owners have a higher level of responsibility within your community. You will also be able to add Members who are registered to GCXchange once your community is created.",
    "invite_owners_label": "Invite Owners already registered to GCXchange.",
    "owners_Instruction": "Start typing an Owner’s last name to find and add them.",
    "owners_instruction_Callout": "Start typing an Owner’s email address (who is registered to GCXchange) to find and add them.",

    //Review page
    "review_info":"Review the information below and make any required changes before submitting.",
    'infoIcon_CommPurpose':'Information about Community purpose',
    'infoIcon_engName':'Information about English community name',
    'infoIcon_frName':'Information about French community name',
    'infoIcon_engDesc':'Information about English community description',
    'infoIcon_frDesc':'Information about French community description',
    'infoIcon_Owners':'Information about Owners',
    "owners_other_than_yourself": "Owners (other than yourself)",
    
    //Loading
    'submitting_your_information': 'Grab a sip of coffee, we are submitting your information.',

    //Complete
    "title_complete": "Complete!",
    "complete_img_alt":"Three people celebrating",
    "thank_you": "Thank you for your submission.", 
    "complete_content":"You will receive an email when your community has been created with everything you need to get started! (Within 48 hours Monday to Friday).",
    "complete_content2": "If you do not receive the email or have any questions, please submit a service request using the <a href=https://gcxgce.sharepoint.com/sites/Support  target={_blank} rel={noopener}>GCXchange Support portal</a>",

    //Failed
    "oops": "Oops!",
    'failed_oops': 'Oops, something went wrong!',
    'failed_ProB_text':"Something went terribly wrong! Please send an email to the Client Services Team, or try again later",
    'failed_txt1': 'Let us try to make it right.',
    'failed_txt2': 'The GCXchange Support team will create the community on your behalf. Once created, you will receive an email with everything you need to get started!',
    'failed_txt3': 'Our team will respond within 24 to 48 hours Monday to Friday.',
    'failed_txt4': 'If you do not receive the email or you do have any questions, please submit a service request using the',
    "submissionFailed": "Submission failed",

    //Modal
    "community_classification_Modal": "<span style=fontWeight:normal>a</span> Community classification",
    "classificationCallout":"To change the classification of your community, you need to go back to the Community classification page, and read the terms and conditions.",
    "changeClassificationButton":"Community classification page",

    //Errors
    'you_must':'You must',
    'provide': '<span style="fontWeight:normal"> provide </span>',
    "blankField":"Cannot be left blank.",
    "remove_special_char": "Please remove the following special characters:",
    "onlyAlphabets": "Only alphabets (with French accents), numbers, spaces and apostrophes are allowed.",
    "please_add_a_longer_purpose":"Please add a longer purpose.",
    "please_add_a_longer_name" : "Please add a longer name.",
    "please_add_a_longer_description": "Please add a longer description.",
    "please_add_a_purpose":"Please add a purpose.",
    "please_add_a_name" : "Please add a name.",
    "please_add_a_description": "Please add a description.",
    "invite_yourself":"Cannot invite yourself.",
    "please_remove_your_name":"Plese remove your name.",
    "please_add_another_owner":"Please add another Owner",
    "owner_cannot_be_blank": "Cannot be left blank. Please add another Owner.",
    "owner_cannot_invite_yourself":"Cannot invite yourself. Please remove your name.",
    "termsofUse_Modal":"You must agree to all <strong>terms and conditions</strong> before proceeding",
    "valid_email": "<span style= fontWeight:normal>You must add a valid email.</span>",
    "invalidEmail":"<span style= fontWeight:normal>add a valid email;</span>",
    "is_not_valid": "<span style= fontWeight:normal>is not valid. Please add a valid email</span>",
    "requestorUser":"As the requester of this community, you are automatically added as an Owner. You <strong>cannot invite yourself as an Owner.</strong> Please remove yourself",
    "minCharacters":"Must be at least 5 characters.",
    "isInvalidEmail": "Please remove the following invalid email:",
    "please_review_the_following_fields": "Please review the following fields",
    'one_more_owner':'<strong> add at least one more</strong> Owner',
    //////
    'select': '<span style="fontWeight:normal"> select </span>',
      
    "CommPurpose": 'The GCX Support Team needs to know the purpose of the new community to determine whether it can be <strong>approved</strong>.<br/> This will not show up on your site. Write it in the official language of your choice. Max. 500 characters.',
    
    "commPurpose_Modal": "<span style=fontWeight:normal>the</span><strong> Community purpose</strong>",
    "engName_Modal": '<span style=fontWeight:normal>the</span><strong> English community name</strong>',
    "frCommName_Modal": "<span style=fontWeight:normal>the</span><strong> French community name</strong>",
    "shEngDesc_Modal": "<span style=fontWeight:normal>the</span><strong> Short English description</strong>",
    "shFrDesc_Modal": 'Short French description',
   
    'eng_desc': 'English description',
    'fr_desc': 'French description',

    'before_proceeding': 'before proceeding.',
    'and': '<span style="fontWeight:normal"> and </span>',
    'the': '',

    "errorPopUp":"Error pop up",
    "out_of":"out of",
    "characters": "characters",

    

  }
})
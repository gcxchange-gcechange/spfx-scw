/* eslint-disable no-undef */
define([], function() {
    return {
        // "userLang": "FR",
        "secondcontent": "Deuxième contenu",
        "PropertyPaneDescription": "Description",
        "BasicGroupName": "Nom de groupe",

        //Initial Page
        "SP_TeamsLogos": "Logos SharePoint et Teams avec des flèches indiquant la capacité de partage entre les outils.",
        "create_a_community": "Créer une collectivité",
        "collaborate": "Collaborer avec des collègues de différents ministères et organismes en utilisant Microsoft Teams et SharePoint pour partager des idées, des documents et bien plus encore.",
        "a_few_things": "Quelques directives avant de commencer",
        "to_create": "Pour créer une collectivité, vous devrez :",
        "provide_bilingual_name": "Fournir des noms \net des descriptions <strong className={ styles.blue }>bilingues</strong>",
        "bilingual_name_smallText": "Indiquer le nom et la description de la collectivité et le tout doit être entièrement bilingue pour respecter la <i>Loi sur les langues officielles</i>",
        "indentify_one_more_owner": "Indiquer au moins <strong className={ styles.blue }>un autre propriétaire</strong> \ndéjà inscrit à GCÉchange",
        "indentify_one_more_owner_smallText": "La désignation de plus d’un propriétaire garantit la continuité de la collectivité en cas de départ d’un propriétaire",
        "initial_thirdCardText": "Indiquer si votre collectivité présentera des renseignements de niveau \n <strong className={ styles.blue }>Protégé</strong>  ou <strong className={ styles.blue }>Non classifié</strong>",
        "initial_thirCardSmallText": "Les conditions de création d’une collectivité protégée devront être acceptées avant la création d’une collectivité.",
        
        //STEPPER
        "title_details": "Détails",
        'classification': 'Classification',
        'term_of_use': 'Conditions d’utilisation',
        "comm_desc_title": "Description de la collectivité",
        "comm_name": "Nom de la collectivité",
        'owners': 'Propriétaires',
        "review_submit": "Vérifier et soumettre",
        
        //buttons
        "Lets_go": "C’est parti",
        "prev_btn": "Précédent",
        "next_btn": "Suivant",
        "submit_btn": "Allons-y",
        'close': 'Fermer',
        "complete_button": "Page d’accueil de GCÉchange",
        "unclassified_button": "Je ne veux plus stocker de renseignements protégés.",

        //validations
        'special_char_validation': 'Les caractères spéciaux ne sont pas autorisés.',
        'between_5_80_char_validation': 'La longueur doit être de 5 à 80 caractères.',
        'max500_validation': 'La longueur doit être de 5 à 500 caractères.',
        'max100_validation':'La longueur doit être de 5 à 100 caractères.',

        //Modal
        "commPurpose_Modal": "<span style=fontWeight:normal>l'</span><strong>objet de la collectivité</strong>",
        "engName_Modal": '<span style=fontWeight:normal>le</span> <strong>nom de la collectivité en anglais</strong>',
        "frCommName_Modal": "<span style=fontWeight:normal>le</span> <strong>nom de la collectivité en français</strong>",
        "shEngDesc_Modal": "description en anglais",
        "community_classification_Modal": "<span style=fontWeight:normal>la</span> classification de la collectivité",
        "termsofUse_Modal":"Vous devez accepter toutes les <strong>conditions d’utilisation</strong> avant de poursuivre.",
        //"classificationChoice_Modal":"Vous devez sélectionner <strong>community classification</strong> avant de poursuivre.",
        "classificationCallout":"Pour modifier la classification de votre collectivité, vous devez retourner à la page sur la classification de la collectivité et lire les conditions d’utilisation. ",
        "shFrDesc_Modal": 'description en français',
        "changeClassificationButton":"Page de classification de la collectivité ",

        //First Step
        "community_details": "Détails de la collectivité",
        "commPurpose_title": "Objet de la collectivité",
        "commPurpose_desc": 'L’équipe de soutien de GCÉchange  doit connaître l’objectif de la nouvelle collectivité pour déterminer si elle peut être <strong>approuvée</strong>.',
        "commPurpose_Instruction": "Ce renseignement n’apparaîtra pas sur votre site. Rédiger l’information dans la langue officielle de votre choix. Il doit comporter de 5 à 500 caractères.",
        "engName_title": 'Nom de la collectivité en anglais',
        "engName_desc": "Le nom de la collectivité est le titre de votre collectivité. Créer un nom court et descriptif. Un nom bilingue respecte la Loi sur les langues officielles et permet aux autres de trouver plus facilement votre collectivité dans le catalogue GCÉchange. ",
        "engName_Instruction": "Utiliser des mots-clés, et non des abréviations, pour aider les gens à repérer votre collectivité. Il doit comporter de 5 à 80 caractères. Seuls les caractères alphabétiques (avec accents français), les nombres, les espaces et les apostrophes sont permis.",
        "frCommName_title": "Nom de la collectivité en français",
        "frCommName_desc": "Le nom de la collectivité est le titre de votre collectivité. Créer un nom court et descriptif. Un nom bilingue respecte la Loi sur les langues officielles et permet aux autres de trouver plus facilement votre collectivité dans le catalogue GCÉchange. ",
        "frCommName_Instruction": 'Utiliser des mots-clés, et non des abréviations, pour aider les gens à repérer votre collectivité. Il doit comporter de 5 à 80 caractères. Seuls les caractères alphabétiques (avec accents français), les nombres, les espaces et les apostrophes sont permis.',
        "shEngDesc_title": 'Brève description en anglais',
        "shEngDesc_desc": 'La description de la collectivité sera visible pour les utilisateurs lorsqu’ils utiliseront la page « Toutes les collectivités » et lorsqu’ils font une recherche.',
        "shEngDesc_Instruction": 'Elle doit comporter de 5 à 100 caractères',
        "shFrDesc_title": 'Brève description en français',
        "shFrDesc_desc": 'La description de la collectivité sera visible pour les utilisateurs lorsqu’ils utiliseront la page « Toutes les collectivités » et lorsqu’ils font une recherche.',
        "shFrDesc_Instruction": 'Elle doit comporter de 5 à 100 caractères',
        'required': 'champ obligatoire',

        //Second Step
        "community_classification": "Classification de la collectivité",
        "comm_classification_para1": "Vous devrez peut-être conserver des renseignements protégés dans la bibliothèque de votre collectivité. GCÉchange peut fournir un espace pour des renseignements protégés. Tout d’abord, il faut savoir si vous allez stocker des renseignements protégés dans votre collectivité.",
        'unclassified_cardTitle': 'Collectivité non classifiée',
        "unclassified_cardText": "Non, je n’ai pas besoin de stocker des renseignements protégés. <strong>Tous les utilisateurs pourront trouver leur collectivité et en faire la recherche</strong>.",
        'protected_cardTitle': 'Collectivité Protégé A ou B',
        "protected_cardText": "Oui, je dois stocker des renseignements protégés tels que des formulaires de consentement, des documents financiers ou d’autres documents qui, s’ils sont compromis, <strong>pourraient causer un préjudice à une personne, à une organisation ou au gouvernement</strong>.",
       
       //Third
       "protectedTermTitle":"Collectivités protégées - Conditions d’utilisation",
       "protected_para1": "Il semble que vous ayez besoin d’un espace pour stocker des documents et des renseignements protégés sur GCÉchange. Il existe quelques conditions d’utilisation pour les collectivités protégées.",
       "protected_para2": "La sécurité des documents est la responsabilité de tous les membres de GCÉchange, y compris la vôtre. Nous vous demandons de passer en revue les directives de sécurité de votre ministère afin de veiller à ce que vous connaissiez bien vos responsabilités et pour que vous puissiez informer vos membres de leurs responsabilités, avant d’accepter les conditions d’utilisation ci-dessous.", 
       "agree_to_terms": "J’accepte les conditions d’utilisation ci-dessous",
       'agree':'<span style="fontWeight:normal"> accepter toutes les </span>',
       "chk1": "Les collectivités protégé A/B sont visibles pour les propriétaires et aux membres seulement",
       "chk1b": "Je comprends que ma collectivité sera visible pour les propriétaires et les membres seulement.",
       "chk2": "Les utilisateurs de GCÉchange ne peuvent pas demander de se joindre à une collectivité protégé A/B, car ils doivent y avoir été invités par le propriétaire de la collectivité",
       "chk2b": "Je comprends que les propriétaires doivent inviter les membres aux collectivités protégé A/B.",
       "chk3": "Tous les membres des collectivités protégé A/B doivent être soumis à un processus d’authentification multifacteur avant d’accéder à une collectivité protégé A/B. ",
       "chk3b": "Je comprends que les membres de ma collectivité doivent être soumis à un processus d’authentification multifacteur.",
       "chk4": "Tous les membres doivent utiliser l’équipement fourni par le gouvernement (EFG) pour accéder aux collectivités protégé A/B",
       "chk4b": "Je comprends que les membres de ma collectivité doivent utiliser l’EFG pour accéder à ma collectivité.",
       "chk5": "Les propriétaires et les membres doivent détenir une autorisation de sécurité valide du gouvernement du Canada (cote de fiabilité ou cote supérieure) pour accéder aux collectivités protégé A/B.",
       "chk5b": "Je comprends que les membres de ma collectivité doivent répondre à ces exigences pour accéder à ma collectivité.",
       "chk6": "L’équipe de soutien de GCÉchange n’a pas accès aux collectivités protégé A/B. Si un membre de cette équipe doit fournir son aide, le propriétaire doit l’ajouter à la collectivité.",
       "chk6b": "Je consens à accorder l’accès à l’équipe de soutien de GCÉchange lorsque la situation l’exige.",
       "chk7": "Les propriétaires sont responsables de la gestion de l’accès aux collectivités. Seuls les utilisateurs dont les renseignements protégés sont accompagnés de l’exigence du besoin de connaître doivent être intégrés aux collectivités protégé A/B",
       "chk7b": "Je vais examiner régulièrement l’adhésion des membres de ma collectivité et retirer l’adhésion des membres dont les rôles et responsabilités ont changé. Je vais m’assurer qu’il y aura en tout temps au moins deux propriétaires.",
       "chk8": "GCÉchange (non classifié et protégé A/B) est un environnement de transition comportant une politique de conservation valide deux (2) ans pour tous les documents. Le propriétaire doit s’assurer que ses documents sont transférés au registre officiel de son ministère, le cas échéant.",
       "chk8b": "Je consens à transférer mes documents de la collectivité au registre officiel de mon ministère s’ils contiennent des renseignements à valeur opérationnelle.",
       
       "unclassified_para2":"GCÉchange est un environnement de transition comportant une politique de conservation valide deux (2) ans pour tous les documents. Le propriétaire doit s’assurer que ses renseignements sont transférés au registre officiel de son ministère, le cas échéant.",
       "unclassified": "Veillez à <strong>ne pas stocker</strong> de renseignements classifiés dans votre bibliothèque. Si vous ne savez pas quels renseignements sont classifiés, vous pouvez consulter la politique de sécurité de votre ministère ou la direction de la gestion de l’information.",
       "unclassifiedTermTitle":"Conditions d’utilisation des collectivités non classifiées",

       //Fourth Page
       "invite_owners_title": "Inviter les propriétaires",
       "invite_owners_para1": "Nous vous demandons d’ajouter au moins un propriétaire avant que votre collectivité soit créée. Veuillez vous rappeler que les propriétaires disposent d’un niveau de responsabilité élevé au sein de votre collectivité. Vous pourrez également ajouter des membres qui sont inscrits à GCÉchange, une fois votre collectivité créée.",
       "invite_owners_label": "Inviter les propriétaires déjà inscrits à GCÉchange.",
       "owners_Instruction": 'Commencez à taper le nom de famille d’un responsable pour le trouver et l’ajouter.',
       "owners_instruction_Callout": "Commencez à taper l’adresse courriel d’un propriétaire (qui est inscrit GCÉchange) pour les trouver et les ajouter.",

       //Review Page
       "review_info": "Examinez les renseignements ci-dessous et apportez les modifications requises avant de les soumettre.",
       'infoIcon_CommPurpose':'Renseignements sur l’objet de la collectivité',
       'infoIcon_engName':'Renseignements sur le nom de la collectivité en anglais',
       'infoIcon_frName':'Renseignements sur le nom de la collectivité en français',
       'infoIcon_engDesc':'Renseignements sur la description de la collectivité en anglais',
       'infoIcon_frDesc':'Renseignements sur la description de la collectivité en français',
       'infoIcon_Owners':'Renseignements sur les propriétaires',
       "owners_other_than_yourself": "Propriétaires (autres que vous-même)",
       //Loading
       'submitting_your_information': 'Prenez le temps de savourer votre café ou thé; nous sommes en train de soumettre vos renseignements.',

       //Complete
       "title_complete": "Terminé!",
       "complete_img_alt":"Trois personnes qui font la fête",
       "thank_you": "Merci de nous avoir fourni ces renseignements.",
       "complete_content":"Vous recevrez un courriel lorsque votre collectivité aura été créée et tous les renseignements nécessaires pour commencer! (Dans les 48 heures du lundi au vendredi).",
       "complete_content2": "Si vous ne recevez pas de courriel ou si vous avez des questions, veuillez soumettre une demande de service à l’aide du <a href=https://gcxgce.sharepoint.com/sites/Support/SitePages/fr/Home.aspx target={_blank} rel={noopener} >portail de soutien GCÉchange</a>",

       //Failed
       "oops": "Oups!",
       'failed_oops': 'Oups, il y a eu un problème!',
       'failed_ProB_text':"Il y a eu un problème! Veuillez envoyer un courriel à l’équipe des Services aux clients, ou réessayez plus tard.",
       'failed_txt1': 'Essayons de remédier à la situation.',
       'failed_txt2': 'L’équipe de soutien GCÉchange créera la collectivité en votre nom. Vous recevrez ensuite un courriel indiquant tout ce dont vous avez besoin pour commencer!',
       'failed_txt3': 'Notre équipe vous répondra dans un délai de 24 à 48 heures, du lundi au vendredi.',
       'failed_txt4': 'Si vous ne recevez pas de courriel ou si vous avez des questions, veuillez soumettre une demande de service en utilisant',
       "submissionFailed" : "Échec de la soumission",

        //Errors
        'provide': '<span style="fontWeight:normal"> fournir </span>',
        "blankField":"Ne pas laisser en blanc.",
        "onlyAlphabets":"Seuls les caractères alphabétiques (avec accents français), les nombres, les espaces et les apostrophes sont permis.",
        "remove_special_char": "Veuillez supprimer les caractères spéciaux suivants : ",
        "please_add_a_longer_purpose":"Veuillez ajouter un objet plus long.",
        "please_add_a_longer_name" : "Veuillez ajouter un nom plus long.",
        "please_add_a_longer_description": "Veuillez ajouter une description plus longue.",
        "please_add_a_purpose":"Veuillez ajouter un objet.",
        "please_add_a_name" : "Veuillez ajouter un nom.",
        "please_add_a_description": "Veuillez ajouter une description.",
        'you_must': 'Vous devez',
        "valid_email": "Vous devez fournir un courriel valide;",
        "invalidEmail":"fournir un courriel valide;",
        "is_not_valid": "n'est pas valide. Veuillez fournir un courriel valide",
        "requestorUser":"En tant que demandeur de la création de cette collectivité, vous êtes automatiquement ajouté comme propriétaire.</span> <strong>Vous ne pouvez pas vous inviter en tant que propriétaire</strong>. Veuillez vous désinscrire",
        "minCharacters":"La longueur doit être d’au moins 5 caractères.",
        "invite_yourself":"Vous ne pouvez pas vous inviter vous-même.",
        "please_remove_your_name":"Veuillez retirer votre nom.",
        "isInvalidEmail": "Veuillez supprimer le courriel suivant:",
        "please_add_another_owner":"Veuillez ajouter le nom d’un autre propriétaire.",
        "please_review_the_following_fields": "Veuillez réviser les champs suivants",
        "owner_cannot_be_blank": "Ce champ ne peut demeurer vide. Veuillez ajouter le nom d’un autre propriétaire.",
        "owner_cannot_invite_yourself":"Vous ne pouvez pas vous inviter vous-même. Veuillez retirer votre nom.",
        'one_more_owner':'<strong> ajouter au moins un autre</strong>  propriétaire',


        ////Other

        // 'eng_desc': 'Description en anglais',
        // 'fr_desc': 'Description en français',
        // 'before_proceeding': 'avant de poursuivre.',
        // 'and': '<span style="fontWeight:normal"> et </span>',
        // 'the': 'le',
        // 'select': '<span style="fontWeight:normal"> sélectionner </span>',
        // "errorPopUp":"Message d’erreur",
        // "out_of":"sur",
        // "characters": "caractères",
       
    
    
        

    } 
});
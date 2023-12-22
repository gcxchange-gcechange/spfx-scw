/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { IIconStyles, Icon, Modal } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack, StackItem } from "office-ui-fabric-react/lib/Stack";
import parse from 'html-react-parser';
import { SelectLanguage } from './SelectLanguage';
// import { IButtonStyles } from "office-ui-fabric-react";
// import { PrimaryButton } from "office-ui-fabric-react";

export interface IErrorModalProps {
  showModal: boolean;
  openModal?: () => void;
  onClose?: () => void;
  engName: string;
  frCommName: string;
  commPurpose: string;
  shEngDesc: string;
  shFrDesc: string;
  // selectedChoice: string;
  checkedValues: string[];
  ownerList: string[];
  current: number;
  prefLang: string;
  invalidUser: string;
  requestor: any;
}

export interface IErrorModalState {}

export default class ErrorModal extends React.Component<IErrorModalProps, IErrorModalState> {
  public constructor(props: IErrorModalProps, state: IErrorModalState) {
    super(props);
  }

  public strings = SelectLanguage(this.props.prefLang);

  private modalStyle = {
    main: {
      display: "flex",
      borderRadius: "5px",
      minWidth: "600px",
      maxWidth: "600px"
    },
    header: {
      backgroundColor: "#106EBE",
      color: "white",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
     
      
    },

    body: {
      paddingTop: "20px",
      paddingBottom: "20px",
      paddingLeft: "30px",
      paddingRight: "30px",
     
    },
    footer: {
      padding: "10px",
      marginLeft: "60px",
      marginRight: "60px"
    },
  };

  public errorMessage = (): string => {


   
    const {
      current,
      commPurpose,
      engName,
      frCommName,
      shEngDesc,
      shFrDesc,
      // selectedChoice,
      // checkedValues,
      ownerList,
      invalidUser,
    } = this.props;

  // const filtered = checkedValues.filter((value, i) => {
  //   return checkedValues.iOf(value) === i
  // });

    interface PropValues {
      name: string;
      value: any;
    }

    let requestingUser: string = '';
    // const owners = ownerList.length;

    for (let i = 0; i < ownerList.length; i++) {
      console.log("O",ownerList[i])
      if ( ownerList[i] === this.props.requestor) {
        requestingUser = this.props.requestor
      } 
      
    }

    // const firstValues: PropValues[] = [
    //   { name: `${ this.strings.commPurpose_Modal }`, value: `${commPurpose}` },
    //   { name: `${ this.strings.engName_Modal }`, value: `${engName}` },
    //   { name: `${ this.strings.frCommName_Modal }`, value: `${frCommName}` },
    //   { name: `${ this.strings.shEngDesc_Modal }`, value: `${shEngDesc}` },
    //   { name: `${ this.strings.shFrDesc_Modal }`, value: `${shFrDesc}` },
    // ];
      const invalidUserBold = "<strong>" + invalidUser + "</strong>"; //unvalid email need to be bold
    // const secondValues: PropValues[] = [
    //   { name: `${ this.strings.community_classification_Modal }`, value: `${selectedChoice}` },
    // ];
   
    // const thirdValues: PropValues[] = [
    //   { name: `${ this.strings.term_of_use.toLowerCase() }`, value: `${filtered.length}` },
    // ];

    // const fourthValues: PropValues[] = [
    //   { name: `${this.strings.valid_email} ${invalidUserBold} ${this.strings.is_not_valid}`, value: `${invalidUser}` },
    //   { name: `${this.strings.requestorUser }`, value: `${requestingUser}` },
    //   { name: `${this.strings.you_must} ${this.strings.one_more_owner}`, value: `${ownerList.length}`}
    // ];

    const lastValues: PropValues[] = [
      { name: `${ this.strings.commPurpose_Modal }`, value: `${commPurpose}` },
      { name: `${ this.strings.engName_Modal }`, value: `${engName}` },
      { name: `${ this.strings.frCommName_Modal }`, value: `${frCommName}` },
      { name: `${ this.strings.shEngDesc_Modal }`, value: `${shEngDesc}` },
      { name: `${ this.strings.shFrDesc_Modal }`, value: `${shFrDesc}` },
      { name: `${this.strings.invalidEmail} ${invalidUserBold} ${this.strings.is_not_valid}`, value: `${invalidUser}` }, //remove you must provide
      { name: `${this.strings.requestorUser }`, value: `${requestingUser}` },
      { name: `${this.strings.you_must} ${this.strings.one_more_owner}`, value: `${ownerList.length}`}
    ];

    let message: string = "";
    const results: string[] = [];
    const comma = `<span style=fontWeight:normal>, </span>`;
  


      if (current === 2) {
          for (const obj of lastValues) {
              console.log('obj', obj);
              if (
                  // Check if specific input fields are empty
                  (obj.name === `${this.strings.commPurpose_Modal}` && obj.value === "") ||
                  (obj.name === `${this.strings.engName_Modal}` && obj.value === "") ||
                  (obj.name === `${this.strings.frCommName_Modal}` && obj.value === "") ||
                  (obj.name === `${this.strings.shEngDesc_Modal}` && obj.value === "") ||
                  (obj.name === `${this.strings.shFrDesc_Modal}` && obj.value === "") ||

                  // Check for invalid email format
                  (obj.name === `${this.strings.invalidEmail} ${invalidUserBold} ${this.strings.is_not_valid}` && obj.value !== "") ||

                  // Check if requestor user is provided
                  (obj.name === `${this.strings.requestorUser}` && obj.value !== "") ||

                  // Check if there is at least one more owner
                  (obj.name === `${this.strings.you_must} ${this.strings.one_more_owner}` && obj.value < 1)
              ) {
                  results.push(obj.name);
              }
              console.log("RES", results)

          }
          if (results.length > 1) {
              const tolower = results.slice(-1)[0];
              // message = results.slice(0, -1).join(`${comma}`) + `${this.strings.and}` + tolower.charAt(0).toLowerCase() + tolower.slice(1)//on last slice only lower first character
              console.log("slice 0 " + results.slice(0)[0])

             // if (results.slice(0)[0].includes('add a valid email') || results.slice(0)[0].includes('un courriel valide')) {
                //  console.log("contain valid email");
              //  message = results.slice(0, -1).join(`${comma}`) + `${this.strings.and}` + tolower.charAt(0).toLowerCase() + tolower.slice(1)//on last slice only lower first character
// } else {
                  //console.log("do not contain valid email");
                  message = `${this.strings.you_must} ${this.strings.provide}` + results.slice(0, -1).join(`${comma}`) + `${this.strings.and}` + tolower.charAt(0).toLowerCase() + tolower.slice(1)//on last slice only lower first character
          //  }
 
      }
        else if (results.length === 1) {
           // if (results[0] === `${this.strings.invalidEmail} ${invalidUserBold} ${this.strings.is_not_valid}` || `${this.strings.requestorUser }`) {
            //    message = `${results}`
          //  } 
          //  else {
                message = `${this.strings.you_must} ${this.strings.provide} ${results}`
          //  }
                
      }  
    
      // if (results.length > 0) {
      //   message = `${this.strings.provide} ${results.join(', ')}`;
      // }
    }
    
   

    console.log('MES',message);
    return  message;
  };

  public renderFirstPageMessage = ():JSX.Element => {

    const {current, commPurpose, engName, frCommName, shEngDesc, shFrDesc } = this.props;

    const firstValues: any[] = [
      { name: `${ this.strings.commPurpose_title }`, value: `${commPurpose}` ,  longerText:`${this.strings.please_add_a_longer_purpose}`, addText: `${this.strings.please_add_a_purpose}` },
      { name: `${ this.strings.engName_title }`, value: `${engName}`, longerText: `${this.strings.please_add_a_longer_name}`, addText: `${this.strings.please_add_a_name}`},
      { name: `${ this.strings.frCommName_title }`, value: `${frCommName}` , longerText:`${this.strings.please_add_a_longer_name}`, addText:  `${this.strings.please_add_a_name}`},
      { name: `${ this.strings.shEngDesc_title }`, value: `${shEngDesc}` ,  longerText: `${this.strings.please_add_a_longer_description}`, addText:  `${this.strings.please_add_a_description}`},
      { name: `${ this.strings.shFrDesc_title }`, value: `${shFrDesc}`,  longerText: `${this.strings.please_add_a_longer_description}`, addText: `${this.strings.please_add_a_description}`},
    ];

    //const emptyValues: any[] =[];

    if (current === 0 ){

      //iterate through the values in obj arary

      firstValues.forEach((obj) => {
        console.log("obj", obj);
        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(obj.value);
        //const matchChar =  obj.value.match(/[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/g);
        let special = '';
        const newKey = 'specialChar';

        obj.value.replace(/[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/g,(match:any) => {
          special  += match + " ";
          });

        console.log("matChar", obj.name)

        if (obj.name === `${this.strings.engName_title}` || obj.name === `${this.strings.frCommName_title}` && charAllowed ) {
         obj[newKey] = special
      
        }
        // else if(obj.value.length < 5 && !charAllowed) {
        //   emptyValues.push({name: obj.name, value: obj.value,  specialChar: "",  longerText: obj.longerText})
        // }

      });


    }

      return (
        <>
        {firstValues.map((item, index) => (
          <>

          <h3 key={index}><strong>{item.value < 5 || item.specialChar ? item.name : ""}</strong></h3>
          <ul>
            {(item.value.length >=1 && item.value.length < 5)  && (
                <li>{`${this.strings.minCharacters} ${item.longerText}`}</li>
              ) 
            }
          
            {item.specialChar && 
            ( <li>{`${this.strings.remove_special_char}`}<span style={{color:'#C61515'}}> {item.specialChar} </span></li>) 
            }
            {item.value === ''  && (<li>{`${this.strings.blankField} ${item.addText}`} </li>)}
          </ul>
          </>
        ))}
      </>
      );
  }

  public renderSecondPageMessage = ():string => {

    const {current, invalidUser, ownerList, requestor } = this.props;

    let requestingUser: string = '';

    for (let i = 0; i < ownerList.length; i++) {
      console.log("O",ownerList[i])
      if ( ownerList[i] === requestor) {
        requestingUser =  requestor
      } 
      
    }
    const invalidUserBold = "<strong>" + invalidUser + "</strong>";  //unvalid email need to be bold

    const secondPageValues: any[] = [
      { name: `${this.strings.valid_email} ${invalidUserBold} ${this.strings.is_not_valid}`, value: `${invalidUser}` },
      { name: `${this.strings.requestorUser }`, value: `${requestingUser}` },
      { name: `${this.strings.you_must} ${this.strings.one_more_owner}`, value: `${ownerList.length}`}
    ];

    

  

    const resultValues: any[] =[];
    const comma = `<span style=fontWeight:normal>, </span>`;
    let message = "";

 
    if (current === 1 ){

      for (const obj of secondPageValues){
        console.log("obj", obj);

        const addOneMoreOwner = obj.name === `${this.strings.you_must} ${this.strings.one_more_owner}`;
        const invalidEmail = obj.name === `${this.strings.valid_email} ${invalidUserBold} ${this.strings.is_not_valid}`;
        const removeRequestor = obj.name === `${this.strings.requestorUser}`;

        if ((addOneMoreOwner && obj.value < 1 && invalidUser === '') || (invalidEmail && obj.value !== '') || (removeRequestor && obj.value !== '')) {
          resultValues.push(obj.name);
              if (resultValues.length > 1) {
                  const tolower = resultValues.slice(-1)[0];
                  message = resultValues.slice(0, -1).join(`${comma}`) + `${this.strings.and}` + tolower.charAt(0).toLowerCase() + tolower.slice(1)//on last slice only lower first character
          }
          else if (resultValues.length === 1){
            message = `${obj.name}`
          }
        }
      }
    }
      console.log("MESSAGE", message);
      return message;
      
  }

  public render(): React.ReactElement<IErrorModalProps> {

    const messages = parse(this.errorMessage());
    const firstPageErrorMessage = this.renderFirstPageMessage();
    const secondPageErrorMessage = parse(this.renderSecondPageMessage());

    const iconStyles: Partial<IIconStyles> = { 
      root: { fontSize: '70px',
              color: 'white'
    
            } 
    };


    console.log("currnet page", this.props.current)

 
    return (
      <>
        <Modal
          titleAriaId={this.strings.oops}
          isOpen={ this.props.showModal}
          onDismiss={ this.props.onClose}
          isBlocking={ true}
          styles={{
            main: this.modalStyle.main,
          }}
        >
          <div>
            
              <div style={ this.modalStyle.header}>
                <IconButton iconProps={{iconName: "ChromeClose"}} 
                  className ={styles.cancelIcon}  
                  tabIndex={1} 
                  aria-label= { this.strings.close } 
                  onClick={ this.props.onClose}
                />
                <Stack>
                  <StackItem align="center">
                  <Icon iconName={"Error"} styles={iconStyles}/>
                  </StackItem>
                  <StackItem align="center">
                  <h2>{this.strings.oops}</h2>
                  </StackItem>   
                </Stack>
              </div>
              <div style={this.modalStyle.body}>
                
                {this.props.current === 0 && (
                  <>
                  <h3>Please review the following fields</h3>
                  {firstPageErrorMessage}
                  </>
                )}

                {this.props.current === 1 && (
                  <Stack>
                    <p className={styles.modalContent}> {secondPageErrorMessage} {this.strings.before_proceeding}</p>
                  </Stack>
                )} 

                {this.props.current === 2 && (
                  <>
                 <Stack>
                    <p className={styles.modalContent}> {messages} {this.strings.before_proceeding}</p>
                  </Stack>
                  </>
                )}
              </div>
              <div style={this.modalStyle.footer}>
                <Stack>
                  <StackItem>
                    <hr  aria-hidden= 'true' className={styles.horizontalLine} />
                  </StackItem>
                  <StackItem align="center">
                    <button
                      tabIndex={2}
                      aria-label= { this.strings.close }
                      onClick={ this.props.onClose}
                      className={styles.close}
                    >
                      { this.strings.close }
                    </button>
                  </StackItem>
                </Stack>
                 
                 
              </div>
          </div>

        </Modal>
      </>
    )
  }
}

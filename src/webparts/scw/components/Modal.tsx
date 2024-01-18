/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Modal } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import parse from 'html-react-parser';
import { SelectLanguage } from './SelectLanguage';

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
      maxWidth: "600px",
    },
    header: {
      backgroundColor: "#106EBE",
      color: "white",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
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
      ownerList,
      invalidUser,
    } = this.props;



    interface PropValues {
      name: string;
      value: any;
    }

    let requestingUser: string = '';

    for (let i = 0; i < ownerList.length; i++) {
      console.log("O",ownerList[i])
      if ( ownerList[i] === this.props.requestor) {
        requestingUser = this.props.requestor
      } 
      
    }

    const firstValues: PropValues[] = [
      { name: `${ this.strings.commPurpose_Modal }`, value: `${commPurpose}` },
      { name: `${ this.strings.engName_Modal }`, value: `${engName}` },
      { name: `${ this.strings.frCommName_Modal }`, value: `${frCommName}` },
      { name: `${ this.strings.shEngDesc_Modal }`, value: `${shEngDesc}` },
      { name: `${ this.strings.shFrDesc_Modal }`, value: `${shFrDesc}` },
    ];
      const invalidUserBold = "<strong>" + invalidUser + "</strong>"; //unvalid email need to be bold


    const fourthValues: PropValues[] = [
        { name: `${this.strings.valid_email} ${invalidUserBold} ${this.strings.is_not_valid}`, value: `${invalidUser}` },
      { name: `${this.strings.requestorUser }`, value: `${requestingUser}` },
      { name: `${this.strings.you_must} ${this.strings.one_more_owner}`, value: `${ownerList.length}`}
    ];

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
   

    if (current === 0) {
      for (const obj of firstValues) {
        if( obj.value === "") {
          results.push(obj.name);
          
            if (results.length > 1) {
                message = `${this.strings.you_must} ${this.strings.provide}` + results.slice(0, -1).join(`${comma}`) + `${this.strings.and}` + results.slice(-1)
            
          } 
          else if ( results.length === 1 ) {
                message = `${this.strings.you_must} ${this.strings.provide} ${obj.name}`
          }
        }
      }   
    }



    if (current === 1 ) {
      for (const obj of fourthValues) {
         // console.log("obj", obj)
          if ((obj.name === `${this.strings.you_must} ${this.strings.one_more_owner}` && obj.value < 1 && invalidUser === '') || (obj.name === `${this.strings.valid_email} ${invalidUserBold} ${this.strings.is_not_valid}` && obj.value !== '') || (obj.name === `${this.strings.requestorUser}` && obj.value !== '')) {
          results.push(obj.name);
              if (results.length > 1) {
                  const tolower = results.slice(-1)[0];
                  message = results.slice(0, -1).join(`${comma}`) + `${this.strings.and}` + tolower.charAt(0).toLowerCase() + tolower.slice(1)//on last slice only lower first character
          }
          else if (results.length === 1){
            message = `${obj.name}`
          }
        }

      }

    }
   

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


          }
          if (results.length > 1) {
              const tolower = results.slice(-1)[0];
              console.log("slice 0 " + results.slice(0)[0])
                  message = `${this.strings.you_must} ${this.strings.provide}` + results.slice(0, -1).join(`${comma}`) + `${this.strings.and}` + tolower.charAt(0).toLowerCase() + tolower.slice(1)//on last slice only lower first character

 
      }
        else if (results.length === 1) {

                message = `${this.strings.you_must} ${this.strings.provide} ${results}`
      
      }  
    

    }
    

    return  message;
  };

  public render(): React.ReactElement<IErrorModalProps> {

    const messages = parse(this.errorMessage());


    return (
      <>
       
          <Modal
            titleAriaId={ this.strings.forget }
            isOpen={ this.props.showModal}
            onDismiss={ this.props.onClose}
            isBlocking={ true}
            styles={{
              main: this.modalStyle.main,
            }}
          >
            <div>
            <div style={ this.modalStyle.header}>
              <h2>{this.strings.forget}</h2>
              <IconButton
                tabIndex={1}
                aria-label= { this.strings.close }
                className={styles.cancelIcon}
                iconProps={{ iconName: "Cancel" }}
                onClick={ this.props.onClose}
              />
            </div>
            <div style={ this.modalStyle.footer}>
              <Stack>
                <Stack.Item align="center">

                  {  
                  this.props.current === 1 ? 
                  <p>{messages} { this.strings.before_proceeding }</p>
                  :
                  <p className={styles.modalContent}> {messages} {this.strings.before_proceeding}</p>
                  }
                  
                </Stack.Item>
                <Stack.Item>
                  <hr  aria-hidden= 'true' className={styles.horizontalLine} />
                </Stack.Item>
                <Stack.Item align="center">
                  <button
                    tabIndex={2}
                    aria-label= { this.strings.close }
                    onClick={ this.props.onClose}
                    className={styles.close}
                  >
                    { this.strings.close }
                  </button>
                </Stack.Item>
              </Stack>
            </div>
            </div>
          </Modal>
      </>
    );
  }
}

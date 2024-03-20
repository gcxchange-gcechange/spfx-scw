/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { IIconStyles, Icon, Modal } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack, StackItem } from "office-ui-fabric-react/lib/Stack";
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
  checkedValues: string[];
  ownerList: string[];
  current: number;
  prefLang: string;
  invalidUser: string;
  requestor: string;
}


export default class ErrorModal extends React.Component<IErrorModalProps> {

  public strings = SelectLanguage(this.props.prefLang);

  private modalStyle = {
    main: {
      display: "flex",
      borderRadius: "5px",
      minWidth: "602px",
      maxWidth: "602px",
      minHeight: "207px"
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
      paddingBottom: "10px",
      marginLeft: "60px",
      marginRight: "60px"
    },
  };

  

  public renderFirstPageMessage = ():JSX.Element => {

    const {commPurpose, engName, frCommName, shEngDesc, shFrDesc } = this.props;


    const firstValues: any[] = [
      { name: `${ this.strings.commPurpose_title }`, value: `${commPurpose}` ,  longerText:`${this.strings.please_add_a_longer_purpose}`, addText: `${this.strings.please_add_a_purpose}` },
      { name: `${ this.strings.engName_title }`, value: `${engName}`, longerText: `${this.strings.please_add_a_longer_name}`, addText: `${this.strings.please_add_a_name}`},
      { name: `${ this.strings.frCommName_title }`, value: `${frCommName}` , longerText:`${this.strings.please_add_a_longer_name}`, addText:  `${this.strings.please_add_a_name}`},
      { name: `${ this.strings.shEngDesc_title }`, value: `${shEngDesc}` ,  longerText: `${this.strings.please_add_a_longer_description}`, addText:  `${this.strings.please_add_a_description}`},
      { name: `${ this.strings.shFrDesc_title }`, value: `${shFrDesc}`,  longerText: `${this.strings.please_add_a_longer_description}`, addText: `${this.strings.please_add_a_description}`},
    ];

    
      firstValues.forEach((obj) => {
        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(obj.value);
        let special = '';
        const newKey = 'specialChar';

        obj.value.replace(/[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/g,(match:any) => {
          special  += match + " ";
          });

        if (obj.name === `${this.strings.engName_title}` || obj.name === `${this.strings.frCommName_title}` && charAllowed ) {
         obj[newKey] = special
      
        }

      });



      return (
        <>
        {firstValues.map((item, index) => (
          <>
          <h3 key={index}><strong>{( item.value.length < 5 || item.specialChar ) ? item.name : ""}</strong></h3>
          <ul>
            {(item.value.length >=1 && item.value.length < 5)  && (
                <li>{`${this.strings.minCharacters} ${item.longerText}`}</li>
              ) 
            }
          
            {item.specialChar && 
            ( <li>{`${this.strings.remove_special_char}`}<span style={{color:'#C61515'}} aria-label={item.specialChar} > {item.specialChar} </span></li>) 
            }
            {item.value === ''  && (<li>{`${this.strings.blankField} ${item.addText}`} </li>)}
          </ul>
          </>
        ))}
      </>
      );
  }

  public renderSecondPageMessage = ():string  => {

    const { ownerList, requestor, invalidUser } = this.props;

    const invalidUserBold = "<strong>" + invalidUser + "</strong>";  //unvalid email need to be bold
   
    const messageValues : any [] = [

      {name: 'requestingUser', message: `${this.strings.requestorUser }`, value: requestor},
      {name: 'invalidEmailUser', message: `${this.strings.invalidEmail} ${invalidUserBold} ${this.strings.is_not_valid}`, value: invalidUser}

    ]

    const resultValues: string[] =[];
    let message:string  = "";

    messageValues.forEach((item) => {
      console.log(item.value)
      if (item.value !== '') {
        resultValues.push(item.message); 

        if(resultValues.length > 1) {
          
          const tolower = resultValues.slice(-1)[0];
          message = resultValues.slice(0, -1).join(`,`) + `${this.strings.and}` + tolower.charAt(0).toLowerCase() + tolower.slice(1)//on last slice only lower first character
          
        }  
        else if (resultValues.length === 1 && item.message === `${this.strings.invalidEmail} ${invalidUserBold} ${this.strings.is_not_valid}`) {
          message = `${this.strings.you_must} ${resultValues[0]}`
        }
        else  if(resultValues.length === 1) { 
          message = resultValues[0];
        }
      }

    })

     if(ownerList.length === 0 ) {
      message = `${this.strings.you_must} ${this.strings.one_more_owner}`;
     }

      return message

  }

  
  public renderCombinedMessage = (): JSX.Element | string => {
    const firstPageMessage = this.renderFirstPageMessage();

    const { ownerList, requestor, invalidUser } = this.props;

    const invalidUserBold = "<strong>" + invalidUser + "</strong>";

    const reviewOwnerMessages : any [] = [

      {name: 'requestingUser', message: `${this.strings.owner_cannot_invite_yourself}`, value: requestor},
      {name: 'invalidEmailUser', message: parse(`${this.strings.isInvalidEmail} ${invalidUserBold}`), value: this.props.invalidUser}

    ]

    const ownerResults: string[] =[];

    reviewOwnerMessages.forEach((item) => {
      if(item.value !== '') {
        ownerResults.push(item.message);
      }

    } )

    if(ownerList.length === 0) {
      ownerResults.push(`${this.strings.owner_cannot_be_blank}`)
    }


    return (
      <>
      {firstPageMessage}   
      
        <>
        {ownerResults.length !== 0 && (<h3><strong>{this.strings.owners}</strong></h3>)}
        {ownerResults.map((item, index) => (
        <ul key={index}>
          <li>{item}</li>
        </ul>
      ))}
        </>

    </>
    );


  }

  
  public render(): React.ReactElement<IErrorModalProps> {

    const firstPageErrorMessage = this.renderFirstPageMessage();
    const secondPageErrorMessage = parse(this.renderSecondPageMessage());
    const thirdPageErrorMessage = this.renderCombinedMessage();

    const iconStyles: Partial<IIconStyles> = { 
      root: { fontSize: '70px',
              color: 'white'
            } 
    };

 
    return (
      <>
        <Modal
          titleAriaId={"Error pop up"}
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
                  aria-label={this.strings.close}
                  aria-hidden= "true"
                  onClick={ this.props.onClose}
                />
                <Stack>
                  <StackItem align="center">
                  <Icon iconName={"Error"} styles={iconStyles}/>
                  </StackItem>
                  <StackItem align="center">
                  <h2 aria-label="Error pop up">{this.strings.oops}</h2>
                  </StackItem>   
                </Stack>
              </div>
              <div style={this.modalStyle.body}>
                
                {this.props.current === 0 && (
                  <>
                  <h3>{this.strings.please_review_the_following_fields}</h3>
                  {firstPageErrorMessage}
                  </>
                )}

                {this.props.current === 1 && (
                  <Stack>
                    <p style={{ textAlign: 'center'}} className={styles.modalContent}> {secondPageErrorMessage} {this.strings.before_proceeding}</p>
                  </Stack>
                )}

                {this.props.current === 2 && (
                  <>
                 <Stack>
                 <h3>{this.strings.please_review_the_following_fields}</h3>
                    <p className={styles.modalContent}> {thirdPageErrorMessage}</p>
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

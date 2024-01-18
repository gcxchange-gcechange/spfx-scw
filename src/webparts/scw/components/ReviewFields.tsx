/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import ReusableTextFieldd  from './ReusableTextField';
import {   Stack,   IStackTokens  } from 'office-ui-fabric-react';
import {validateTextField, validateSpecialCharFields } from './validationFunction'
import AddUsers from './AddUsers';
 


export interface ILastStepProps { 
    context: any;
    engName: string;
    ownerList: string[];
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    selectedChoice: string;
    showCallout: boolean;
    targetId: string;
    prefLang: string;
    current: number;
    commPurposeCallback?: (commPurpose: string) => void;
    handleEngNameCallback?: (engNameValue: string ) => void;
    frNameCallBack?:(frNameValue: string)=> void;
    handleFrDescCallback?:(frDescValue: string)=> void;
    handleEngDescCallback?:(engDescValue: string ) => void;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;
    isCalloutVisible?: ()=> void;  
    getElementId?: (id: string) => void;
    handleButtonClick?: () => void;
    handleOnChange?:(event:any, value: string)=> void;
    requestor: string;
    invalidEmail: string;
  }


export default class LastStep extends React.Component<ILastStepProps> {


    public constructor(props: ILastStepProps) {
        super(props);
        
    }
    
    public strings = SelectLanguage(this.props.prefLang);

    private  onUpdateCommPurpose = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        let value = event.target.value;
        const invalidInput: string = '';
        
        if (value.length < 5 || value.length > 500 ) {
            value = invalidInput;
        }

        const updatedPurpose = value.trim();  
        this.props.commPurposeCallback(updatedPurpose); 
     }

    private  onUpdateEngName = (event: React.ChangeEvent<HTMLInputElement>) :void => {

        let value = event.target.value;
        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(value);
        const invalidInput: string = '';

        if (charAllowed ) {
           value = invalidInput  
        } else if (value.length < 5 || value.length > 80) {
            value = invalidInput;
        }

        const updatedName = value.trim();

        this.props.handleEngNameCallback(updatedName); 
     }
    
    private  onUpdateFrName = (event: React.ChangeEvent<HTMLInputElement>) :void => {

        let value = event.target.value;
        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(value);
        const invalidInput: string = '';

        if ( charAllowed  ) {              
            value = invalidInput;
        } else if (value.length < 5 || value.length > 80) {
            value = invalidInput;
        }
        const updateFrName = value.trim();
        
        this.props.frNameCallBack(updateFrName)    
     }

     private onUpdateEngDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        let value = event.target.value;
        const invalidInput: string = '';
        // const updateEngDesc = event.target.value;

        if (value.length < 5 || value.length > 100 ) {
            value = invalidInput
        }

        const updateEngDesc = value.trim();

        this.props.handleEngDescCallback(updateEngDesc)    
     }

    private  onUpdateFrDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        let value = event.target.value;
        const invalidInput: string = '';
        

        if(value.length < 5 || value.length > 100 ) {
            value = invalidInput
        }

        const updateFrDesc = value.trim();
        
        this.props.handleFrDescCallback(updateFrDesc)    
     }
  

    
   

    public showCalloutVisible = (event: any):void => {
        const buttonId = event.currentTarget.id;


        this.elementId(buttonId);
        this.props.isCalloutVisible();
    }

    public elementId = (id: any ):void => {

        this.props.getElementId(id)
    }

    public updateDefaultOwnerValues = ( username: []):void  => {  
        console.log("USERNAME",username); 
        const newValues = username;

        this.props.getOwnersCallback( newValues );//pass to parent
    };
   
    public render(): React.ReactElement<ILastStepProps> {


        const { current, commPurpose, engName, frCommName, shEngDesc, shFrDesc } = this.props

        // const labelStyle: Partial<ILabelStyles> = {
        //     root: {
        //       paddingBottom: "5px",
        //     },
        //   };
        

        // const iconStyles: IButtonStyles = {
        //     root: {
        //         paddingTop: '10px',
        //     }
        // }

 

        // const infoIcon: IIconProps = { iconName: 'UnknownSolid' }; 

        const charCountStyles = {

            characterLimitStyle: {
              description: {
                float: "right",
                marginTop: "5px",
                fontSize: "12px",
              },
              errorMessage: {
                color: '#C61515'
              }
            },
          };
      
      
          const sectionStackTokens: IStackTokens = { childrenGap: 5 };
           
       
        return (
            
           <>
            <p>{ this.strings.review_info }</p>
            <Stack tokens={sectionStackTokens}>
                <ReusableTextFieldd
                    name="commPurpose"
                    id="commPurpose"
                    styles={charCountStyles.characterLimitStyle}
                    aria-describedby="commPurposeDesc"
                    multiline
                    rows={3}
                    defaultValue= {commPurpose}
                    validateOnLoad={false}
                    maxLength={500}
                    description={`${commPurpose.length}/500`}
                    onChange={this.onUpdateCommPurpose}
                    onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField})}
                    title = {this.strings.commPurpose_title}
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"first-line"}
                    ariaLabelRequired={this.strings.required}
                />
            
                <ReusableTextFieldd
                    name="engName"
                    id="engName"
                    styles={charCountStyles.characterLimitStyle}
                    aria-describedby="engName"
                    multiline ={false}
                    rows={1}
                    defaultValue= {engName}
                    validateOnLoad={false}
                    maxLength={80}
                    description={`${engName.length}/80`}
                    onChange={this.onUpdateEngName}
                    onGetErrorMessage={(engName) => validateSpecialCharFields(engName, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField, removeSpecialChar: this.strings.remove_special_char})}
                    title =  { this.strings.engName_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"second-line"}
                    ariaLabelRequired={this.strings.required}
                />

                <ReusableTextFieldd
                    name="FrCommName"
                    id="FrCommName"
                    styles={charCountStyles.characterLimitStyle}
                    aria-describedby="FrCommName"
                    multiline ={false}
                    rows={1}
                    defaultValue= {frCommName}
                    validateOnLoad={false}
                    maxLength={80}
                    description={`${frCommName.length}/80`}
                    onChange={this.onUpdateFrName}
                    onGetErrorMessage={(engName) => validateSpecialCharFields(engName, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField, removeSpecialChar: this.strings.remove_special_char})}
                    title = { this.strings.frCommName_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"third-line"}
                    ariaLabelRequired={this.strings.required}
                />

                <ReusableTextFieldd
                    name="shEngDesc"
                    id="shEngDesc"
                    styles={charCountStyles.characterLimitStyle}
                    aria-describedby="shEngDesc"
                    multiline ={false}
                    rows={1}
                    defaultValue= {shEngDesc}
                    validateOnLoad={false}
                    maxLength={100}
                    description={`${shEngDesc.length}/100`}
                    onChange={this.onUpdateEngDesc}
                    onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField})}
                    title =   { this.strings.shEngDesc_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"fourth-line"}
                    ariaLabelRequired={this.strings.required}
                />

                <ReusableTextFieldd
                    name="shFrDesc"
                    id="shFrDesc"
                    styles={charCountStyles.characterLimitStyle}
                    aria-describedby="shFrDesc"
                    multiline ={false}
                    rows={1}
                    defaultValue= {shFrDesc}
                    validateOnLoad={false}
                    maxLength={100}
                    description={`${shFrDesc.length}/100`}
                    onChange={this.onUpdateFrDesc}
                    onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField})}
                    title = { this.strings.shFrDesc_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"fifth-line"}
                    ariaLabelRequired={this.strings.required}
                />

                {/* <div id="">
                    <Stack horizontal verticalAlign ="end">
                        <Label styles={labelStyle}>
                            <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                            { `${this.strings.owners} (${this.strings.other_than_yourself})`}
                        </Label>
                        <IconButton id ="owners" styles  = { iconStyles } iconProps = {infoIcon} ariaLabel = { this.strings.infoIcon_Owners }  onClick= { this.showCalloutVisible }/>
                    </Stack> */}
                    <AddUsers 
                        id={'owners'}
                        aria-describedby="owners"
                        prefLang={this.props.prefLang}
                        context={this.props.context} 
                        ownerList={this.props.ownerList}
                        getOwnersCallback={this.updateDefaultOwnerValues} 
                        requestor={this.props.requestor}
                        currentPage={current}
                        lineId={'sixth-line'}
                        title = { `${this.strings.owners} (${this.strings.other_than_yourself})` }
                        showCalloutVisible={this.showCalloutVisible}
                        invalidEmail={this.props.invalidEmail}

                    
                    />
                {/* </div> */}
            </Stack>
            </>
        );
     }

  
 }
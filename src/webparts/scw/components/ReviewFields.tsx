/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import ReusableTextField  from './ReusableTextField';
import {   Stack,   IStackTokens  } from 'office-ui-fabric-react';
import {validateTextField, validateSpecialCharFields, validateOwnerField } from './validationFunction'
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


  
	public strings = SelectLanguage(this.props.prefLang);

	private  onUpdateCommPurpose = (event: React.ChangeEvent<HTMLInputElement>) :void => {
			const value = event.target.value;
			const updatedPurpose = value.trim();  
			this.props.commPurposeCallback(updatedPurpose); 
	}

	private  onUpdateEngName = (event: React.ChangeEvent<HTMLInputElement>) :void => {

			const value = event.target.value;

			const updatedName = value.trim();

			this.props.handleEngNameCallback(updatedName); 
	}
    
	private  onUpdateFrName = (event: React.ChangeEvent<HTMLInputElement>) :void => {

			const value = event.target.value;

			const updateFrName = value.trim();
			
			this.props.frNameCallBack(updateFrName)    
	}

	private onUpdateEngDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
		const value = event.target.value;

		const updateEngDesc = value.trim();

		this.props.handleEngDescCallback(updateEngDesc)    
	}

	private  onUpdateFrDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
		const value = event.target.value;

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

			const newValues = username;

			this.props.getOwnersCallback( newValues );//pass to parent
	};
   
	public render(): React.ReactElement<ILastStepProps> {


		const { current, commPurpose, engName, frCommName, shEngDesc, shFrDesc } = this.props

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
                <ReusableTextField
                    name="commPurpose"
                    id="commPurpose"
                    styles={charCountStyles.characterLimitStyle}
                    multiline
                    rows={3}
                    defaultValue= {commPurpose}
                    validateOnLoad={false}
                    maxLength={500}
                    description={`${commPurpose.length}/500`}
                    onChange={this.onUpdateCommPurpose}
                    onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: `${this.strings.minCharacters} ${this.strings.please_add_a_longer_purpose}`, blankField: `${this.strings.blankField} ${this.strings.please_add_a_purpose}` })}
                    title = {this.strings.commPurpose_title}
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"first-line"}
                    ariaLabelRequired={this.strings.required}
                    charCountId = {"commPurposeDesc"}
                    infoButton={this.strings.infoIcon_CommPurpose}
                />
                
            
                <ReusableTextField
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
                    onGetErrorMessage={(engName) => validateSpecialCharFields(engName, {minCharacters: `${this.strings.minCharacters} ${this.strings.please_add_a_longer_name}`, blankField: `${this.strings.blankField} ${this.strings.please_add_a_name}`, removeSpecialChar: this.strings.remove_special_char})}
                    title =  { this.strings.engName_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"second-line"}
                    ariaLabelRequired={this.strings.required}
                    charCountId = {"engNameCharCount"}
                    infoButton={this.strings.infoIcon_engName}
                />

                <ReusableTextField
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
                    onGetErrorMessage={(engName) => validateSpecialCharFields(engName, {minCharacters: `${this.strings.minCharacters} ${this.strings.please_add_a_longer_name}`, blankField: `${this.strings.blankField} ${this.strings.please_add_a_name}`, removeSpecialChar: this.strings.remove_special_char})}
                    title = { this.strings.frCommName_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"third-line"}
                    ariaLabelRequired={this.strings.required}
                    charCountId = {"frCommNameCharCount"}
                    infoButton={this.strings.infoIcon_frName}
                />

                <ReusableTextField
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
                    onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: `${this.strings.minCharacters} ${this.strings.please_add_a_longer_description}`, blankField: `${this.strings.blankField} ${this.strings.please_add_a_description}`})}
                    title =   { this.strings.shEngDesc_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"fourth-line"}
                    ariaLabelRequired={this.strings.required}
                    charCountId={'shEngDescCharCount'}
                    infoButton={this.strings.infoIcon_engDesc}
                />

                <ReusableTextField
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
                    onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters:`${this.strings.minCharacters} ${this.strings.please_add_a_longer_description}`, blankField: `${this.strings.blankField} ${this.strings.please_add_a_description}`})}
                    title = { this.strings.shFrDesc_title }
                    currentPage = {current}
                    showCalloutVisible={this.showCalloutVisible}
                    lineId={"fifth-line"}
                    ariaLabelRequired={this.strings.required}
                    charCountId={'shFrDescCharCount'}
                    infoButton={this.strings.infoIcon_frDesc}
                />

                    <div id="owners">
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
                            title = { `${this.strings.owners_other_than_yourself}` }
                            showCalloutVisible={this.showCalloutVisible}
                            invalidEmail={this.props.invalidEmail}
                            infoButton={this.strings.infoIcon_Owners}
                        />
                        <div style={{marginTop: '5px'}}>
                            {validateOwnerField(this.props.ownerList, this.props.requestor, this.props.invalidEmail, {blankfield: this.strings.owner_cannot_be_blank, requestorUser: this.strings.owner_cannot_invite_yourself, invalidEmail: this.strings.isInvalidEmail})}
                        </div>
                </div>
            </Stack>
            </>
        );
     }

  
 }
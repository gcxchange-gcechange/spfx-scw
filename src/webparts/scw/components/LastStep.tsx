/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import * as React from 'react';
import { IButtonStyles, IconButton, IIconProps, Label, Stack, TextField  } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { SelectLanguage } from './SelectLanguage';
import styles from './Scw.module.scss';





export interface ILastStepProps { 
    context: any;
    engName: string;
    // memberList: string[];
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
        const hasSpecialChar = /[?<>*]/.test(value);
        const startsWithSpecialChar = /^[~`!@#$%^&()_+={\x5B:;"',.|\x2F\x5D\x5C\x99-]/.test(value);
        const invalidInput: string = '';

        if ((value.length >= 5 && value.length <= 80) && startsWithSpecialChar ||  hasSpecialChar ) {
            console.log("Value ")
            value = invalidInput;
        } else if (value.length < 5 || value.length > 80) {
            console.log("length is less that 5 or more than 125");
            value = invalidInput;
        }

        const updatedName = value.trim();

        this.props.handleEngNameCallback(updatedName); 
     }
    
    private  onUpdateFrName = (event: React.ChangeEvent<HTMLInputElement>) :void => {

        let value = event.target.value;
        const hasSpecialChar = /[?<>*]/.test(value);
        const startsWithSpecialChar = /^[~`!@#$%^&()_+={\x5B:;"',.|\x2F\x5D\x5C\x99-]/.test(value);
        const invalidInput: string = '';

        if ((value.length >= 5 && value.length <= 80) && startsWithSpecialChar ||  hasSpecialChar ) { 
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


    public showCalloutVisible = ( event:any ):void => {
        
        const id = event.currentTarget.id;

        this.props.isCalloutVisible();
        this.elementId(id)
    }

    public elementId = (id: string ):void => {
        this.props.getElementId(id)
    }

    public updateDefaultOwnerValues = ( username: []):void  => {   
        const newValues = username;

        this.props.getOwnersCallback( newValues );//pass to parent
    };

  
    // public updateDefaultMemberValues = ( items: [] ):void  => { 
    //        const newValues = items;
           
    //     this.props.getMemberCallback( newValues );//pass to parent
    // };

   


    
    public render(): React.ReactElement<ILastStepProps> {


        const { engName, frCommName, shEngDesc, shFrDesc } = this.props
        
        const infoIcon: IIconProps = { iconName: 'UnknownSolid' }; 

        const iconStyles: IButtonStyles = {
            root: {
                paddingTop: '10px',
            }
        }

        return (
            
            <>
               
                <p>{ this.strings.review_info }</p>
                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='commPurpose'> 
                        <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                        { this.strings.commPurpose_title }
                    </Label>
                    <IconButton ariaLabel={ this.strings.infoIcon_CommPurpose } id='commPurpose' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='commPurpose' defaultValue={ this.props.commPurpose } onChange={ this.onUpdateCommPurpose }   onGetErrorMessage={ value => { if ((value.trim().length === 0 || value.length < 5 || value.length > 500 ))return `${this.strings.max500_validation}` } } /> 
                

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='name'>
                        <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                        { this.strings.engName_title }
                    </Label>
                    <IconButton  ariaLabel={ this.strings.infoIcon_engName} id='Engname' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='name' defaultValue={ engName }  onChange={ this.onUpdateEngName } onGetErrorMessage={ this.validateInput }  />  

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='FrCommName'>
                        <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                        { this.strings.frCommName_title }
                    </Label>
                    <IconButton  ariaLabel={ this.strings.infoIcon_frName} id='FrCommName' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='FrCommName' defaultValue={ frCommName } onChange={ this.onUpdateFrName } onGetErrorMessage={ this.validateInput }/>

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='shEngDesc'>
                        <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                        { this.strings.shEngDesc_title }
                    </Label>
                    <IconButton  ariaLabel={ this.strings.infoIcon_engDesc} id='shEngDesc' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='shEngDesc' defaultValue={ shEngDesc } onChange={ this.onUpdateEngDesc } onGetErrorMessage={ value => { if (value.length < 5 || value.length > 100  || value === '') return `${this.strings.max100_validation}` }}/>

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='shFrDesc'>
                        <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                        { this.strings.shFrDesc_title }
                    </Label>
                    <IconButton  ariaLabel={ this.strings.infoIcon_frDesc } id='shFrDesc' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='shFrDesc' defaultValue={ shFrDesc } onChange={ this.onUpdateFrDesc } onGetErrorMessage={ value => { if (value.length < 5 || value.length > 100  || value === '') return `${this.strings.max100_validation}` }}/>

                {/* <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='classification'required >{ this.strings.community_classification }</Label>
                    <IconButton ariaLabel="information" id='classification' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack> */}
                {/* <TextField style={{ background:'#eaeaea'}} id='classification' value={selectedChoice}/> */}



                <Stack horizontal verticalAlign ="end">
                    <Label>
                        <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                        { this.strings.owners }
                    </Label>
                    <IconButton id ="owners" styles  = { iconStyles } iconProps = { infoIcon } ariaLabel = { this.strings.infoIcon_Owners } onClick= { this.showCalloutVisible }/>
                </Stack>
                <PeoplePicker
                    context = { this.props.context }
                    required = { true }
                    personSelectionLimit = { 3 }
                    groupName = { "" } // Leave this blank in case you want to filter from all users
                    onChange = { this.updateDefaultOwnerValues }
                    principalTypes = { [ PrincipalType.User ] }
                    resolveDelay = {1000}
                    defaultSelectedUsers  = { this.props.ownerList }
                    ensureUser={ true }
                    allowUnvalidated={ true }
                />

                {/* <Stack horizontal verticalAlign ="end">
                    <Label>{ this.strings.members }</Label>
                    <IconButton id ="members" styles  = { iconStyles } iconProps = { infoIcon } ariaLabel ="InfoIcon" onClick={this.showCalloutVisible }/>
                </Stack> */}
                {/* <PeoplePicker
                    context = { this.props.context }
                    required = { true }
                    personSelectionLimit = { 3 }
                    groupName = { "" } // Leave this blank in case you want to filter from all users
                    onChange = { this.updateDefaultMemberValues }
                    principalTypes = { [ PrincipalType.User ] }
                    showHiddenInUI = {false }
                    resolveDelay = {1000}
                    defaultSelectedUsers  = { this.props.memberList }
                />       */}

            </>
        );
     }

    private validateInput = (value: string): string => {

         const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûüÆŒœæŸÿ'\s]/.test(value);
    

      if (charAllowed) {
        // console.log("Value has special char")
        return `${this.strings.special_char_validation}`
      }

      if ( value.length < 5 || value.length > 80 )  {
        return `${this.strings.between_5_80_char_validation}`
      }
    
       
    };


 }
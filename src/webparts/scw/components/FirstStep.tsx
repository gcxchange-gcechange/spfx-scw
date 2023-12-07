/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import { ILabelStyles, ITextFieldStyles, Icon, Label, Stack, StackItem, TextField } from 'office-ui-fabric-react';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';




export interface IFirstStepProps {
    prefLang: string;
    engName: string;
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    errorMessage: string;
    showModal: boolean;
    isError: boolean;

    handleOnChange?:(event:any, value: string)=> void;
    handleErrorMessage?: (errorMessage: string) => void;
    // handleInvalidInput?:(value: string) => void;



}


export default class FirstStep extends React.Component<IFirstStepProps> {


    public constructor(props: IFirstStepProps) {
        super(props);

        this.state = {
            isError: props.isError
        };

    }
    public strings = SelectLanguage(this.props.prefLang);
   

  

    
    public render(): React.ReactElement<IFirstStepProps> {
        

        const {engName, commPurpose,  frCommName, shEngDesc, shFrDesc, isError} = this.props;

        const labelStyle: Partial<ILabelStyles> = {
            root: {
                paddingBottom: '5px',
            },
            
        }
        const characterLimitStyle: Partial<ITextFieldStyles> = {
            description : {
                float: 'right',
                marginTop: '5px',
                fontSize:'12px'
            }
        }

        const errorCharacterLimitStyle: Partial<ITextFieldStyles> = {
            description : {
                float: 'right',
                marginTop: '5px',
                fontSize:'12px',
                color: '#C61515',
                fontWeight: '700'
            }
        }

        const errorText = document.getElementsByClassName('ms-TextField-errorMessage');

        console.log("eT:",errorText);

       const stackTokens = { childrenGap: 18 }

        return (
            <>         
            <h3>{ parse( this.strings.commPurpose_title ) }</h3>
            <p>{ parse( this.strings.commPurpose_desc) }</p>
            <div id='first-line'  >
                
                <Label htmlFor='Community purpose'styles={ labelStyle } >
                    <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                    { this.strings.commPurpose_title }
                </Label> 
                <p id='commPurposeDesc' className={ styles.instruction }>{ this.strings.commPurpose_Instruction}</p>
                
                <TextField styles={ errorText.length === 1 ? errorCharacterLimitStyle : characterLimitStyle } aria-describedby="commPurposeDesc" type='text' name='commPurpose' id='Community purpose' multiline rows={3} onChange={ this.onhandleChangeEvent } description={`${commPurpose.length}/500`}
                defaultValue={ commPurpose }  validateOnLoad= { false }  onGetErrorMessage={ value => { if (value.trim().length === 0 || value.length < 5 || value.length > 500 ) return (
                    <Stack horizontal horizontalAlign='center'>
                        <Icon iconName="AlertSolid" className={styles.errorIcon}/>
                        <p  className={styles.fieldInstruction}>{this.strings.special_char_validation}</p>
                    </Stack>
        
                )}}
                />

            </div>
            

            <h3>{ this.strings.comm_name }</h3>
            <p className={ styles.topMgn0 }>{ this.strings.engName_desc}</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <div  className={isError && styles.errorBorder }>
                        <Label htmlFor='engName' styles={ labelStyle } >
                            <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                            { this.strings.engName_title }
                        </Label>
                        <p id="engNameDesc" className={ styles.instruction }>{ this.strings.engName_Instruction}</p>
                        <TextField aria-describedby="engNameDesc" id='engName' name='engName' onChange={ this.onhandleChangeEvent } defaultValue={ engName }  validateOnLoad= { false }  
                        onGetErrorMessage={ this.validateInput } />
                    </div>
                </StackItem>
                <StackItem>
                    <div  className={isError && styles.errorBorder }>
                        <Label htmlFor='frCommName'>
                            <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                            {this.strings.frCommName_title }
                        </Label>
                        <p id="frNameDesc" className={ styles.instruction }>{ this.strings.frCommName_Instruction}</p>
                        <TextField aria-describedby="frNameDesc" id='frCommName' name='frCommName' onChange={ this.onhandleChangeEvent } defaultValue={ frCommName } validateOnLoad= { false } onGetErrorMessage={ this.validateInput } />
                    </div>
                </StackItem>
            </Stack>

            <h3>{ this.strings.comm_desc_title }</h3>
            <p className={ styles.topMgn0 }> { this.strings.shEngDesc_desc }</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <Label htmlFor='shEngDesc' styles={ labelStyle } >
                        <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                        { this.strings.shEngDesc_title }
                    </Label>
                    <p id="shEngDescription" className={ styles.instruction }>{ this.strings.shEngDesc_Instruction }</p>
                    <TextField aria-describedby="shEngDescription" id='shEngDesc' name='shEngDesc'onChange={ this.onhandleChangeEvent} defaultValue={ shEngDesc } validateOnLoad= { false }  onGetErrorMessage={ value => { if ( value.trim().length < 5 || value.length > 100  || value === '') return `${this.strings.max100_validation}` }} />
                </StackItem>
                <StackItem>
                    <Label htmlFor='shFrDesc' styles={ labelStyle } >
                        <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                        { this.strings.shFrDesc_title }
                    </Label>
                    <p id="FrDesc" className={ styles.instruction }>{ this.strings.shFrDesc_Instruction }</p>
                    <TextField aria-describedby="FrDesc" id='shFrDesc' name='shFrDesc' onChange={ this.onhandleChangeEvent} defaultValue={ shFrDesc } validateOnLoad= { false }  onGetErrorMessage={ value => { if ( value.trim().length < 5 || value.length > 100 || value === '') return `${this.strings.max100_validation}` }}/> 
                </StackItem>
            </Stack>
            </>
        );
    }

    // private addBorder = ():void => {
    //     if(document.getElementsByClassName('errorMessage-219').length > 0) {

    //     }
    // }

    private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => {
      
    
        const eventName = event.target.name;
        const value = event.target.value;
  

        // const charAllowed = /[\p{L}\p{N}ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü']/.test(value);
       // const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(value);


        // const hasSpecialChar = /[~`!@#$%^&()_+={:;",.|?<>*\x2F\x5D\x5C\x99\x5B-]/.test(value);
        // const startsWithSpecialChar = /^[~`!@#$%^&()_+={\x5B:;"',.|\x2F\x5D\x5C\x99-]/.test(value);
        // const invalidInput: string = '';
        // const lessthan5 = value.length < 5;
        // const over100 = value.length > 100;

        // if (eventName === 'commPurpose' && (value.length < 5 || value.length > 500)) {
        //     value = invalidInput;
        // } else

        // if ((eventName === 'engName'|| eventName === 'frCommName') && (value.length >= 5 && value.length <= 80)) {
        //     if (charAllowed) {
        //         // console.log("value has special character");
        //         value = invalidInput;
        //     }
        // } else

        // if ((eventName === 'engName' || eventName === 'frCommName') && (value.length < 5 || value.length > 80)) {
        //     // // console.log("Value for engName and frName must be less than  5 greater than 80 characters.");
        //     value = invalidInput;
        // } else

        // if ((eventName ===  'shEngDesc' || eventName === 'shFrDesc' ) &&  ( lessthan5 || over100 )) {
        //     value = invalidInput;
        // } 
        // else 

        // if (eventName === 'shFrDesc' && ( lessthan5 || over100 ) ) {
        //     value = invalidInput;
        // }

        
        const trimmedValue = value.trim();
        try {
                this.props.handleOnChange(eventName, trimmedValue) 
                               
            

        } catch (error) {

            console.log(error);
        }
         
    }


    private validateInput = (value: string) => {

        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûüÆŒœæŸÿ'\s]/.test(value);
   

        if (charAllowed) {
         
            return (
                <>
                <Stack horizontal horizontalAlign='center'>
                    <Icon iconName="Error" className={styles.errorIcon}/>
                    <p  className={styles.fieldInstruction}>{this.strings.special_char_validation}</p>
                </Stack>
                </>
    
            )
        }
        
        if (value.trim().length < 5 || value.trim().length > 80) {
            return (
                <Stack horizontal horizontalAlign='center'>
                    <Icon iconName="Error" className={styles.errorIcon}/>
                    <span className={styles.fieldInstruction}>{this.strings.between_5_80_char_validation}</span>
                </Stack>
    
            )
        }
    
    
    };


}



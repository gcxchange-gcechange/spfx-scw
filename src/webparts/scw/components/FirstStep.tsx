/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import { ILabelStyles, Label, Stack, StackItem, TextField } from 'office-ui-fabric-react';
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

    handleOnChange?:(event:any, value: string)=> void;
    handleErrorMessage?: (errorMessage: string) => void;



}


export default class FirstStep extends React.Component<IFirstStepProps> {


    public constructor(props: IFirstStepProps) {
        super(props);

    }
    public strings = SelectLanguage(this.props.prefLang);


    public render(): React.ReactElement<IFirstStepProps> {
        

        const {engName, commPurpose,  frCommName, shEngDesc, shFrDesc} = this.props;

        const labelStyle: Partial<ILabelStyles> = {
            root: {
                paddingBottom: '5px',
            },
            

           
        }

       const stackTokens = { childrenGap: 18 }

        return (
            <>
           
            <h3>{ parse( this.strings.commPurpose_title ) }</h3>
            <p>{ parse( this.strings.commPurpose_desc) }</p>
            <Label htmlFor='Community purpose'styles={ labelStyle } >
                <span className={styles.asterik}  aria-label='required'>*</span>
                { this.strings.commPurpose_title }
            </Label>
            <p className={ styles.instruction }>{ this.strings.commPurpose_Instruction}</p>
            
            <TextField type='text' name='commPurpose' id='Community purpose' multiline rows={3} onChange={ this.onhandleChangeEvent } 
            defaultValue={ commPurpose }  validateOnLoad= { false }  onGetErrorMessage={ value => { if (value.trim().length === 0 || value.length < 5 || value.length > 500 ) return `${this.strings.max500_validation}` } }
            />

            <h3>{ this.strings.comm_name }</h3>
            <p className={ styles.topMgn0 }>{ this.strings.engName_desc}</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <Label htmlFor='engName' styles={ labelStyle } >
                        <span className={styles.asterik}  aria-label='required'>*</span>
                        { this.strings.engName_title }
                    </Label>
                    <p className={ styles.instruction }>{ this.strings.engName_Instruction}</p>
                    <TextField  id='engName' name='engName' onChange={ this.onhandleChangeEvent } defaultValue={ engName }  validateOnLoad= { false }  
                    onGetErrorMessage={ this.validateInput } />
                </StackItem>
                <StackItem>
                    <Label htmlFor='frCommName'>
                        <span className={styles.asterik}  aria-label='required'>*</span>
                        {this.strings.frCommName_title }
                    </Label>
                    <p className={ styles.instruction }>{ this.strings.frCommName_Instruction}</p>
                    <TextField id='frCommName' name='frCommName' onChange={ this.onhandleChangeEvent } defaultValue={ frCommName } validateOnLoad= { false } onGetErrorMessage={ this.validateInput } />
                </StackItem>
            </Stack>

            <h3>{ this.strings.comm_desc_title }</h3>
            <p className={ styles.topMgn0 }> { this.strings.shEngDesc_desc }</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <Label htmlFor='shEngDesc' styles={ labelStyle } >
                        <span className={styles.asterik}  aria-label='required'>*</span>
                        { this.strings.shEngDesc_title }
                    </Label>
                    <p className={ styles.instruction }>{ this.strings.shEngDesc_Instruction }</p>
                    <TextField id='shEngDesc' name='shEngDesc'onChange={ this.onhandleChangeEvent} defaultValue={ shEngDesc } validateOnLoad= { false }  onGetErrorMessage={ value => { if (value.length > 33 || value === '') return `${this.strings.max33_validation}` }} />
                </StackItem>
                <StackItem>
                    <Label htmlFor='shFrDesc' styles={ labelStyle } >
                        <span className={styles.asterik}  aria-label='required'>*</span>
                        { this.strings.shFrDesc_title }
                    </Label>
                    <p className={ styles.instruction }>{ this.strings.shFrDesc_Instruction }</p>
                    <TextField id='shFrDesc' name='shFrDesc' onChange={ this.onhandleChangeEvent} defaultValue={ shFrDesc } validateOnLoad= { false }  onGetErrorMessage={ value => { if (value.length > 33 || value === '') return `${this.strings.max33_validation}` }}/> 
                </StackItem>
            </Stack>
            </>
        );
    }

    private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        debugger
    
        const eventName = event.target.name;
        let value = event.target.value;
        
        console.log(value);

        // const charAllowed = /[\p{L}\p{N}ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü']/.test(value);
        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(value);


        // const hasSpecialChar = /[~`!@#$%^&()_+={:;",.|?<>*\x2F\x5D\x5C\x99\x5B-]/.test(value);
        // const startsWithSpecialChar = /^[~`!@#$%^&()_+={\x5B:;"',.|\x2F\x5D\x5C\x99-]/.test(value);
        const invalidInput: string = '';

        if (eventName === 'commPurpose' && (value.length < 5 || value.length > 500)) {
            console.log(eventName);
            console.log("valueLength",value.length)
            console.log("Condition for 'commPurpose' event name and value length greater than 500 less than 5");
            value = invalidInput;
        } else

        if (eventName === 'engName'|| eventName === 'frCommName' && (value.length >= 5 && value.length <= 125)) {
            if (charAllowed) {
                console.log("value has special character");
                value = invalidInput;
            }
        } else

        if (eventName === 'engName' || eventName === 'frCommName' && (value.length < 5 || value.length > 125)) {
            console.log("Value for engName and frName must be less than  5 greater than 125 characters.");
            value = invalidInput;
        } else

       

        if ((eventName === 'shEngDesc' || eventName === 'shFrDesc') && value.length > 33 ) {
            value = invalidInput;
        }

        
        const trimmedValue = value.trim();
        

        try {
                this.props.handleOnChange(eventName, trimmedValue)
            

        } catch (error) {

            console.log(error);
        }
         
    }


    private validateInput = (value: string): string => {

        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(value);
    

      if (charAllowed) {
        console.log("Value has special char")
        return `${this.strings.special_char_validation}`
      }

      if ( value.length < 5 || value.length > 125 )  {
        console.log("hello")
        return `${this.strings.between_5_125_char_validation}`
      }
    
    
    };


}



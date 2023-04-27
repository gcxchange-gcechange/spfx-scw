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
            <Label htmlFor='Community purpose' required styles={ labelStyle }>{ this.strings.commPurpose_title }</Label>
            <p className={ styles.instruction }>{ this.strings.commPurpose_Instruction}</p>
            
            <TextField type='text' name='commPurpose' id='Community purpose'  onChange={ this.onhandleChangeEvent } 
            defaultValue={ commPurpose }  validateOnLoad= { false }  onGetErrorMessage={ value => { if (value.length > 500 || value.trim() === '') return `${this.strings.max500_validation}` } }
            />

            <h3>{ this.strings.comm_name }</h3>
            <p className={ styles.topMgn0 }>{ this.strings.engName_desc}</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <Label htmlFor='engName' required styles={ labelStyle } >{ this.strings.engName_title }</Label>
                    <p className={ styles.instruction }>{ this.strings.engName_Instruction}</p>
                    <TextField  id='engName' name='engName' onChange={ this.onhandleChangeEvent } defaultValue={ engName }  validateOnLoad= { false }  
                    onGetErrorMessage={ this.validateInput }/>
                </StackItem>
                <StackItem>
                    <Label htmlFor='frCommName' required>{ this.strings.frCommName_title }</Label>
                    <p className={ styles.instruction }>{ this.strings.frCommName_Instruction}</p>
                    <TextField id='frCommName' name='frCommName' onChange={ this.onhandleChangeEvent } defaultValue={ frCommName } validateOnLoad= { false } onGetErrorMessage={ this.validateInput } />
                </StackItem>
            </Stack>

            <h3>{ this.strings.comm_desc_title }</h3>
            <p className={ styles.topMgn0 }> { this.strings.shEngDesc_desc }</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <Label htmlFor='shEngDesc' required  styles={ labelStyle } >{ this.strings.shEngDesc_title }</Label>
                    <p className={ styles.instruction }>{ this.strings.shEngDesc_Instruction }</p>
                    <TextField id='shEngDesc' name='shEngDesc'onChange={ this.onhandleChangeEvent} defaultValue={ shEngDesc } validateOnLoad= { false }  onGetErrorMessage={ value => { if (value.length > 33 || value === '') return `${this.strings.max33_validation}` }} />
                </StackItem>
                <StackItem>
                    <Label htmlFor='shFrDesc' required  styles={ labelStyle } >{ this.strings.shFrDesc_title }</Label>
                    <p className={ styles.instruction }>{ this.strings.shFrDesc_Instruction }</p>
                    <TextField id='shFrDesc' name='shFrDesc' onChange={ this.onhandleChangeEvent} defaultValue={ shFrDesc } validateOnLoad= { false }  onGetErrorMessage={ value => { if (value.length > 33 || value === '') return `${this.strings.max33_validation}` }}/> 
                </StackItem>
            </Stack>
            </>
        );
    }

    private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => {
    
        const eventName = event.target.name;

        const trimmedValue = event.target.value.trim();

        try {
                this.props.handleOnChange(eventName, trimmedValue)
            

        } catch (error) {
            console.log(error);
        }
         
    }


    private validateInput = (value: string): string => {

        if (value.length >= 5 && value.length <= 125 ) { 

            if (/[^a-zA-Z0-9\s{1,126}]$/.test(value)) {
                return `${ this.strings.special_char_validation}`
            } 

        } else {

            return `${ this.strings.between_5_125_char_validation}`
        }
    

       
    };


}



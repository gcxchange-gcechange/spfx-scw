/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import { Stack, StackItem } from 'office-ui-fabric-react';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';
import { validateSpecialCharFields, validateTextField, validateisError } from './validationFunction';
import ReusableTextField from './ReusableTextField';




export interface IFirstStepProps {
    prefLang: string;
    engName: string;
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    errorMessage: string;
    showModal: boolean;
    isError?: [
      {
      commPurpose: boolean;
      engName: boolean;
      frCommName: boolean;
      shEngDesc: boolean;
      shFrDesc: boolean;
  }]

    handleOnChange?:(event:any, value: string)=> void;
    handleErrorMessage?: (errorMessage: string) => void;

}


export default class FirstStep extends React.Component<IFirstStepProps> {
  public constructor(props: IFirstStepProps) {
    super(props);

  }
  
  public strings = SelectLanguage(this.props.prefLang);

  private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const eventName = event.target.name;
    const value = event.target.value;
    const trimmedValue = value.trim();

    try {
      this.props.handleOnChange(eventName, trimmedValue);
    } catch (error) {
      console.log(error);
    }
  };



  public render(): React.ReactElement<IFirstStepProps> {
    const { engName, commPurpose, frCommName, shEngDesc, shFrDesc } = this.props;


    // const labelStyle: Partial<ILabelStyles> = {
    //   root: {
    //     paddingBottom: "5px",
    //   },
    // };


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


    const stackTokens = { childrenGap: 18 };

    return (
      <>
        <h3>{parse(this.strings.commPurpose_title)}</h3>
        <p>{parse(this.strings.commPurpose_desc)}</p>
       
          <ReusableTextField
                name="commPurpose"
                id="Community purpose"
                styles={charCountStyles.characterLimitStyle}
                label={`${this.strings.commPurpose_Instruction}`}
                multiline
                rows={3}
                defaultValue= {commPurpose}
                validateOnLoad={false}
                maxLength={500}
                description={`${commPurpose.length}/500`}
                onChange={this.onhandleChangeEvent}
                onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField})}
                instructions =  {this.strings.commPurpose_Instruction}
                title = {this.strings.commPurpose_title}
                lineId={"first-line"}
                ariaLabelRequired={this.strings.required}
                charCountId = {"commPurposeCharCount"}
                blankFieldText={this.strings.blankField}
                errorId={"commPurposeErrorText"}      
                
          />
          
          <div style={{marginTop: '5px'}}>
              {validateisError( commPurpose, {blankField: this.strings.blankField })}
          </div>

        <h3>{this.strings.comm_name}</h3>
        <p className={styles.topMgn0}>{this.strings.engName_desc}</p>
        <Stack tokens={stackTokens}>
          <StackItem>

              <ReusableTextField
                name="engName"
                id="engName"
                styles={charCountStyles.characterLimitStyle}
                label={this.strings.engName_Instruction}
                multiline ={false}
                rows={1}
                defaultValue= {engName}
                validateOnLoad={false}
                maxLength={80}
                description={`${engName.length}/80`}
                onChange={this.onhandleChangeEvent}
                onGetErrorMessage={(engName) => validateSpecialCharFields(engName, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField, removeSpecialChar: this.strings.remove_special_char})}
                instructions = {this.strings.engName_Instruction}
                title= {this.strings.engName_title}
                lineId={"second-line"}
                ariaLabelRequired={this.strings.required}
                charCountId = {"engNameCharCount"}
                blankFieldText={this.strings.blankField}
            />
            {/* </div> */}
          </StackItem>
          <StackItem>
 
              <ReusableTextField
                name="frCommName"
                id="frCommName"
                styles={charCountStyles.characterLimitStyle}
                aria-describedby="frNameDesc"
                multiline ={false}
                rows={1}
                defaultValue= {frCommName}
                validateOnLoad={false}
                maxLength={80}
                description={`${frCommName.length}/80`}
                onChange={this.onhandleChangeEvent}
                onGetErrorMessage={(engName) => validateSpecialCharFields(engName, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField, removeSpecialChar: this.strings.remove_special_char})}
                label = {this.strings.frCommName_Instruction}
                title =  {this.strings.frCommName_title}
                lineId={"third-line"}
                ariaLabelRequired={this.strings.required}
                charCountId = {"frCommNameCharCount"}
            />
 
          </StackItem>
        </Stack>

        <h3>{this.strings.comm_desc_title}</h3>
        <p className={styles.topMgn0}> {this.strings.shEngDesc_desc}</p>
        <Stack tokens={stackTokens}>
          <StackItem>
              <ReusableTextField
                name="shEngDesc"
                id="shEngDesc"
                styles={charCountStyles.characterLimitStyle}
                aria-describedby="shEngDescription"
                multiline ={false}
                rows={1}
                defaultValue= {shEngDesc}
                validateOnLoad={false}
                maxLength={100}
                description={`${shEngDesc.length}/100`}
                onChange={this.onhandleChangeEvent}
                onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField})}
                label = {this.strings.shEngDesc_Instruction}
                title =  {this.strings.shEngDesc_title}
                lineId={"fourth-line"}
                ariaLabelRequired={this.strings.required}
                charCountId={'shEngDescCharCount'}
            />
 
          </StackItem>
          <StackItem>
            
              <ReusableTextField
                name="shFrDesc"
                id="shFrDesc"
                styles={charCountStyles.characterLimitStyle}
                aria-describedby="FrDesc"
                multiline ={false}
                rows={1}
                defaultValue= {shFrDesc}
                validateOnLoad={false}
                maxLength={100}
                description={`${shFrDesc.length}/100`}
                onChange={this.onhandleChangeEvent}
                onGetErrorMessage={(commPurpose) => validateTextField(commPurpose, {minCharacters: this.strings.minCharacters, blankField: this.strings.blankField})}
                label = {this.strings.shFrDesc_Instruction}
                title = {this.strings.shFrDesc_title}
                lineId={"fifth-line"}
                ariaLabelRequired={this.strings.required}
                charCountId={'shFrDescCharCount'}
            />
           
          </StackItem>
        </Stack>
      </>
    );
  }

  
 
}



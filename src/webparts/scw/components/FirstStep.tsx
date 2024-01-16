/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import { Stack, StackItem } from 'office-ui-fabric-react';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';
import { validateSpecialCharFields, validateTextField } from './validationFunction';
import ReausableTextField from './ReusableTextField';




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
          {/* <div id="first-line">   */}
           {/* <Label htmlFor="Community purpose" styles={labelStyle}>
            <span className={styles.asterik} aria-label={this.strings.required}>
              *
            </span>
            {this.strings.commPurpose_title}
          </Label> */}
          {/* <p id="commPurposeDesc" className={styles.instruction}>
            {this.strings.commPurpose_Instruction}
          </p>   */}
          <ReausableTextField
                name="commPurpose"
                id="Community purpose"
                styles={charCountStyles.characterLimitStyle}
                aria-describedby="commPurposeDesc"
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
                
            />
        {/* </div> */}

        <h3>{this.strings.comm_name}</h3>
        <p className={styles.topMgn0}>{this.strings.engName_desc}</p>
        <Stack tokens={stackTokens}>
          <StackItem>
            {/* <div id="second-line">
              <Label htmlFor="engName" styles={labelStyle}>
                <span
                  className={styles.asterik}
                  aria-label={this.strings.required}>
                  *
                </span>
                {this.strings.engName_title}
              </Label>
              <p id="engNameDesc" className={styles.instruction}>
                {this.strings.engName_Instruction}
              </p> */}
              <ReausableTextField
                name="engName"
                id="engName"
                styles={charCountStyles.characterLimitStyle}
                aria-describedby="engNameDesc"
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
            />
            {/* </div> */}
          </StackItem>
          <StackItem>
            {/* <div id="third-line">
              <Label htmlFor="frCommName">
                <span
                  className={styles.asterik}
                  aria-label={this.strings.required}>
                  *
                </span>
                {this.strings.frCommName_title}
              </Label>
              <p id="frNameDesc" className={styles.instruction}>
                {this.strings.frCommName_Instruction}
              </p> */}
              <ReausableTextField
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
                instructions = {this.strings.frCommName_Instruction}
                title =  {this.strings.frCommName_title}
                lineId={"third-line"}
            />
            {/* </div> */}
          </StackItem>
        </Stack>

        <h3>{this.strings.comm_desc_title}</h3>
        <p className={styles.topMgn0}> {this.strings.shEngDesc_desc}</p>
        <Stack tokens={stackTokens}>
          <StackItem>
            {/* <div id="fourth-line">
              <Label htmlFor="shEngDesc" styles={labelStyle}>
                <span
                  className={styles.asterik}
                  aria-label={this.strings.required}>
                  *
                </span>
                {this.strings.shEngDesc_title}
              </Label>
              <p id="shEngDescription" className={styles.instruction}>
                {this.strings.shEngDesc_Instruction}
              </p> */}
              <ReausableTextField
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
                instructions = {this.strings.shEngDesc_Instruction}
                title =  {this.strings.shEngDesc_title}
                lineId={"fourth-line"}
            />
            {/* </div> */}
          </StackItem>
          <StackItem>
            {/* <div id="fifth-line"> */}
              {/* <Label htmlFor="shFrDesc" styles={labelStyle}>
                <span
                  className={styles.asterik}
                  aria-label={this.strings.required}>
                  *
                </span>
                {this.strings.shFrDesc_title}
              </Label>
              <p id="FrDesc" className={styles.instruction}>
                {this.strings.shFrDesc_Instruction}
              </p> */}
              <ReausableTextField
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
                instructions = {this.strings.shFrDesc_Instruction}
                title = {this.strings.shFrDesc_title}
                lineId={"fifth-line"}
            />
            {/* </div> */}
          </StackItem>
        </Stack>
      </>
    );
  }

  
 
}



/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import styles from './Scw.module.scss';
import ReausableTextField  from './ReusableTextField';
import { IButtonStyles, IconButton, IIconProps, Label, ILabelStyles, Stack } from 'office-ui-fabric-react';
import {validateTextField} from './validationFunction'


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



  }


export default class LastStep extends React.Component<ILastStepProps> {

    public constructor(props: ILastStepProps) {
        super(props);

        
    }
    
    public strings = SelectLanguage(this.props.prefLang);
  
    
     private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const eventName = event.target.name;
        const value = event.target.value;
        const trimmedValue = value.trim();

        console.log("INCHILD_EName", eventName);
        console.log("INCHILD_EValue", value);
    
        try {
          this.props.handleOnChange(eventName, trimmedValue);
        } catch (error) {
          console.log(error);
        }
    };


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

    // private validateInput = (value: string) => {
    //     const trimmedValue = value.trim();
    
    //     if (trimmedValue.length >= 1 && trimmedValue.length < 5) {
    //       return (
    //         <Stack horizontal horizontalAlign="center">
    //           <Icon iconName="AlertSolid" className={styles.errorIcon} />
    //           <p className={styles.fieldInstruction}>
    //             {this.strings.minCharacters}
    //           </p>
    //         </Stack>
    //       );
    //     } else if (trimmedValue.length === 0) {
    //       return (
    //         <Stack horizontal horizontalAlign="center">
    //           <Icon iconName="AlertSolid" className={styles.errorIcon} />
    //           <p className={styles.fieldInstruction}>{this.strings.blankField}</p>
    //         </Stack>
    //       );
    //     } else {
    //       return null;
    //     }
    //   };

 
    
    public render(): React.ReactElement<ILastStepProps> {


        const { commPurpose, engName, frCommName, shEngDesc, shFrDesc } = this.props

        const labelStyle: Partial<ILabelStyles> = {
            root: {
              paddingBottom: "5px",
            },
          };
        
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

        

        const iconStyles: IButtonStyles = {
            root: {
                paddingTop: '10px',
            }
        }

        const infoIcon: IIconProps = { iconName: 'UnknownSolid' }; 
      
        
       
        return (
            
           <>
            <Stack horizontal verticalAlign='end'>
                <Label htmlFor="Community purpose" styles={labelStyle}>
                    <span className={styles.asterik} aria-label={this.strings.required}>
                    *
                    </span>
                    {/* {this.strings.commPurpose_title} */}
                </Label>
                <IconButton id="commPurpose" ariaLabel = {this.strings.infoIcon_CommPurpose} styles={ iconStyles} iconProps={infoIcon} onClick={ this.showCalloutVisible }/>
            </Stack>

            <ReausableTextField
                name="commPurpose"
                id="Community purpose"
                styles={charCountStyles}
                aria-describedby="commPurposeDesc"
                multiline
                rows={3}
                defaultValue= {commPurpose}
                validateOnLoad={false}
                maxLength={500}
                description={`${commPurpose.length}/500`}
                onChange={this.onhandleChangeEvent}
                onGetErrorMessage={(value) => validateTextField(commPurpose, {minCharacters: this.strings.minCharacters, blankField: this.strings.minCharacters})}
            />
           
           <Stack horizontal verticalAlign='end'>
                <Label htmlFor='engName'>
                    <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                    { this.strings.engName_title }
                </Label>
                <IconButton id='Engname' ariaLabel={ this.strings.infoIcon_engName}  styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
            </Stack>
            <ReausableTextField
                name="engName"
                id="engName"
                styles={charCountStyles}
                aria-describedby="engName"
                multiline ={false}
                rows={1}
                defaultValue= {engName}
                validateOnLoad={false}
                maxLength={80}
                description={`${engName.length}/80`}
                onChange={this.onhandleChangeEvent}
            />

            <Stack horizontal verticalAlign='end'>
                <Label htmlFor='FrCommName'>
                    <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                    { this.strings.frCommName_title }
                </Label>
                <IconButton  ariaLabel={ this.strings.infoIcon_frName} id='FrCommName' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
            </Stack>

            <ReausableTextField
                name="FrCommName"
                id="FrCommName"
                styles={charCountStyles}
                aria-describedby="FrCommName"
                multiline ={false}
                rows={1}
                defaultValue= {frCommName}
                validateOnLoad={false}
                maxLength={80}
                description={`${frCommName.length}/80`}
                onChange={this.onhandleChangeEvent}
            />


<           Stack horizontal verticalAlign='end'>
                <Label htmlFor='shEngDesc'>
                    <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                    { this.strings.shEngDesc_title }
                </Label>
                <IconButton  ariaLabel={ this.strings.infoIcon_engDesc} id='shEngDesc' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
            </Stack>
            <ReausableTextField
                name="shEngDesc"
                id="shEngDesc"
                styles={charCountStyles}
                aria-describedby="shEngDesc"
                multiline ={false}
                rows={1}
                defaultValue= {shEngDesc}
                validateOnLoad={false}
                maxLength={100}
                description={`${shEngDesc.length}/100`}
                onChange={this.onhandleChangeEvent}
            />

            <Stack horizontal verticalAlign='end'>
                <Label htmlFor='shFrDesc'>
                    <span className={ styles.asterik }  aria-label={ this.strings.required }>*</span>
                    { this.strings.shFrDesc_title }
                </Label>
                <IconButton  ariaLabel={ this.strings.infoIcon_frDesc } id='shFrDesc' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
            </Stack>

            <ReausableTextField
                name="shFrDesc"
                id="shEngDesc"
                styles={charCountStyles}
                aria-describedby="shEngDesc"
                multiline ={false}
                rows={1}
                defaultValue= {shFrDesc}
                validateOnLoad={false}
                maxLength={100}
                description={`${shFrDesc.length}/100`}
                onChange={this.onhandleChangeEvent}
            />
            
            </>
        );
     }

  
 }
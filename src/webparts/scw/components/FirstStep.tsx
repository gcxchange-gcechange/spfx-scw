/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import { ILabelStyles, Icon, Label, Stack, StackItem, TextField } from 'office-ui-fabric-react';
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
    color:string;

    handleOnChange?:(event:any, value: string)=> void;
    handleErrorMessage?: (errorMessage: string) => void;

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
        

        const {engName, commPurpose,  frCommName, shEngDesc, shFrDesc } = this.props;
        console.log("commPurpose",commPurpose);
        

        const labelStyle: Partial<ILabelStyles> = {
            root: {
                paddingBottom: '5px',
            },
            
        }

        const charCountStyles = {
            characterLimitStyle: {
                    description : {
                    float: 'right',
                    marginTop: '5px',
                    fontSize:'12px'
                }
            },
            errorCharacterLimitStyle:  {
                    description : {
                    float: 'right',
                    marginTop: '5px',
                    fontSize:'12px',
                    color: `${this.props.color}`,
                    fontWeight: '700'
                }
            }

        };
    
    
        //const errorText = document.getElementsByClassName('errorBorder');

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
                <TextField 
                    styles={charCountStyles.errorCharacterLimitStyle  } 
                    aria-describedby="commPurposeDesc" 
                    name='commPurpose' 
                    id='Community purpose' 
                    multiline rows={3} 
                    onChange={ this.onhandleChangeEvent } 
                    description={`${commPurpose.length}/500`}
                    defaultValue={ commPurpose }  
                    validateOnLoad= { false } 
                    maxLength={500} 
                    onGetErrorMessage={this.validateInput}
                />
            </div>
            

            <h3>{ this.strings.comm_name }</h3>
            <p className={ styles.topMgn0 }>{ this.strings.engName_desc}</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <div id='second-line'>
                        <Label htmlFor='engName' styles={ labelStyle } >
                            <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                            { this.strings.engName_title }
                        </Label>
                        <p id="engNameDesc" className={ styles.instruction }>{ this.strings.engName_Instruction}</p>
                        <TextField 
                            styles={(engName.length >=1 && engName.length)  < 5 ? charCountStyles.errorCharacterLimitStyle : charCountStyles.characterLimitStyle } 
                            aria-describedby="engNameDesc" 
                            id='engName' 
                            name='engName' 
                            maxLength={80} 
                            onChange={ this.onhandleChangeEvent } 
                            defaultValue={ engName }  
                            validateOnLoad= { false }  
                            onGetErrorMessage={ this.validateCommNameInput  }
                            description={`${engName.length}/80`}
                        />
                    </div>
                </StackItem>
                <StackItem>
                    <div id='third-line'>
                        <Label htmlFor='frCommName'>
                            <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                            {this.strings.frCommName_title }
                        </Label>
                        <p id="frNameDesc" className={ styles.instruction }>{ this.strings.frCommName_Instruction}</p>
                        <TextField 
                            styles={  frCommName.length >=1 && frCommName.length < 5 ? charCountStyles.errorCharacterLimitStyle : charCountStyles.characterLimitStyle } 
                            aria-describedby="frNameDesc" 
                            id='frCommName' 
                            name='frCommName'  
                            maxLength={80} 
                            onChange={ this.onhandleChangeEvent } 
                            defaultValue={ frCommName } 
                            validateOnLoad= { false } 
                            onGetErrorMessage={ this.validateCommNameInput }
                            description={`${frCommName.length}/80`}
                        />
                    </div>
                </StackItem>
            </Stack>

            <h3>{ this.strings.comm_desc_title }</h3>
            <p className={ styles.topMgn0 }> { this.strings.shEngDesc_desc }</p>
            <Stack tokens={ stackTokens }>
                <StackItem>
                    <div id='fourth-line'>
                        <Label htmlFor='shEngDesc' styles={ labelStyle } >
                            <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                            { this.strings.shEngDesc_title }
                        </Label>
                        <p id="shEngDescription" className={ styles.instruction }>{ this.strings.shEngDesc_Instruction }</p>
                        <TextField 
                            styles={ shEngDesc.length >=1 && shEngDesc.length < 5 ? charCountStyles.errorCharacterLimitStyle : charCountStyles.characterLimitStyle } 
                            aria-describedby="shEngDescription" 
                            id='shEngDesc'
                            name='shEngDesc' 
                            maxLength={100} 
                            onChange={ this.onhandleChangeEvent} 
                            defaultValue={ shEngDesc } 
                            validateOnLoad= { false }  
                            onGetErrorMessage={ this.validateInput } 
                            description={`${shEngDesc.length}/100`}
                        />
                    </div>
                </StackItem>
                <StackItem>
                    <div id='fifth-line'>
                        <Label htmlFor='shFrDesc' styles={ labelStyle } >
                            <span className={styles.asterik}  aria-label={ this.strings.required }>*</span>
                            { this.strings.shFrDesc_title }
                        </Label>
                        <p id="FrDesc" className={ styles.instruction }>{ this.strings.shFrDesc_Instruction }</p>
                        <TextField 
                            styles={ shFrDesc.length >=1 && shFrDesc.length < 5 ? charCountStyles.errorCharacterLimitStyle : charCountStyles.characterLimitStyle } 
                            aria-describedby="FrDesc" 
                            id='shFrDesc' 
                            name='shFrDesc' 
                            maxLength={100} 
                            onChange={ this.onhandleChangeEvent} 
                            defaultValue={ shFrDesc } 
                            validateOnLoad= { false }  
                            onGetErrorMessage={ this.validateInput }
                            description={`${shFrDesc.length}/100`}
                        /> 
                    </div>
                </StackItem>
            </Stack>
            </>
        );
    }

  




    private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => {
          
        const eventName = event.target.name;
        const value = event.target.value;
        const trimmedValue = value.trim();

        try {
                this.props.handleOnChange(eventName, trimmedValue) 
                            

        } catch (error) {

            console.log(error);
        }
         
    }
    private validateInput = (value: string)  => {
      
            const trimmedValue = value.trim();
          
            if (trimmedValue.length >=1 && trimmedValue.length < 5) {
              return (
                <Stack horizontal horizontalAlign='center'>
                  <Icon iconName="AlertSolid" className={styles.errorIcon} />
                  <p className={styles.fieldInstruction}>{this.strings.minCharacters}</p>
                </Stack>
              );
            } else if (trimmedValue.length === 0) {
              return (
                <Stack horizontal horizontalAlign='center'>
                  <Icon iconName="AlertSolid" className={styles.errorIcon} />
                  <p className={styles.fieldInstruction}>{this.strings.blankField}</p>
                </Stack>
              );
            } else {

              return null;
            }
    }   

    private validateCommNameInput = (value: string) => {
        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûüÆŒœæŸÿ'\s]/.test(value);
        const matchChar = value.match(/[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/g);

        let specialCharFound = '';
        specialCharFound = matchChar.join('');
    
        const renderErrorMessage = (message: string) => (
            <Stack horizontal style={{paddingBottom: '5px'}}>
                <Icon iconName="AlertSolid" className={styles.errorIcon}/>
                <p className={styles.fieldInstruction}>{message}</p>
            </Stack>
        );
    
        return (
            <>
                {value.trim().length >= 1 && value.trim().length < 5 && charAllowed &&
                    <Stack >
                        {renderErrorMessage(this.strings.minCharacters)}
                        {renderErrorMessage(`${this.strings.remove_special_char} ${specialCharFound}`)}
                    </Stack>
                }
                {(value.trim().length >= 1 && value.trim().length < 5 && !charAllowed) &&
                    renderErrorMessage(this.strings.minCharacters)
                }
                {(value.trim().length > 5 && charAllowed) &&
                    renderErrorMessage(`${this.strings.remove_special_char} ${specialCharFound}`)
                }
                {!value.trim().length &&
                    renderErrorMessage(this.strings.blankField)
                }
            </>
        );
    };
    

}



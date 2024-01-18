/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import  { Steps, Button } from 'antd';
import  { IScwProps } from './IScwProps';
import  { Initial } from './InitialPage/Initial';
import  { ISpinnerStyles, PrimaryButton, Stack } from 'office-ui-fabric-react';
import  { IButtonStyles } from 'office-ui-fabric-react';
import ErrorModal from './Modal';
import FirstStep from './FirstStep';
import FourthStep from './FourthStep';
import { SelectLanguage } from './SelectLanguage';
import { AadHttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http';
import Title from './Title';
import Complete from './Complete';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import Callouts from './Callouts';
import Failed from './Failed';
import ReviewFields from './ReviewFields';
import { fieldValidations, ownerFieldValidations } from './validationFunction';





export interface IScwState  { 
    current: number;
    step: number;
    engName: string;
    ownerList: string[];
    // memberList: string[];
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    selectedChoice: string;
    errorMessage: string;
    showModal: boolean;
    checkedValues: string[];
    isLoading: boolean;
    validationStatus: number;
    showCallout: boolean;
    targetId: string;
    invalidEmail: string;

   
    
}



export default class AntDesignStep extends React.Component<IScwProps, IScwState>  { 
   public strings = SelectLanguage(this.props.prefLang);
//    private owner = this.props.context.pageContext.user.email;

    public constructor( props: IScwProps, state: IScwState )  { 
        super( props );
        this.state =  { 
            current: 0,
            step: 0,
            engName:'', 
            ownerList: [],
            // memberList: [this.owner],
            commPurpose: '',
            frCommName: '',
            shEngDesc: '',
            shFrDesc: '',
            selectedChoice: '',
            errorMessage: '',
            showModal: false,
            checkedValues: [],
            isLoading: false,
            validationStatus: 0,
            showCallout: false,
            targetId: '',
            invalidEmail: '',


        };

    }


    private next = (): void => {
        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, invalidEmail } = this.state;
        const values = { engName, frCommName, shEngDesc, shFrDesc, commPurpose };
    
        const validateStringLength = (value: string, minLength: number): boolean => value.length >= minLength;
    
        const isLessThanMin = Object.values(values).some((value) => !validateStringLength(value, 5));
        const hasSpecialChar = Object.entries(values).some(([key, value]) => (key === 'engName' || key === 'frCommName') && /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûü'\s]/.test(value));

        const requestorEmail = ownerList.find((email) => email === this.props.requestor);
    
        const showModal = isLessThanMin || hasSpecialChar || (current === 1 && (ownerList.length < 1 || invalidEmail  || requestorEmail ));
    
        if (!showModal) {
            this.goToNextPg(current);
        } else {
            this.setState({ showModal: true });
        }
    };
    


    public closeModal = (): void => {
        this.setState({
            showModal: false,
        })
    }

        private goToNextPg = (pageNumber: number): void =>  {             
        this.setState ((prevState) => ({
            current: prevState.current + 1
        }))
     }

    private prev = (): void =>  { 
        const prevPage = this.state.current - 1;   

        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, invalidEmail   } = this.state
        const values = { engName, frCommName, shEngDesc, shFrDesc, commPurpose}
        const {isLessThanMinLength, hasSpecialChar} = fieldValidations(values);

       ownerFieldValidations(ownerList, this.props.requestor, invalidEmail)

        // console.log("blank",isBlankField)
        // console.log("REQ", userIsRequestor)
        // console.log("EINVALID",emailIsInvalid)

        if (current === 2 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc || ownerList.length === 0 || invalidEmail || isLessThanMinLength || hasSpecialChar)) {
            this.setState({ showModal: true });
        } else {
            this.setState({ current: prevPage });
        }
        
    }



    public handleClickEvent=():void=>  { 
        const step = this.state.step + 1;
        this.setState( { 
           step
        });
    }

    public goToInitalPage=():void=>  { 
        const step = this.state.step - 1;
        this.setState( { 
           step
        });
    }

    public buttonStyle: IButtonStyles =  { 
        root:  { 
            fontSize:'18px',
            backgroundColor:'#004DB8'
        }
    }   


    public escapeQuotes = (str:any) => {
        console.log("string",str)
        return  str.replace(/"/g, '\\"');
      };
      
    
    public successMessage = (): void =>  { 

        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, invalidEmail } = this.state
        const values = { engName, frCommName, shEngDesc, shFrDesc, commPurpose };
        const {isLessThanMinLength, hasSpecialChar} = fieldValidations(values);
        console.log("VALUES", values.frCommName)
    

        let requestingUser: string = '';
        // const owners = ownerList.length;
    
        for (let i = 0; i < ownerList.length; i++) {
          if ( ownerList[i] === this.props.requestor) {
            requestingUser = this.props.requestor
          } 
          
        }
       
        
        if (current === 2 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc || ownerList.length === 0 || invalidEmail !== '' || requestingUser !== ''|| isLessThanMinLength || hasSpecialChar)) {
            this.setState({ showModal: true });
        }
        else {
            const functionUrl = "  ";
            const requestHeaders: Headers = new Headers();
            requestHeaders.append("Content-type", "application/json");
            requestHeaders.append("Cache-Control", "no-cache");
            
            const owner1 = [...ownerList, this.props.requestor].join(',');
            // console.log("ownerList",owner1);
            
            // let memberlist = "";
            // // for (let i = 0; i < memberList.length; i++) {
            //     if (i === memberList.length - 1) {
            //         memberlist += memberList[i]
            //     } else {
            //         memberlist += memberList[i] + ","
            //     }
            // }
            // console.log("memberList",memberlist);

          
            const postOptions: IHttpClientOptions = {
                headers: requestHeaders,
                body: `
                {
                    "SpaceName": "${engName}",
                    "SpaceNameFR": "${frCommName}",
                    "Owner1": "${owner1}",
                    "SpaceDescription": "${this.escapeQuotes(shEngDesc)}",
                    "SpaceDescriptionFR": "${this.escapeQuotes(shFrDesc)}",
                    "BusinessJustification":"${this.escapeQuotes(commPurpose)}",
                    "TeamPurpose":"${this.escapeQuotes(commPurpose)}",
                    "TemplateTitle": "Generic",
                    "RequesterName": "${this.props.context.pageContext.user.displayName}",
                    "RequesterEmail": "${this.props.requestor}",
                    "SecurityCategory": "unclassified",
                    "Status": "Submitted",
                    
                }`
            };

            console.log("BODY", postOptions.body);

            
            let responseText: string = "";

            // use aad authentication


            this.setState({ isLoading: true }, () => {

            document.getElementById("prev").style.display= 'none';    
            document.getElementById("submit").style.display = 'none';
                
              this.props.context.aadHttpClientFactory
              .getClient(" ")
              .then((client: AadHttpClient) => {
               
                client.post(functionUrl, AadHttpClient.configurations.v1, postOptions)
                .then((response: HttpClientResponse) => {
                  console.log(`Status code: ${response.status}`);

                  if ( response.status) {
                    this.setState({
                        current: current + 1,
                        isLoading: false,
                        validationStatus: response.status,
                    })
                  } 
                  
                  response.json().then((responseJSON: JSON) => {
                    responseText = JSON.stringify(responseJSON);
                    console.log("respond is ", responseText);
                    if (response.ok) {
                    
                      console.log("response OK");
                    } else {
                        
                    console.log("Response error");

                    }
                  })
                  .catch((response: any) => {
                    
                    const errMsg: string = `WARNING - error when calling URL ${functionUrl}. Error = ${response.message}`;
                    console.log("err is ", errMsg);
                  });
                });
              });
            });
            
        }
    }


    public handleOnChange =(event: any, value:string):void => {

        const eventName = event;
        const values = value
        //const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûüÆŒœæŸÿ'\s]/.test(value);

        console.log("Parent_Name", eventName);
        console.log("Parent_value", values);

        this.handleSideLineErrorValidation(event, value)

        this.setState({
            ...this.state,
            [eventName]: values,
           
        });
        
    }

    public handleSideLineErrorValidation = (eventName:string, value:string ) => {

        const charAllowed = /[^a-zA-Z0-9ÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïòóôõöùúûüÆŒœæŸÿ'\s]/.test(value);

        const addErrorBorder = (lineId: string) => {
          document.getElementById(lineId).classList.add(styles.errorBorder);
        };
      
        const removeErrorBorder = (lineId: string) => {
          document.getElementById(lineId).classList.remove(styles.errorBorder);
        };
      
        switch (eventName) {
          case "commPurpose":
            if (value.length < 5) {
              addErrorBorder("first-line");
            } else {
              removeErrorBorder("first-line");
            }
            break;
      
          case "engName":
            if (value.length < 5 || charAllowed) {
              addErrorBorder("second-line");
            } else {
              removeErrorBorder("second-line");
            }
            break;
      
          case "frCommName":
            if (value.length < 5 || charAllowed) {
              addErrorBorder("third-line");
            } else {
              removeErrorBorder("third-line");
            }
            break;
      
          case "shEngDesc":
            if (value.length < 5) {
              addErrorBorder("fourth-line");
            } else {
              removeErrorBorder("fourth-line");
            }
            break;
      
          case "shFrDesc":
            if (value.length < 5) {
              addErrorBorder("fifth-line");
            } else {
              removeErrorBorder("fifth-line");
            }
            break;
         case "owners":
                if (!value) {
                  addErrorBorder("sixth-line");
                } else {    
                  removeErrorBorder("sixth-line");
                }
                break;
      
          default:
            break;
        }
      };
      
      

    public commPurposeCallback = ( commPurpose: string ): void =>   { 
        const savePurpose = commPurpose;

        this.setState ( { 
            commPurpose: savePurpose
        });
        this.handleSideLineErrorValidation("commPurpose", savePurpose)
     
    }

    public handleEngNameCallback = ( engNameValue: string ): void =>   { 
        const saveEngName = engNameValue;
        this.setState ( { 
            engName: saveEngName
        });
        this.handleSideLineErrorValidation("engName", saveEngName)
     
    }

    public frNameCallback = ( FrNameValue: string ): void =>   { 
        const saveFrName = FrNameValue;
        this.setState ( { 
            frCommName: saveFrName
        });
        this.handleSideLineErrorValidation("frCommName", saveFrName)
    }

    public engDescCallback = ( EngDescValue: string ): void =>   { 
        const saveEngDesc = EngDescValue;
        this.setState ( { 
            shEngDesc: saveEngDesc
        });
        this.handleSideLineErrorValidation("shEngDesc", EngDescValue)
        
    }

    public frDescCallback = ( FrDescValue: string ): void =>   { 
        const saveFrDesc = FrDescValue;
        this.setState ( { 
            shFrDesc: saveFrDesc
        });
        
        this.handleSideLineErrorValidation("shFrDesc", FrDescValue)
    }

  
    public handleOwnerCallback = ( items: []): void =>  { 
        console.log("calbback",items)
        const OwnerArr: any[]  = [];

        items.forEach(user =>  {             
                OwnerArr.push( user['secondaryText'] )
        })
  
        this.setState( { 
            ownerList: OwnerArr
        }) ; 

        this.getInvalidUsers(items);

        this.handleSideLineErrorValidation("owners", OwnerArr.length.toString())
     

    }

    public getInvalidUsers = (users: any[]):void => {

        let invalidEmailUsers: string = '';

        users.forEach(user => {
            if ( user['id'] === undefined) {
               invalidEmailUsers = user['secondaryText']
            }
        
        })

        this.setState({
            invalidEmail: invalidEmailUsers
        })

     

    }


    public handleErrorMessage = (field: string ):void  => {
       console.log("field",field);
    }
   

     
    public isCalloutVisible = ():void => {

        this.setState(prevState => ({
            showCallout: !prevState.showCallout,
           
        }));
       
    };

    public getElementId = (id: string): void => {

        this.setState({
            targetId: id
        });

    };


    componentDidUpdate(prevProps: Readonly<IScwProps>, prevState: Readonly<IScwState>): void {

        if ( this.state.current !== prevState.current) {

            const getCheckMark = document.getElementsByClassName('anticon anticon-check ant-steps-finish-icon');
            
    
            for (let i = 0; i < getCheckMark.length; i++) {
                const element = getCheckMark[i];
    
                element.setAttribute('aria-Label', 'complete')
            }

        }

    }


    public render(): React.ReactElement<IScwProps>  { 
      
        const  { current, step, commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, ownerList, errorMessage, showModal, checkedValues, showCallout, targetId } = this.state;
        console.log("STATE", this.state);

        const steps = [
        
            { 
                step: "1",
                title: this.strings.title_details,
                content: (
                <FirstStep
                    prefLang = { this.props.prefLang }
                    showModal = {showModal}
                    engName= { engName }
                    commPurpose= { commPurpose }
                    frCommName= { frCommName }
                    shEngDesc= { shEngDesc }
                    shFrDesc= { shFrDesc }
                    errorMessage ={ errorMessage }
                    handleOnChange={this.handleOnChange}
                />
                )
            },
            // { 
            //     step: "2",
            //     title: this.strings.classification,
            //     content: (
            //     // <SecondStep
            //     //     prefLang = { this.props.prefLang }
            //     //     selectedChoice= { selectedChoice }
            //     //     handleSelectedChoice= { this.selectedChoiceCallback}
            //     // />
            //     ),
            // },
            // { 
            //     step: "3",
            //     title: this.strings.term_of_use,
            //     content: <ThirdStep prefLang={this.props.prefLang} checkedValues= { checkedValues } checkedTerms = { this.checkedTerms }/>,
            // },
            { 
                step: "4",
                title: this.strings.owners,
                content: (
                <FourthStep
                    prefLang={this.props.prefLang}
                    context= { this.props.context }
                    ownerList= { ownerList }
                    requestor = {this.props.requestor}
                    invalidEmail = {this.state.invalidEmail}
                    // memberList= { memberList }
                    getOwnersCallback= { this.handleOwnerCallback }
                    // getMemberCallback= { this.handleMemberCallback }
                />
                )
            },
            {
                step: "5",
                title: this.strings.review_submit,
                content: (
                <ReviewFields
                    current= { current }
                    prefLang={this.props.prefLang}
                    engName= { engName }
                    commPurpose= { commPurpose }
                    frCommName= { frCommName }
                    selectedChoice= { selectedChoice }
                    shEngDesc= { shEngDesc }
                    shFrDesc= { shFrDesc }
                    ownerList= { ownerList }
                    context= { this.props.context }
                    showCallout = { showCallout}
                    targetId = { targetId }
                    commPurposeCallback={ this.commPurposeCallback }
                    handleEngNameCallback= { this.handleEngNameCallback }
                    frNameCallBack= { this.frNameCallback }
                    getOwnersCallback= { this.handleOwnerCallback }
                    handleFrDescCallback= { this.frDescCallback }
                    handleEngDescCallback= { this.engDescCallback }
                    isCalloutVisible ={ this.isCalloutVisible }
                    getElementId={this.getElementId}
                    handleOnChange={this.handleOnChange}
                    requestor = {this.props.requestor}
                    invalidEmail ={this.state.invalidEmail}
              />
                ), 
            },
            {
                step:"6",
                title: this.strings.title_complete,
                content: (
                    this.state.validationStatus === 200 ?
                    <Complete 
                        prefLang={this.props.prefLang}
                        url={this.props.url}
                    />   
                    :
                    <Failed
                    prefLang={this.props.prefLang}
                    engName= { engName }
                    frCommName= { frCommName }
                    ownerList= { ownerList }
                    commPurpose= { commPurpose }
                    shEngDesc= { shEngDesc }
                    shFrDesc= { shFrDesc }
                    validationStatus = { this.state.validationStatus }
                    />
                ),
               
            },
        ];


        const items = steps.map( item => ( item.step !== '6' ?  { key: item.step, title: item.title} : null));

        const labelSpinnerStyles: Partial<ISpinnerStyles> = { root: { padding: 20 } };

      
        
        return (
            <>       
            <div className= { styles.scw }>   
            <h1>{this.state.current.toString()}</h1>
                <Title current={ current } step={ step } prefLang={this.props.prefLang} status={this.state.validationStatus} />
                { step === 0 
                ? 
                <>
                    <Initial
                        context={ this.props.context }
                        prefLang={ this.props.prefLang }
                    />
                <PrimaryButton styles= { this.buttonStyle } text={ this.strings.Lets_go } aria-Label={this.strings.Lets_go} onClick= { () =>  { this.handleClickEvent()} } className= { styles.centerButton }/>
                </>
                :
                <div className= { styles.container }>
                    <div className= { styles.row }> 
                        <Stack horizontalAlign="center">
                            <Steps aria-current='step' current= { this.state.current } labelPlacement='vertical' items= { items } />
                        </Stack>
                        {  showCallout && <Callouts prefLang={ this.props.prefLang } showCallout={ showCallout }  targetId= { targetId } openCallout = {this.isCalloutVisible} /> }
                        { this.state.showModal === true && <ErrorModal requestor={ this.props.requestor } invalidUser ={ this.state.invalidEmail } prefLang={ this.props.prefLang } current = { current }  engName= { engName } commPurpose= { commPurpose } frCommName= { frCommName } shEngDesc= { shEngDesc } shFrDesc= { shFrDesc } checkedValues={ checkedValues }   ownerList= { ownerList } showModal={ showModal } openModal = { this.next } onClose={ this.closeModal } /> } 
                        
                        <div className="steps-content"> 
                            { this.state.isLoading ? 
                                ( <Spinner label={ this.strings.submitting_your_information } labelPosition="right"   size={ SpinnerSize.large } styles={labelSpinnerStyles}/>) 
                                :
                                steps[ this.state.current ].content
                            }   
                        </div>
                       
                        <div className="steps-action">
                            <Stack horizontal horizontalAlign='space-between'>
                                { this.state.current === 0 &&   <Button className={ styles.previousbtn }  onClick= { () => this.goToInitalPage() } >{ this.strings.prev_btn }</Button> }
                                {/* { this.state.current > 0 &&  (this.state.current !== 4 && steps[this.state.current].step !== '5' || steps[this.state.current].step !== '6')
                                && ( <Button id='prev'className={ styles.previousbtn } style={{ display: 'inline-block', overflow: 'visible', whiteSpace: 'break-spaces', height:'auto'}}  onClick= { () => this.prev() } > { this.state.current === 2 && selectedChoice === `${this.strings.protected_cardTitle}` ?  `${ this.strings.unclassified_button }` : `${ this.strings.prev_btn }` } </Button> ) 
                                 } */}
                                 { this.state.current > 0 &&  (this.state.current !== 4 && steps[this.state.current].step !== '5' || steps[this.state.current].step !== '6')
                                && ( <Button id='prev'className={ styles.previousbtn } style={{ display: 'inline-block', overflow: 'visible', whiteSpace: 'break-spaces', height:'auto'}}  onClick= { () => this.prev() } > { `${ this.strings.prev_btn }` } </Button> ) 
                                 }
                                { this.state.current < steps.length - 2 && (<Button className={ styles.largebtn } type="primary" onClick= { this.next} > { this.strings.next_btn } </Button> )}
                                {/* { this.state.current < steps.length - 2 && ( this.state.current !== 2 || selectedChoice === `${ this.strings.unclassified_cardTitle }` ) && (<Button className={ styles.largebtn } type="primary" onClick= { this.next} > { this.strings.next_btn } </Button> )}
                                { this.state.current < steps.length - 2 && ( this.state.current === 2 && selectedChoice === `${ this.strings.protected_cardTitle }` ) && (<Button className={ styles.largebtn } style={{ height: '54px'}} type="primary" onClick= { this.next} >{ this.strings.next_btn }</Button> ) } */}
                                { this.state.current === steps.length - 2 && 
                                ( <Button id="submit" className={ styles.largebtn } type="primary" onClick= { this.successMessage} > { this.strings.submit_btn } </Button> )}
                            </Stack>
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
        );
    }
    
}
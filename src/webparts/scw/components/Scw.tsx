/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import  { Steps, Button } from 'antd';
// import  { message} from 'antd';
import FirstStep from "./FirstStep";
import  { IScwProps } from './IScwProps';
import  { Initial } from './InitialPage/Initial';
import  { ISpinnerStyles, PrimaryButton, Stack } from 'office-ui-fabric-react';
import  { IButtonStyles } from 'office-ui-fabric-react';
import LastStep from './LastStep';
// import  { MessageType } from 'antd/es/message/interface';
import ErrorModal from './Modal';
import FourthStep from './FourthStep';
// import SecondStep from './SecondStep';
import { SelectLanguage } from './SelectLanguage';
// import ThirdStep from './ThirdStep';
import { AadHttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http';
import Title from './Title';
import Complete from './Complete';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
// import { CloseCircleOutlined } from '@ant-design/icons';
import Callouts from './Callouts';
import Failed from './Failed';



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
            invalidEmail: ''

        };

    }

   

    private next = (): void =>  { 
        
       
        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, invalidEmail } = this.state

        // const filtered = checkedValues.filter((value, index) => {
        //     return checkedValues.indexOf(value) === index
        //   });
        // console.log("filtered",filtered)
        console.log("OwnerList", ownerList);

        let requestorEmail: string = '';

        for (let i = 0; i < ownerList.length; i++) {
            if ( ownerList[i] === this.props.requestor) {
                console.log("found")
                requestorEmail = ownerList[i];

                console.log("email",requestorEmail);
            }
            
        }
        
       if ( !commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc) {
   
            this.setState({ showModal: true });
       } 
       


    //    else if ( current === 1 && selectedChoice === '' ) {
            
    //          this.setState({ showModal: true });
    //    }
       
    //    else if ( current === 2 &&  selectedChoice === `${this.strings.protected_cardTitle}` && filtered.length < 7 ) {
                
    //             this.setState({ showModal: true });
    //    } 
        else if ( current === 1 && ownerList.length < 1 ) {
            this.setState({ showModal: true });
        }        
         else if (current === 1 &&  invalidEmail !== '' ) {
            this.setState({ showModal: true });
            
        }
        else if ( current  === 1 && requestorEmail !== '') {
            this.setState({ showModal: true });
        }
      
        else {
            
            this.goToNextPg(current);
            // this.setState({invalidEmail: ''})
        }

       
    }


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

        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, invalidEmail  } = this.state

       

        if ( current === 2 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc || ownerList.length === 0 || invalidEmail !== '')) {
           
            this.setState({ showModal: true });
        }
        // else    if ( current === 2 && selectedChoice === `${ this.strings.protected_cardTitle }`) {

        //     this.setState({ selectedChoice: `${ this.strings.unclassified_cardTitle }`})
        // }

        else {
            
            this.setState({ current: prevPage})
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
    
    
    
    public successMessage = (): void =>  { 
        
        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, invalidEmail } = this.state
        console.log("OWN", ownerList.length);

        let requestingUser: string = '';
        // const owners = ownerList.length;
    
        for (let i = 0; i < ownerList.length; i++) {
          if ( ownerList[i] === this.props.requestor) {
            requestingUser = this.props.requestor
          } 
          
        }
       
        
        if (current === 2 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc || ownerList.length === 0 || invalidEmail !== '' || requestingUser !== '')) {
            this.setState({ showModal: true });
        }
        else {
            const functionUrl = "";
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
                    "SpaceDescription": "${shEngDesc}",
                    "SpaceDescriptionFR": "${shFrDesc}",
                    "BusinessJustification":"${commPurpose}",
                    "TeamPurpose":"${commPurpose}",
                    "TemplateTitle": "Generic",
                    "RequesterName": "${this.props.context.pageContext.user.displayName}",
                    "RequesterEmail": "${this.props.requestor}",
                    "SecurityCategory": "unclassified",
                    "Status": "Submitted",
                    
                }`
            };

            
            let responseText: string = "";

            // use aad authentication


            this.setState({ isLoading: true }, () => {

            document.getElementById("prev").style.display= 'none';    
            document.getElementById("submit").style.display = 'none';
                
              this.props.context.aadHttpClientFactory
              .getClient("")
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
        const eventValue = event;
        const values = value
        
            this.setState({
                ...this.state,
                [eventValue]: values
            });
        
    }

    public commPurposeCallback = ( commPurpose: string ): void =>   { 
        const savePurpose = commPurpose;
        this.setState ( { 
            commPurpose: savePurpose
        });
     
    }

    public handleEngNameCallback = ( engNameValue: string ): void =>   { 
        const saveEngName = engNameValue;
        this.setState ( { 
            engName: saveEngName
        });
     
    }

    public frNameCallback = ( FrNameValue: string ): void =>   { 
        const saveFrName = FrNameValue;
        this.setState ( { 
            frCommName: saveFrName
        });
        
    }

    public engDescCallback = ( EngDescValue: string ): void =>   { 
        const saveEngDesc = EngDescValue;
        this.setState ( { 
            shEngDesc: saveEngDesc
        });
        
    }

    public frDescCallback = ( FrDescValue: string ): void =>   { 
        const saveFrDesc = FrDescValue;
        this.setState ( { 
            shFrDesc: saveFrDesc
        });
        
    }

    // public selectedChoiceCallback = ( selectedChoice: string ): void =>  { 

    //     const saveSelectedChoice = selectedChoice;

    //     this.setState( { 
    //         selectedChoice: saveSelectedChoice
    //     })
    // } 

  
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

    // public handleMemberCallback = ( items: [] ): void =>  { 
    //     const MemberArr: string[] = [];

    //     items.forEach(user =>  { 
    //         // eslint-disable-next-line dot-notation
    //         MemberArr.push( user['secondaryText'] )
    //     })
  
    //     // this.setState( { 
    //     //     memberList: MemberArr
    //     // }) ; 

    // }

    public handleErrorMessage = ( errorMessage: string ):void  => {
        const errorM = errorMessage;
        this.setState({
            errorMessage: errorM
        });
    }

    // public checkedTerms = ( event: any, isChecked:boolean ):void => {
    //     const id = event;

    //     if ( isChecked === true ) {
           
    //         this.setState(prevState => ({
    //             checkedValues: [...prevState.checkedValues, id]
    //         }));
    //     } 

    //     else {
    //         const newArray = this.state.checkedValues.filter((item) => item !== id)
            
    //         this.setState({
    //             checkedValues: newArray
    //         })
           
    //     }

      
    // }
   

     
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


    
    public render(): React.ReactElement<IScwProps>  { 

        const  { current, step, commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, ownerList, errorMessage, showModal, checkedValues, showCallout, targetId } = this.state;

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
                ),
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
                    // memberList= { memberList }
                    getOwnersCallback= { this.handleOwnerCallback }
                    // getMemberCallback= { this.handleMemberCallback }
                />
                ),
            },
            { 
                step: "5",
                title: this.strings.review_submit,
                content: (
                <LastStep
                    current= { current }
                    prefLang={this.props.prefLang}
                    engName= { engName }
                    commPurpose= { commPurpose }
                    frCommName= { frCommName }
                    selectedChoice= { selectedChoice }
                    shEngDesc= { shEngDesc }
                    shFrDesc= { shFrDesc }
                    ownerList= { ownerList }
                    // memberList= { memberList }
                    context= { this.props.context }
                    showCallout = { showCallout}
                    targetId = { targetId }
                    commPurposeCallback={ this.commPurposeCallback }
                    handleEngNameCallback= { this.handleEngNameCallback }
                    frNameCallBack= { this.frNameCallback }
                    getOwnersCallback= { this.handleOwnerCallback }
                    // getMemberCallback= { this.handleMemberCallback }
                    handleFrDescCallback= { this.frDescCallback }
                    handleEngDescCallback= { this.engDescCallback }
                    isCalloutVisible ={ this.isCalloutVisible }
                    getElementId={this.getElementId}
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
                            <Steps current= { this.state.current } labelPlacement='vertical' items= { items } />
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
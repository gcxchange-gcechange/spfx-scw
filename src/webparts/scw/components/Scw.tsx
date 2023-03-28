/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import  { Steps, Button, Result } from 'antd';
// import  { message} from 'antd';
import FirstStep from "./FirstStep";
import  { IScwProps } from './IScwProps';
import  { Initial } from './InitialPage/Initial';
import  { PrimaryButton, Stack } from 'office-ui-fabric-react';
import  { IButtonStyles } from 'office-ui-fabric-react';
import LastStep from './LastStep';
// import  { MessageType } from 'antd/es/message/interface';
import ErrorModal from './Modal';
import FourthStep from './FourthStep';
import SecondStep from './SecondStep';
import { SelectLanguage } from './SelectLanguage';
import ThirdStep from './ThirdStep';
import { AadHttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http-base';
import Title from './Title';
import Complete from './Complete';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { CloseCircleOutlined } from '@ant-design/icons';
import Callouts from './Callouts';



export interface IScwState  { 
    current: number;
    step: number;
    engName: string;
    ownerList: string[];
    memberList: string[];
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    selectedChoice: string;
    errorMessage: string;
    showModal: boolean;
    checkedValues: boolean[];
    isLoading: boolean;
    validationStatus: number;
    showCallout: boolean;
    targetId: string;
   
    
}




export default class AntDesignStep extends React.Component<IScwProps, IScwState>  { 
   public strings = SelectLanguage(this.props.prefLang);
   private owner = this.props.context.pageContext.user.email;

    public constructor( props: IScwProps, state: IScwState )  { 
        super( props );
        this.state =  { 
            current: 0,
            step: 0,
            engName:'', 
            ownerList: [this.owner],
            memberList: [this.owner],
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
            targetId: ''
            
        };

    }

   

    private next = (): void =>  { 

       
        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, selectedChoice, checkedValues, ownerList } = this.state

        
       if ( !commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc) {
   
            this.setState({ showModal: true });
       } 

       else if ( current === 1 && selectedChoice === '' ) {
            
             this.setState({ showModal: true });
       }
       
       else if ( current === 2 &&  selectedChoice === 'Protected A or B community' && checkedValues.length < 7 ) {
                
                this.setState({ showModal: true });
       } 
        else if ( current === 3 && ownerList.length === 1 ) {
            
                this.setState({ showModal: true });

        } else {

            this.goToNextPg(current);
        }
       
    }


    public closeModal = (): void => {
        this.setState({
            showModal: false
        })
    }

    private goToNextPg = (pageNumber: number): void =>  { 
            
        this.setState ((prevState) => ({
            current: prevState.current + 1
        }))
    }

    private prev = (): void =>  { 
        const prevPage = this.state.current - 1;   

        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, selectedChoice } = this.state

       

        if ( current === 4 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc || ownerList.length === 1)) {
           
            this.setState({ showModal: true });
        }
        else    if ( current === 2 && selectedChoice === 'Protected A or B community') {

            this.setState({ selectedChoice: 'Unclassified community' })
        }
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
        
        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList, memberList, selectedChoice } = this.state

        
        if ( current === 4 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc ||   ownerList.length === 1)) {
            
            this.setState({ showModal: true });
        }
        else {



            const functionUrl = "";
            const requestHeaders: Headers = new Headers();
            requestHeaders.append("Content-type", "application/json");
            requestHeaders.append("Cache-Control", "no-cache");

            let owner1: any;
     
            if (ownerList.length === 2) {
                owner1 = ownerList[0] + "," + ownerList[1];
            } else {
                owner1 = ownerList[0] + "," + ownerList[1] + "," + ownerList[2];
            }
            console.log("ownerList",owner1);
            let memberlist = "";
            for (let i = 0; i < memberList.length; i++) {
                if (i === memberList.length - 1) {
                    memberlist += memberList[i]
                } else {
                    memberlist += memberList[i] + ","
                }
            }
            console.log("memberList",memberlist);


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
                    "RequesterEmail": "${this.props.context.pageContext.user.email}",
                    "SecurityCategory": "${selectedChoice}",
                    "Status": "Submitted",
                    "Members": "${memberList}"
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

                  if ( response.status === 200 ) {
                    this.setState({
                        current: current + 1,
                        isLoading: false,
                        validationStatus: response.status,
                    })
                  } else {
                    
                    this.setState({
                        isLoading: false,
                        validationStatus: response.status,
                    });
                  
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
            [eventValue]:values
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

    public selectedChoiceCallback = ( selectedChoice: string ): void =>  { 

        const saveSelectedChoice = selectedChoice;

        this.setState( { 
            selectedChoice: saveSelectedChoice
        })
    } 

  
    public handleOwnerCallback = ( items: [] ): void =>  { 
        const OwnerArr: string[] = [];

        items.forEach(user =>  { 
            // eslint-disable-next-line dot-notation
            OwnerArr.push( user['secondaryText'] )
        })
  
        this.setState( { 
            ownerList: OwnerArr
        }) ; 
    }

    public handleMemberCallback = ( items: [] ): void =>  { 
        const MemberArr: string[] = [];

        items.forEach(user =>  { 
            // eslint-disable-next-line dot-notation
            MemberArr.push( user['secondaryText'] )
        })
  
        this.setState( { 
            memberList: MemberArr
        }) ; 

    }

    public handleErrorMessage = ( errorMessage: string ):void  => {
        const errorM = errorMessage;
        this.setState({
            errorMessage: errorM
        });
    }

    public checkedTerms = ( isChecked: boolean ):void => {
        this.setState(prevState => ({
            checkedValues: [...prevState.checkedValues, isChecked]
        }));
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



    
    public render(): React.ReactElement<IScwProps>  { 

        const  { current, step, commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, ownerList, memberList, errorMessage, showModal, checkedValues, showCallout, targetId } = this.state;

        const steps = [
        
            { 
                step: "1",
                title: this.strings.title_details,
                content: (
                <FirstStep
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
            { 
                step: "2",
                title: "Classification",
                content: (
                <SecondStep
                    selectedChoice= { selectedChoice }
                    handleSelectedChoice= { this.selectedChoiceCallback}
                />
                ),
            },
            { 
                step: "3",
                title: "Terms of use",
                content: <ThirdStep checkedValues= { checkedValues } checkedTerms = { this.checkedTerms } selectedChoice = { selectedChoice }/>,
            },
            { 
                step: "4",
                title: "Owners & Members",
                content: (
                <FourthStep
                    prefLang={this.props.prefLang}
                context= { this.props.context }
                    ownerList= { ownerList }
                    memberList= { memberList }
                    getOwnersCallback= { this.handleOwnerCallback }
                    getMemberCallback= { this.handleMemberCallback }
                />
                ),
            },
            { 
                step: "5",
                title: "Review & Submit",
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
                    memberList= { memberList }
                    context= { this.props.context }
                    showCallout = { showCallout}
                targetId = { targetId }
                commPurposeCallback={ this.commPurposeCallback }
                    handleEngNameCallback= { this.handleEngNameCallback }
                    frNameCallBack= { this.frNameCallback }
                    getOwnersCallback= { this.handleOwnerCallback }
                    getMemberCallback= { this.handleMemberCallback }
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
                    <Complete 
                        prefLang={this.props.prefLang}
                    />
                ),
               
            },
        ];


        const items = steps.map( item => ( item.step !== '6' ?  { key: item.step, title: item.title} : null));
        
        return (
            <div className= { styles.scw }>
                <Title current={ current } step={ step } prefLang={this.props.prefLang} />
                { step === 0 
                ? <>
                        <Initial
                            context={this.props.context}
                            prefLang={this.props.prefLang}
                        />
                <PrimaryButton styles= { this.buttonStyle } text="Let's go" ariaLabel="Let's go" onClick= { () =>  { this.handleClickEvent()} } className= { styles.centerButton }/>
                </>
                :
                <div className= { styles.container }>
                    <div className= { styles.row }> 
                        <Steps current= { this.state.current } labelPlacement='vertical' items= { items } />
                        <div className="steps-content"> 
                            { this.state.isLoading ? 
                                (<Spinner size={ SpinnerSize.large }/>) : this.state.validationStatus === 400 && steps[this.state.current].step ==='5'
                                ? 
                                <Result
                                    icon={<CloseCircleOutlined/>}
                                    title="Submission Failed"
                                    subTitle="Please send GCXchange and email."
                                    extra={<Button type="primary">Email us</Button>}
                                /> 
                                :
                                steps[ this.state.current ].content
                            }   
                        </div>
                        {  showCallout && <Callouts prefLang={ this.props.prefLang } showCallout={showCallout}  targetId= { targetId } openCallout = {this.isCalloutVisible} /> }
                        <div className="steps-action">
                            <Stack horizontal horizontalAlign='space-between'>
                                { this.state.current === 0 &&   <Button className={ styles.previousbtn }  onClick= { () => this.goToInitalPage() } > Previous </Button> }
                                { this.state.showModal === true && <ErrorModal current = { current }  engName= { engName } commPurpose= { commPurpose } frCommName= { frCommName } shEngDesc= { shEngDesc } shFrDesc= { shFrDesc } selectedChoice={ selectedChoice } checkedValues={ checkedValues }   ownerList= { ownerList } showModal={ showModal } openModal = { this.next } onClose={ this.closeModal } /> } 
                                { this.state.current > 0 &&  (this.state.current !== 4 && steps[this.state.current].step !== '5' || steps[this.state.current].step !== '6')
                                && ( <Button id='prev'className={ styles.previousbtn } style={{ display: 'inline-block', overflow: 'visible', whiteSpace: 'break-spaces', height:'auto'}}  onClick= { () => this.prev() } > { this.state.current === 2 && selectedChoice === `Protected A or B community`?  `${ this.strings.unclassified_button }` : `Previous` } </Button> ) 
                                 }
                                { this.state.current < steps.length - 2 && ( this.state.current !== 2 || selectedChoice === 'Unclassified community' ) && (<Button className={ styles.largebtn } type="primary" onClick= { this.next} >Next</Button> )}
                                { this.state.current < steps.length - 2 && ( this.state.current === 2 && selectedChoice === `Protected A or B community` ) && (<Button className={ styles.largebtn } style={{ height: '54px'}} type="primary" onClick= { this.next} >Next</Button> ) }
                                { this.state.current === steps.length - 2 && 
                                ( <Button id="submit" className={ styles.largebtn } type="primary" onClick= { this.successMessage} >Let's do this</Button> )}
                            </Stack>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
    
}
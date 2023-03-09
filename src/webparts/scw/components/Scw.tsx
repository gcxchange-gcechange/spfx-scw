/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import  { Steps, Button, message} from 'antd';
import FirstStep from "./FirstStep";
import  { IScwProps } from './IScwProps';
import  { Initial } from './InitialPage/Initial';
import  { PrimaryButton } from 'office-ui-fabric-react';
import  { IButtonStyles } from 'office-ui-fabric-react';
import LastStep from './LastStep';
import  { MessageType } from 'antd/es/message/interface';
import ErrorModal from './Modal';
import FourthStep from './FourthStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';




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
   
    
}




export default class AntDesignStep extends React.Component<IScwProps, IScwState>  { 

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
            checkedValues: []
            
        };

    }

    // private next = (): void => {
    //     const { current, commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, checkedValues } = this.state;
    //     const nextPage = current + 1;
      
    //     switch (current) {
    //       case 1:
    //         if (commPurpose.length === 0 || engName.length === 0 || frCommName.length === 0 || shEngDesc.length === 0 || shFrDesc.length === 0) {
    //           this.setState({ showModal: true });
    //         } else {
    //           this.setState({ current: nextPage });
    //         }
    //         break;
      
    //       case 2:
    //         if (!selectedChoice.length) {
    //           this.setState({ showModal: true });
    //         } else {
    //           this.setState({ current: nextPage });
    //         }
    //         break;
      
    //       case 3:
    //         if (checkedValues.length < 7) {
    //           this.setState({ showModal: true });
    //         } else {
    //           this.setState({ current: nextPage });
    //         }
    //         break;
      
    //       default:
    //         break;
    //     }
    //   };

    private next = (): void =>  { 
       
        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, selectedChoice, checkedValues } = this.state
        console.log("Page",current)


       if (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc) {
        this.setState({ showModal: true });
        } 

       if ( current === 1 && (!selectedChoice.length) ) {
            this.setState({
                showModal: true
            });
       }

       if ( current === 2 && checkedValues.length < 7 ) {
        this.setState({
            showModal: true
        });
        }
       
       if ( commPurpose.length !==  0 && engName.length !==  0 && frCommName.length !==  0 && shEngDesc.length !==  0 && shFrDesc.length !==  0 ) {
            this.setState({
                current: current + 1
            })
       } 
       
       else if ( current === 1 && selectedChoice.length !== 0) {
            this.setState({
                current: current + 1
            })
       } else if  ( current === 2 && checkedValues.length === 7) {
            this.setState({
                current: current + 1
            })
       }

    }

    public closeModal = (): void => {
        this.setState({
            showModal: false
        })
    }

    private prev = (): void =>  { 
        
        const current = this.state.current - 1;       
        this.setState( { current });   
    }

    public handleClickEvent=():void=>  { 
        const step = this.state.step + 1;
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
    
    
    public successMessage = (): MessageType  =>  { 
        return (
            message.success( { 
                content: "loaded!",
            })
        ) 
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




    
    public render(): React.ReactElement<IScwProps>  { 

        const  { commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, ownerList, memberList, errorMessage, showModal, checkedValues } = this.state;

        const steps = [
         { 
            step: "1",
            title: "Details",
            
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
            content: <ThirdStep checkedValues= { checkedValues } checkedTerms = { this.checkedTerms } />,
          },
         { 
            step: "4",
            title: "Owners & Members",
            content: (
              <FourthStep
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
                engName= { engName }
                commPurpose= { commPurpose }
                frCommName= { frCommName }
                selectedChoice= { selectedChoice }
                shEngDesc= { shEngDesc }
                shFrDesc= { shFrDesc }
                ownerList= { ownerList }
                memberList= { memberList }
                context= { this.props.context }
                commPurposeCallback={ this.commPurposeCallback }
                handleEngNameCallback= { this.handleEngNameCallback }
                frNameCallBack= { this.frNameCallback }
                getOwnersCallback= { this.handleOwnerCallback }
                getMemberCallback= { this.handleMemberCallback }
                handleFrDescCallback= { this.frDescCallback }
                handleEngDescCallback= { this.engDescCallback }
              />
            ),
          },
        ];


        const items = steps.map( item => ( item.title !== '6' ?  { key: item.step, title: item.title } : null));
        
        return (
            <div className= { styles.scw }>
                <h2>Create a community</h2>
                { this.state.step === 0 
                ? <>
                <Initial/>
                <PrimaryButton styles= { this.buttonStyle } text="Let's go" ariaLabel="Let's go" onClick= { () =>  { this.handleClickEvent()} } className= { styles.centerButton }/>
                </>
                :
                <div className= { styles.container }>
                    <div className= { styles.row }> 
                        <Steps current= { this.state.current } labelPlacement='vertical' items= { items } />
                        <div className="steps-content"> { steps[ this.state.current ].content }</div>
                        <div className="steps-action">
                            {this.state.showModal === true && <ErrorModal   engName= { engName } commPurpose= { commPurpose } frCommName= { frCommName } shEngDesc= { shEngDesc } shFrDesc= { shFrDesc } selectedChoice={ selectedChoice } checkedValues={ checkedValues }   ownerList= { ownerList } showModal={ showModal } openModal = { this.next } onClose={ this.closeModal } />}
                             { this.state.current < steps.length - 1 && (<Button type="primary" onClick= { this.next} >Next</Button> ) }
                             { this.state.current === steps.length - 1 && (<Button type="primary" onClick= { this.successMessage} >Done</Button> ) }
                             { this.state.current > 0 && (<Button style= {{ margin: '0 8px' }} onClick= { () => this.prev()}>Previous</Button> ) }
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
    
}

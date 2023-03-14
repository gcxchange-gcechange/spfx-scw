/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import  { Steps, Button, message} from 'antd';
import FirstStep from "./FirstStep";
import  { IScwProps } from './IScwProps';
import  { Initial } from './InitialPage/Initial';
import  { PrimaryButton, Stack } from 'office-ui-fabric-react';
import  { IButtonStyles } from 'office-ui-fabric-react';
import LastStep from './LastStep';
import  { MessageType } from 'antd/es/message/interface';
import ErrorModal from './Modal';
import FourthStep from './FourthStep';
import SecondStep from './SecondStep';
import { SelectLanguage } from './SelectLanguage';
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
            checkedValues: []
            
        };

    }

   

    private next = (): void =>  { 

       
        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, selectedChoice, checkedValues, ownerList } = this.state

        console.log("CommPurpose", commPurpose)
        
       if ( !commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc) {
   
            this.setState({ showModal: true });
       } 

       else if ( current === 1 && selectedChoice === '' ) {
            
             this.setState({ showModal: true });
       }
       else if ( current === 2 && checkedValues.length < 7 ) {
                
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

        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList } = this.state

        if ( current === 4 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc || ownerList.length === 1)) {
           
            this.setState({ showModal: true });
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

    public buttonStyle: IButtonStyles =  { 
        root:  { 
            fontSize:'18px',
            backgroundColor:'#004DB8'
        }
    }   
    
    
    public successMessage = (): MessageType  =>  { 

        const { current, engName, frCommName, shEngDesc, shFrDesc, commPurpose, ownerList } = this.state

        if ( current === 4 && (!commPurpose || !engName || !frCommName || !shEngDesc || !shFrDesc ||   ownerList.length === 1)) {
            console.log('thisState', this.state)
            this.setState({ showModal: true });
        }
        else {
            return (
                message.success( { 
                    content: "loaded!",
                })
            );
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




    
    public render(): React.ReactElement<IScwProps>  { 

        const  { current, commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, ownerList, memberList, errorMessage, showModal, checkedValues } = this.state;

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
                { this.state.step === 0 
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
                        <div className="steps-content"> { steps[ this.state.current ].content }</div>
                        <div className="steps-action">
                            <Stack horizontal horizontalAlign='space-between'>
                                {this.state.showModal === true && <ErrorModal current = { current }  engName= { engName } commPurpose= { commPurpose } frCommName= { frCommName } shEngDesc= { shEngDesc } shFrDesc= { shFrDesc } selectedChoice={ selectedChoice } checkedValues={ checkedValues }   ownerList= { ownerList } showModal={ showModal } openModal = { this.next } onClose={ this.closeModal } />} 
                                { this.state.current > 0 && (<Button className={styles.previousbtn}style= {{ margin: '0 8px' }} onClick= { () => this.prev()}>Previous</Button> ) }
                                { this.state.current < steps.length - 1 && (<Button className={ styles.largebtn } type="primary" onClick= { this.next} >Next</Button> ) }
                                { this.state.current === steps.length - 1 && (<Button className={ styles.largebtn } type="primary" onClick= { this.successMessage} >Let's do this</Button> ) }
                            </Stack>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
    
}
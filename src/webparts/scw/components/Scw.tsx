import * as React from 'react';
import styles from './Scw.module.scss';
import { Steps, Button, message} from 'antd';
import FirstStep from "./FirstStep";
import { IScwProps } from './IScwProps';
import { Initial } from './InitialPage/Initial';
import { IButtonStyles, PrimaryButton } from 'office-ui-fabric-react';
import LastStep from './LastStep';
import { MessageType } from 'antd/es/message/interface';
import FourthStep from './FourthStep';
import SecondStep from './SecondStep';



export interface IScwState {
    current: number;
    step: number;
    engName: string;
    ownerList: string[];
    memberList: string[];
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    commClass: string;
    selectedChoice: string;
   
    
}




export default class AntDesignStep extends React.Component<IScwProps, IScwState> {

   private owner = this.props.context.pageContext.user.email;

    public constructor(props: IScwProps, state: IScwState) {
        super(props);
        this.state = {
            current: 0,
            step: 0,
            engName:'', 
            ownerList: [this.owner],
            memberList: [this.owner],
            commPurpose: '',
            frCommName: '',
            shEngDesc: '',
            shFrDesc: '',
            commClass: '',
            selectedChoice: ''
            

        };

    }

    private next = (): void => {
        const current = this.state.current + 1;
        // const saveName = this.state.engName;
        // const saveshEngDesc = this.state.shEngDesc;

        this.setState({ 
            current: current, 
            // engName: saveName, 
            // shEngDesc: saveshEngDesc 
        });
    }

    private prev = (): void => {
        
        const current = this.state.current - 1;       
        this.setState({ current });   
    }

    public handleClickEvent=():void=> {
        const step = this.state.step + 1;
        this.setState({
           step
        });
    }

    public buttonStyle: IButtonStyles = {
        root: {
            fontSize:'18px',
            backgroundColor:'#004DB8'
        }
    }   
    
    
    public successMessage = (): MessageType  => {
        return (
            message.success({
                content: "loaded!",
            })
        ) 
    }

    public commPurposeCallback = (commPurpose: string): void =>  {
        const savePurpose = commPurpose;
        this.setState ({
            commPurpose: savePurpose
        });
     
    }

    public handleEngNameCallback = (engNameValue: string): void =>  {
        const saveEngName = engNameValue;
        this.setState ({
            engName: saveEngName
        });
     
    }

    public frNameCallback = (FrNameValue: string): void =>  {
        const saveFrName = FrNameValue;
        this.setState ({
            frCommName: saveFrName
        });
        
    }

    public engDescCallback = (EngDescValue: string): void =>  {
        const saveEngDesc = EngDescValue;
        this.setState ({
            shEngDesc: saveEngDesc
        });
        
    }

    public frDescCallback = (FrDescValue: string): void =>  {
        const saveFrDesc = FrDescValue;
        this.setState ({
            shFrDesc: saveFrDesc
        });
        
    }

    public selectedChoiceCallback = (selectedChoice: string): void => {
        const saveSelectedChoice = selectedChoice;

        console.log("Choice", saveSelectedChoice);

        this.setState({
            selectedChoice: selectedChoice
        })
    } 

  
    public handleOwnerCallback = (items: []): void => {
        const OwnerArr: string[] = [];

        items.forEach(user => {
            // eslint-disable-next-line dot-notation
            OwnerArr.push(user['secondaryText'])
        })
  
        this.setState({ 
            ownerList: OwnerArr
        }) ; 
    }

    public handleMemberCallback = (items: []): void => {
        const MemberArr: string[] = [];

        items.forEach(user => {
            // eslint-disable-next-line dot-notation
            MemberArr.push(user['secondaryText'])
        })
  
        this.setState({ 
            memberList: MemberArr
        }) ; 

    }



    
    public render(): React.ReactElement<IScwProps> {

        const { commPurpose, engName, frCommName, shEngDesc, shFrDesc, selectedChoice} = this.state;


        const steps = [
            {
                step: '1',
                title: 'Details',
                content: <FirstStep engName={engName} commPurpose={commPurpose} frCommName={frCommName}
                shEngDesc={shEngDesc} shFrDesc={shFrDesc}  commPurposeCallback={ this.commPurposeCallback} 
                handleEngNameCallback={this.handleEngNameCallback}  frNameCallback={this.frNameCallback}
                frDescCallback={this.frDescCallback} engDescCallback={this.engDescCallback} 
                
                />

            },
            {
                step: '2',
                title: 'Classification',
                content: <SecondStep selectedChoice={selectedChoice} handleSelectedChoice={this.selectedChoiceCallback}/>,
            },
            {
                step: '3',
                title: 'Terms of use',
                content: 'third',
            },
             {
                step: '4',
                title: 'Owners & Members',
                content: <FourthStep context={this.props.context} ownerList={this.state.ownerList} memberList={this.state.memberList}
                getOwnersCallback={this.handleOwnerCallback} getMemberCallback={this.handleMemberCallback}/>,
            },
            {
                step: '5',
                title: 'Review & Submit',
                content: <LastStep engName={engName} commPurpose={this.state.commPurpose} frCommName={this.state.frCommName}  selectedChoice={selectedChoice}
                shEngDesc={this.state.shEngDesc} shFrDesc={this.state.shFrDesc} commClass={this.state.commClass} ownerList={this.state.ownerList} memberList={this.state.memberList} 
                context={this.props.context} handleEngNameCallback={this.handleEngNameCallback} getOwnersCallback={this.handleOwnerCallback} getMemberCallback={this.handleMemberCallback}
                handleFrDescCallback={this.frDescCallback} handleEngDescCallback={this.engDescCallback}/>,
            },
        ]


        const items = steps.map( item => ( item.title !== '6' ? { key: item.step, title: item.title } : null));
        
        return (
            <div className={styles.scw}>
                {this.state.step === 0 
                ? <>
                <Initial/>
                <PrimaryButton styles={ this.buttonStyle } text="Let's go" ariaLabel="Let's go" onClick={() => {this.handleClickEvent()}} className={ styles.centerButton }/>
                </>
                :
                <div className={ styles.container }>
                    <div className={ styles.row }>
                        <Steps current={ this.state.current } labelPlacement='vertical' items={items} />
                        <div className="steps-content">{steps[this.state.current].content}</div>
                        <div className="steps-action">
                            {this.state.current < steps.length - 1 && (<Button type="primary" onClick={this.next} >Next</Button> ) }
                            {this.state.current === steps.length - 1 && (<Button type="primary" onClick={this.successMessage} >Done</Button> )}
                            {this.state.current > 0 && (<Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>Previous</Button> )}
                        </div>
                    </div>
                </div>
                 }
            </div>
        );
    }
    
}

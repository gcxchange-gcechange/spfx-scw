import * as React from 'react';
import styles from './Scw.module.scss';
import { Steps, Button, message} from 'antd';
import FirstStep from "./FirstStep";
import { IScwProps } from './IScwProps';
import { Initial } from './InitialPage/Initial';
import { IButtonStyles, PrimaryButton } from 'office-ui-fabric-react';
import LastStep from './LastStep';
import { MessageType } from 'antd/es/message/interface';
// import FourthStep from './FourthStep';



export interface IScwState {
    current: number;
    step: number;
    engName: string;
    ownerList: string[];
    memberList: string[];
    allValues: IUserInputs[];
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    commClass: string;
    
}

export interface IUserInputs{
    commPurpose: string;
    name: string;
    frName: string;
    shEngDesc: string;
    shFrDesc: string;
    commClass: string;
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
            allValues: []

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


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // public handleCallback = (event:any): void =>  {

    //     const saveEngName = event.target.value;
    //     const saveFRName = event.target.value;
    //     // const values = event.target.value;
    //     console.log("SCWValuesENg", saveEngName);
    //     console.log("SCWValuesFr", saveFRName);
    //     this.setState({ 
    //         engName: saveEngName,
    //         frCommName: saveFRName
    //     }) ; 
    // }

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

    public frDescCallback = (FrDesValue: string): void =>  {
        const saveFrDesc = FrDesValue;
        this.setState ({
            shFrDesc: saveFrDesc
        });
        
    }

    // public frDescCallback = (shFrDesc: string): void => {
    //     this.setState({ 
    //         shFrDesc: shFrDesc,
    //     }) ; 
    // }

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

        const steps = [
            {
                step: '1',
                title: 'Details',
                content: <FirstStep engName={this.state.engName} commPurpose={this.state.commPurpose} frCommName={this.state.frCommName} allValues={this.state.allValues}
                shEngDesc={this.state.shEngDesc} shFrDesc={this.state.shFrDesc} handleEngNameCallback={this.handleEngNameCallback}  frNameCallback={this.frNameCallback}
                frDescCallback={this.frDescCallback}
                
                />

            },
            // {
            //     step: '2',
            //     title: 'Classification',
            //     content: 'second',
            // },
            // {
            //     step: '3',
            //     title: 'Terms of use',
            //     content: 'third',
            // },
            //  {
            //     step: '4',
            //     title: 'Owners & Members',
            //     content: <FourthStep context={this.props.context} ownerList={this.state.ownerList} memberList={this.state.memberList}
            //     getOwnersCallback={this.handleOwnerCallback} getMemberCallback={this.handleMemberCallback}/>,
            // },
            {
                step: '5',
                title: 'Review & Submit',
                content: <LastStep engName={this.state.engName} commPurpose={this.state.commPurpose} frCommName={this.state.frCommName} 
                shEngDesc={this.state.shEngDesc} shFrDesc={this.state.shFrDesc} commClass={this.state.commClass} ownerList={this.state.ownerList} memberList={this.state.memberList} 
                context={this.props.context} handleEngNameCallback={this.handleEngNameCallback} getOwnersCallback={this.handleOwnerCallback} getMemberCallback={this.handleMemberCallback}
                handleFrDescCallback={this.frDescCallback}/>,
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

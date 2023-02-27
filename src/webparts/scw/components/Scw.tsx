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


export interface IScwState {
    current: number;
    step: number;
    name: string;
    peopleList: string[];
    commPurpose: string;
    FrCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    
}


export default class AntDesignStep extends React.Component<IScwProps, IScwState> {


    public constructor(props: IScwProps, state: IScwState) {
        super(props);
        this.state = {
            current: 0,
            step: 0,
            name:'', 
            peopleList: [],
            commPurpose: '',
            FrCommName: '',
            shEngDesc: '',
            shFrDesc: ''
        };

        this.handleCallback = this.handleCallback.bind(this);
        this.handleOwnerMembCallback = this.handleOwnerMembCallback.bind(this);
    }

    private next = (): void => {
        const current = this.state.current + 1;


        const saveName = this.state.name;
        // const getName = localStorage.getItem(JSON.stringify('name'));
        this.setState({ current: current, name: saveName });
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


    public handleCallback = (name: string): void => {
        // localStorage.setItem('name', name); 
        this.setState({ 
            name: name
        }) ; 
    }

    public handleOwnerMembCallback = (items: []): void => {
        // localStorage.setItem('name', name);

     console.log("Item", items)
    
        this.setState({ 
            peopleList: items
        }) ; 
    }

    
    public render(): React.ReactElement<IScwProps> {

        const steps = [
            {
                step: '1',
                title: 'Details',
                content: <FirstStep handleCallback={this.handleCallback} name={this.state.name}/>

            },
            {
                step: '2',
                title: 'Classification',
                content: 'second',
            },
            {
                step: '3',
                title: 'Terms of use',
                content: 'third',
            },
             {
                step: '4',
                title: 'Owners & Members',
                content: <FourthStep context={this.props.context} peopleList={this.state.peopleList} getOwnersCallback={this.handleOwnerMembCallback}/>,
            },
            {
                step: '5',
                title: 'Review & Submit',
                content: <LastStep handleCallback={this.handleCallback} name={this.state.name} peopleList={this.state.peopleList} context={this.props.context} getOwnersCallback={this.handleOwnerMembCallback}/>,
            },
        ]

        

        console.log("name", this.state.name);
        console.log("user", this.state.peopleList)

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

import * as React from 'react';
import styles from './Scw.module.scss';
import { Steps, Button, message} from 'antd';
import FirstStep from "./FirstStep";
import { IScwProps } from './IScwProps';
import { MessageType } from 'antd/es/message/interface';
import { Initial } from './InitialPage/Initial';
import { IButtonStyles, PrimaryButton } from 'office-ui-fabric-react';
import LastStep from './LastStep';

// const { Step } = Steps;



// const steps = [
//     {
//         step: '1',
//         title: '1',
//         content: <FirstStep name={this.handleCallback}/>,
//     },
//     {
//         title: '2',
//         content: 'Second-content',
//     },
//     {
//         title: '3',
//         content: 'Third-content',
//     },
//     {
//         title: '4',
//         content: 'Fourth-content',
//     },
//     {
//         title: '5',
//         content: 'Fifth-content',
//     },
//     {
//         title: '6',
//         content: 'Sixth-content',
//     },
//     {
//         title: '7',
//         content: 'Seventh-content',
//     },
//     {
//         title: '8',
//         content: 'Last-content',
//         // status: 'finished'
//     },
//     {
//         title: '9',
//         content: 'Last-content',
//         status: 'finished'
//     }
// ];


export interface IScwState {
    current: number;
    step: number;
    name: string;
   
    
}



export default class AntDesignStep extends React.Component<IScwProps, IScwState> {
    public constructor(props: IScwProps, state: IScwState) {
        super(props);
        this.state = {
            current: 0,
            step: 0,
            name:'',
            
        };

        this.handleCallback = this.handleCallback.bind(this);
    }

    // componentDidMount(): void {
    //     const getName = localStorage.getItem('name');
    //     console.log("getN",getName)
    //     const parseData = JSON.parse(getName);
    //     if(getName) {
    //         this.setState({name: parseData});
    //     }
    // }
 

    private next = (): void => {
        const current = this.state.current + 1;
        const saveName = this.state.name;
        const getName = localStorage.getItem(JSON.stringify('name'));
        this.setState({ current: current, name: saveName });

        console.log("name", getName)
    }

    private prev = (): void => {
        
        const current = this.state.current - 1;
        const prevValue = localStorage.getItem("name")
        
        if(prevValue) {
            this.setState({name: prevValue});
        }
        this.setState({ current });   
    }

    public handleClickEvent=():void=> {
        const step = this.state.step + 1;
        this.setState({
           step
        })
    }

    public buttonStyle: IButtonStyles = {
        root: {
            fontSize:'18px',
            backgroundColor:'#004DB8'
        }
    }

    public successMessage = (): MessageType  => {
        // localStorage.removeItem('name');
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
                content: 'fourth',
            },
            {
                step: '5',
                title: 'Review & Submit',
                content: <LastStep name={this.state.name}/>,
            },
        ]

        

        console.log("name", this.state.name);

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

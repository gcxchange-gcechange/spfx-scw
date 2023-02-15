import * as React from 'react';
import styles from './Scw.module.scss';
import { IScwProps } from './IScwProps';
import { Steps, Button, message } from 'antd';
import FistStep from "./FirstStep";
import { Initial } from './InitialPage/Initial';
import { IButtonStyles, PrimaryButton } from 'office-ui-fabric-react';

const { Step } = Steps;

const steps = [
    {
        title: 'First',
        content: <FistStep/>,
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];


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
            name: ''
            
        };
    }


    private next = (): void => {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    private prev = (): void => {
        const current = this.state.current - 1;
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
            fontSize:'18px'
        }
    }

    public getName=(name: string) : void => {
        this.setState({name: name})
    }

  
    public render(): React.ReactElement<IScwProps> {

       const {name} = this.state; 

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
                        <Steps current={ this.state.current }>
                            {steps.map(item => (<Step key={item.title} title={item.title} />))}
                        </Steps>

                        <div className="steps-content">{steps[this.state.current].content}</div>
                        <div>{name}</div>
                        <div className="steps-action">
                            {this.state.current < steps.length - 1 && (<Button type="primary" onClick={() => this.next()}>Next</Button>)}
                            {this.state.current === steps.length - 1 && (<Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>)}
                            {this.state.current > 0 && (<Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>Previous</Button>
                            )}
                        </div>
                    </div>
                </div>
                 }
            </div>
        );
    }
}

import * as React from 'react';
import styles from './Scw.module.scss';
import { IScwProps } from './IScwProps';
import { Steps, Button, message } from 'antd';
import FistStep from "./FirstStep";


import { MessageType } from 'antd/es/message/interface';

const { Step } = Steps;

const steps = [
    {
        title: '1',
        content: <FistStep/>,
    },
    {
        title: '2',
        content: 'Second-content',
    },
    {
        title: '3',
        content: 'Third-content',
    },
    {
        title: '4',
        content: 'Fourth-content',
    },
    {
        title: '5',
        content: 'Fifth-content',
    },
    {
        title: '6',
        content: 'Sixth-content',
    },
    {
        title: '7',
        content: 'Seventh-content',
    },
    {
        title: '8',
        content: 'Last-content',
        // status: 'finished'
    },
    {
        title: '9',
        content: 'Last-content',
        status: 'finished'
    }
];

export interface IScwState {
    current: number;
}


export default class AntDesignStep extends React.Component<IScwProps, IScwState> {

    public constructor(props: IScwProps, state: IScwState) {
        super(props);
        this.state = {
            current: 0
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

    public successMessage = (): MessageType  => {
        return (
            message.success({
                content: "loaded!",
            })
        ) 
    }




    public render(): React.ReactElement<IScwProps> {
        return (
            <div className={styles.scw}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <Steps current={this.state.current}>
                            {steps.map(item => ( 
                                item.title !== '9' ?
                            <Step key={item.title} title={item.title}/>: null ))}
                        </Steps>
                        <div className="steps-content">{steps[this.state.current].content}</div>
                        <div className="steps-action">
                            {this.state.current < steps.length - 1 && (<Button type="primary" onClick={this.next} >Next</Button> ) }
                            {this.state.current === steps.length - 2 && (<Button type="primary" onClick={this.successMessage} >Done</Button> )}
                            {this.state.current > 0 && (<Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>Previous</Button> )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

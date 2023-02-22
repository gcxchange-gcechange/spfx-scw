import * as React from 'react';
import styles from './Scw.module.scss';
import { IScwProps } from './IScwProps';
import { Steps, Button, message } from 'antd';
import FistStep from "./FirstStep";
import { Initial } from './InitialPage/Initial';
import { IButtonStyles, PrimaryButton } from 'office-ui-fabric-react';
import { MessageType } from 'antd/es/message/interface';



export interface IScwState {
    current: number;
    step: number;
    
}


export default class AntDesignStep extends React.Component<IScwProps, IScwState> {

    public constructor(props: IScwProps, state: IScwState) {
        super(props);
        this.state = {
            current: 0,
            step: 0
            
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
        });
    }

    public buttonStyle: IButtonStyles = {
        root: {
            fontSize:'18px'
        }
    }   
    
    
    public successMessage = (): MessageType  => {
        return (
            message.success({
                content: "loaded!",
            })
        ) 
    }

  
    
    
    
    
    
    
    
    
    public render(): React.ReactElement<IScwProps> {

        const steps = [
            {
                step:'1',
                title: 'Details',
                content: <FistStep/>,
            },
            {
                step:'2',
                title: 'Classification',
                content: 'Second-content',
            },
            {
                step:'3',
                title: 'Terms of use',
                content: 'Third-content',
            },
            {
                step:'4',
                title: 'Owners & Members',
                content: 'Fourth-content',
            },
            {
                step:'5',
                title: 'Review & Submit',
                content: 'Fifth-content',
            },
            {
                title: '6',
                content: 'Sixth-content',
            }
        ];

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
                        <Steps current={ this.state.current } labelPlacement='vertical' items={items}/>
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

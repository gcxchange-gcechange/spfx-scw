import * as React from 'react';
import { Input, Form } from 'antd';

export interface IFistStepProps {

}

export interface IFistStepState {
    name: string;
}



export default class FistStep extends React.Component<IFistStepProps, IFistStepState> {
    public constructor(props: IFistStepProps, state: IFistStepState) {
        super(props);

        this.state = {
            name: ''
        };
    }

    handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        console.log(event.target.value);
        this.setState({name: event.target.value})
    }

    public render(): React.ReactElement<IFistStepProps> {

        // const name = this.state.name;

        return (
            <>
            <Form>
                <Form.Item name="name" label={'name'}>
                    <Input/>
                {/* onChange={this.handleOnChangeEvent} 
                //  onChange = {(e) => this.setState({name: e.target.value})} */}
                </Form.Item>
            </Form>
            </>
        );
    }
}
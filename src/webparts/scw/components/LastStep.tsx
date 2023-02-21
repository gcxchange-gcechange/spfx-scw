import { Input, Select } from 'antd';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import * as React from 'react';

export interface ILastStepProps {
    name: string;
    handleCallback?: (name: string) => void;
 }
 
 export interface ILastStepState {
     name: string;
 }

const {Option} = Select;

export default class FirstStep extends React.Component<ILastStepProps, ILastStepState> {

    public constructor(props: ILastStepProps, state: ILastStepProps) {
        super(props);
            this.state = {
            name: ''
        }
    }

    
    public render(): React.ReactElement<ILastStepProps>{

        console.log("prosp", this.props.name);

        return (
            <Form layout='vertical'>
                <FormItem name='template' label='Community template'>
                    <Select>
                        <Option value='template1'>Temp1</Option>
                        <Option value='template2'>Temp 2</Option>
                    </Select>
                </FormItem>
                <FormItem name='name' label='English community name'>
                    <Input defaultValue={this.props.name}/>
                </FormItem>
                <FormItem name='FrCommName' label='French community name'>
                    <Input/>
                </FormItem>
                <FormItem name='EngDes' label='English description'>
                    <Input/>
                </FormItem>
            </Form>
        );
    }




}
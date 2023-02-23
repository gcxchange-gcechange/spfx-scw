import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';

export interface ILastStepProps {
    name: string;
    handleCallback?: (name: string) => void;
 }
 
 export interface ILastStepState {
     name: string;
 }


export default class FirstStep extends React.Component<ILastStepProps, ILastStepState> {

    public constructor(props: ILastStepProps, state: ILastStepProps) {
        super(props);
            this.state = {
            name: ''
        }

        this.onUpdate = this.onUpdate.bind(this);
    }


    private  onUpdate = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const updatedName = event.target.value;

        this.setState({name: updatedName});
        //send it to the parent
        this.props.handleCallback("Name change from last step " + updatedName)
       
    }
    
    public render(): React.ReactElement<ILastStepProps>{

        console.log("props", this.props.name);

        return (

            <>
                <Label htmlFor={'name'}>Community purpose</Label>
                <TextField id={'name'} defaultValue={this.props.name} onChange={this.onUpdate}/>
            </>
        );
    }




}
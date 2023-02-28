/* eslint-disable dot-notation */
import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';

import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import AddUsers from './AddUsers';


export interface ILastStepProps {
    context: WebPartContext;
    name: string;
    peopleList: string[];
    handleCallback?: (name: string) => void;
    getOwnersCallback?: (item: []) => void;

 }
 
 export interface ILastStepState {
 
 }


export default class FirstStep extends React.Component<ILastStepProps, ILastStepState> {

    public constructor(props: ILastStepProps, state: ILastStepProps) {
        super(props);
        

        this.onUpdate = this.onUpdate.bind(this);
  
    }


    private  onUpdate = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const updatedName = event.target.value;
        
        this.setState({name: updatedName});
        //send it to the parent
        this.props.handleCallback("Name change from last step " + updatedName)
       
    }

    private updateDefaultValues = ( username: []):void  => {
        const newValues = username;

        this.setState({peopleList: newValues})

        this.props.getOwnersCallback(newValues)
     
    }

   



    
    public render(): React.ReactElement<ILastStepProps>{

        const {peopleList} = this.props
        
        const  username: string[] = [];
        peopleList.forEach(user => {
            username.push(user)
        })

       
        return (
            
            <>

                <Label htmlFor={'name'}>Community purpose</Label>
                <TextField id={'name'} defaultValue={this.props.name} onChange={this.onUpdate}/>  
                {/* <PeoplePicker titleText='Owners1' context={this.props.context}  defaultSelectedUsers={username} onChange={this.updateDefaultValues}/> */}
                <AddUsers context={this.props.context} peopleList={this.props.peopleList} getOwnersCallback={this.updateDefaultValues} />

    
            </>
        );
    }




}
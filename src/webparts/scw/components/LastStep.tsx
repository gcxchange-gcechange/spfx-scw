/* eslint-disable dot-notation */
import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';

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

    // public handleOwnerMembCallback = (items: []): void => {
    //     // localStorage.setItem('name', name);

    //  console.log("Items", items)
    
    //     this.setState({ 
    //         peopleList: items
    //     }) ; 
    // }
    
    public render(): React.ReactElement<ILastStepProps>{

        const {peopleList} = this.props
        
        const  username: string[] = [];
        peopleList.forEach(user => {
            username.push(user)
        })
        console.log(username)

       
        return (
            
            <>

                <Label htmlFor={'name'}>Community purpose</Label>
                <TextField id={'name'} defaultValue={this.props.name} onChange={this.onUpdate}/>   
                <PeoplePicker titleText='Owners' context={this.props.context}  defaultSelectedUsers={peopleList}/>

                {/* <AddUsers context={this.props.context} peopleList={...this.props.peopleList} getOwnersCallback={this.handleOwnerMembCallback} /> */}
    
            </>
        );
    }




}
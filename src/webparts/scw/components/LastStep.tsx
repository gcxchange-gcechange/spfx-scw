import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';

import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';
// import AddUsers from './AddUsers';

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

        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const users: any  = this.props.peopleList.map((user) => {
        //     return (
        //         // eslint-disable-next-line dot-notation
        //         users[user]['secondaryText']
        //         );
        //     })
            console.log("LastProps", this.props.peopleList)
            
        return (
            
            <>
                <Label htmlFor={'name'}>Community purpose</Label>
                <TextField id={'name'} defaultValue={this.props.name} onChange={this.onUpdate}/>

                <TextField  defaultValue={this.props.peopleList.toString()} multiline autoAdjustHeight/>
                


               
               {/* <PeoplePicker context={this.props.context}
                defaultSelectedUsers={users}/> */}

                
                

                {/* <AddUsers context={this.props.context} peopleList={...this.props.peopleList} getOwnersCallback={this.handleOwnerMembCallback} /> */}
                {/* <PeoplePicker
                    context={this.props.context} 
                    titleText='Owners'
                    defaultSelectedUsers = {[this.props.context.pageContext.user.email]} //sets the owner of page
                    
                
                /> */}
    
            </>
        );
    }




}
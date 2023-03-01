/* eslint-disable dot-notation */
import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';


export interface ILastStepProps {
    context: WebPartContext;
    name: string;
    memberList: string[];
    ownerList: string[];
    handleCallback?: (name: string) => void;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;

 }
 

export default class FirstStep extends React.Component<ILastStepProps> {

    public constructor(props: ILastStepProps) {
        super(props);
        
    }


    private  onUpdate = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const updatedName = event.target.value;
        
        this.setState({name: updatedName});
        //send it to the parent
        this.props.handleCallback(updatedName)
       
    }

    private updateDefaultOwnerValues = ( username: []):void  => {
        const newValues = username;

        this.setState({ownerList: newValues})

        this.props.getOwnersCallback(newValues)
     
    }

    private updateDefaultMemberValues = ( items: []):void  => {    
        const newValues = items;

        this.setState({memberList: newValues})

        this.props.getMemberCallback(newValues)
     
    }

   



    
    public render(): React.ReactElement<ILastStepProps>{

        const {ownerList, memberList} = this.props
        
       
        return (
            
            <>

                <Label htmlFor={'name'}>Community purpose</Label>
                <TextField id={'name'} defaultValue={this.props.name} onChange={this.onUpdate}/>  
                <AddUsers context={this.props.context} ownerList={ownerList} memberList={memberList} getOwnersCallback={this.updateDefaultOwnerValues}  
                getMemberCallback={this.updateDefaultMemberValues}/>

    
            </>
        );
    }

}
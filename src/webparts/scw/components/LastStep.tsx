/* eslint-disable dot-notation */
import * as React from 'react';
import { Label, TextField } from 'office-ui-fabric-react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';


export interface ILastStepProps {
    context: WebPartContext;
    engName: string;
    memberList: string[];
    ownerList: string[];
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    commClass: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleEngNameCallback?: (engNameValue: string ) => void;
    frNameCallBack?:(frNameValue: string)=> void;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;
    handleFrDescCallback?:(frDescValue: string)=> void;

 }
 

export default class FirstStep extends React.Component<ILastStepProps> {

    public constructor(props: ILastStepProps) {
        super(props);
        
    }


    private  onUpdate = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const updatedName = event.target.value;
        
        this.setState({engName: updatedName});
        //send it to the parent
        this.props.handleEngNameCallback(updatedName);
       
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

        const {ownerList, memberList, engName, frCommName} = this.props
        
        console.log("LASTProps", this.props.engName)
        console.log("LASTFRProps", this.props.frCommName)
        return (
            
            <>

                <Label htmlFor='commPurpose'>Community purpose</Label>
                <TextField id='commPurpose' defaultValue={this.props.commPurpose}/> 

                <Label htmlFor='name'>English community name</Label>
                <TextField id='name' defaultValue={engName} onChange={this.onUpdate}/>  

                <Label htmlFor='FrCommName'>French community name</Label>
                <TextField id='FrCommName' defaultValue={frCommName} />

                <Label htmlFor='shEngDesc'>English description</Label>
                <TextField id='shEngDesc' defaultValue={this.props.shEngDesc} />

                <Label htmlFor='shFrDesc'>French description</Label>
                <TextField id='shFrDesc' defaultValue={this.props.shFrDesc}/>

                <AddUsers context={this.props.context} ownerList={ownerList} memberList={memberList} getOwnersCallback={this.updateDefaultOwnerValues}  
                getMemberCallback={this.updateDefaultMemberValues}/>




    
            </>
        );
    }

}
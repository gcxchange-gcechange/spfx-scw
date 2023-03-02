/* eslint-disable dot-notation */
import * as React from 'react';
import {  Label, TextField  } from 'office-ui-fabric-react';
import {  WebPartContext  } from '@microsoft/sp-webpart-base';
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
    selectedChoice: string;
    
    handleEngNameCallback?: (engNameValue: string ) => void;
    frNameCallBack?:(frNameValue: string)=> void;
    handleFrDescCallback?:(frDescValue: string)=> void;
    handleEngDescCallback?:(engDescValue: string ) => void;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;

  }
 

export default class FirstStep extends React.Component<ILastStepProps> {

    public constructor(props: ILastStepProps) {
        super(props);
        
     }


    private  onUpdateEngName = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updatedName = event.target.value;    
        this.setState({ engName: updatedName });
        //send it to the parent
        this.props.handleEngNameCallback(updatedName); 
     }
    
    private  onUpdateFrName = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updateFrName = event.target.value;
        this.setState({ frCommName: updateFrName });
        //send it to the parent
        this.props.frNameCallBack(updateFrName)    
     }

     private onUpdateEngDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updateEngDesc = event.target.value;
        this.setState({ shEngDesc: updateEngDesc });
        //send it to the parent
        this.props.handleEngDescCallback(updateEngDesc)    
     }

    private  onUpdateFrDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updateFrDesc = event.target.value;
        this.setState({ shFrDesc: updateFrDesc });
        //send it to the parent
        this.props.handleFrDescCallback(updateFrDesc)    
     }

    private updateDefaultOwnerValues = ( username: []):void  => {
        const newValues = username;

        this.setState({ ownerList: newValues })

        this.props.getOwnersCallback(newValues)
     
     }

    private updateDefaultMemberValues = ( items: []):void  => {
        const newValues = items;

        this.setState({ memberList: newValues })

        this.props.getMemberCallback(newValues)
     
     }

   



    
    public render(): React.ReactElement<ILastStepProps> {

        const { ownerList, memberList, engName, frCommName } = this.props
        

        return (
            
            <>

                <Label htmlFor='commPurpose'>Community purpose</Label>
                <TextField id='commPurpose' defaultValue={ this.props.commPurpose }/> 

                <Label htmlFor='name'>English community name</Label>
                <TextField id='name' defaultValue={ engName } onChange={ this.onUpdateEngName }/>  

                <Label htmlFor='FrCommName'>French community name</Label>
                <TextField id='FrCommName' defaultValue={ frCommName } onChange={ this.onUpdateFrName }/>

                <Label htmlFor='shEngDesc'>English description</Label>
                <TextField id='shEngDesc' defaultValue={ this.props.shEngDesc } onChange={ this.onUpdateEngDesc }/>

                <Label htmlFor='shFrDesc'>French description</Label>
                <TextField id='shFrDesc' defaultValue={ this.props.shFrDesc } onChange={ this.onUpdateFrDesc }/>

                <Label htmlFor='classification'>Community classification</Label>
                <TextField id='calssification' value={this.props.selectedChoice}/>

                <AddUsers context={ this.props.context } ownerList={ ownerList } memberList={ memberList } getOwnersCallback={ this.updateDefaultOwnerValues }  
                getMemberCallback={ this.updateDefaultMemberValues }/>

            </>
        );
     }

 }
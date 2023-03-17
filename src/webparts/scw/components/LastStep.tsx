/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import * as React from 'react';
import { IconButton, IIconProps, Label, Stack, TextField  } from 'office-ui-fabric-react';
import {  WebPartContext  } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';
import Callouts from './Callouts';



export interface ILastStepProps { 
    context: WebPartContext;
    engName: string;
    memberList: string[];
    ownerList: string[];
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    selectedChoice: string;
    commPurposeCallback?: (commPurpose: string) => void;
    handleEngNameCallback?: (engNameValue: string ) => void;
    frNameCallBack?:(frNameValue: string)=> void;
    handleFrDescCallback?:(frDescValue: string)=> void;
    handleEngDescCallback?:(engDescValue: string ) => void;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;

  }
export interface ILastStepState {
    showCallout: boolean;
}
 

export default class LastStep extends React.Component<ILastStepProps, ILastStepState> {

    public constructor(props: ILastStepProps) {
        super(props);

        this.state = {
            showCallout: false
        }
        
     }

  
    private  onUpdateCommPurpose = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updatedPurpose = event.target.value.trim();    
        this.props.commPurposeCallback(updatedPurpose); 
     }

    private  onUpdateEngName = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updatedName = event.target.value.trim();    
        this.props.handleEngNameCallback(updatedName); 
     }
    
    private  onUpdateFrName = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updateFrName = event.target.value.trim();
        this.props.frNameCallBack(updateFrName)    
     }

     private onUpdateEngDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updateEngDesc = event.target.value;
        this.props.handleEngDescCallback(updateEngDesc)    
     }

    private  onUpdateFrDesc = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const updateFrDesc = event.target.value.trim();
        this.props.handleFrDescCallback(updateFrDesc)    
     }

    private updateDefaultOwnerValues = ( username: []):void  => {
        const newValues = username;

        this.props.getOwnersCallback(newValues)
     
     }

    private updateDefaultMemberValues = ( items: []):void  => {
        const newValues = items;

        // this.setState({ memberList: newValues })

        this.props.getMemberCallback(newValues)
     
     }
    
    private isCalloutVisible = ():void => {
        this.setState(prevState => ({
            showCallout: !prevState.showCallout
        }))
    }


    
    public render(): React.ReactElement<ILastStepProps> {

        const { ownerList, memberList, engName, frCommName, shEngDesc, shFrDesc, selectedChoice, context } = this.props
        const infoIcon: IIconProps = { iconName: 'UnknownSolid' }; 

        return (
            
            <>
                <p>Review that the information below is accurate, or edit them </p>
                <Stack horizontal horizontalAlign='center'>
                    <Label htmlFor='commPurpose' required >Community purpose </Label>
                    <IconButton id={'callout-button'}iconProps={infoIcon} onClick={this.isCalloutVisible} />
                </Stack>
                <TextField id='commPurpose' defaultValue={ this.props.commPurpose } onChange={this.onUpdateCommPurpose}  onGetErrorMessage={ this.getErrorMessage } /> 
                {this.state.showCallout && <Callouts/> }

                <Label htmlFor='name'required >English community name</Label>
                <TextField id='name' defaultValue={ engName }  onChange={ this.onUpdateEngName } onGetErrorMessage={ this.getErrorMessage }  />  

                <Label htmlFor='FrCommName' required >French community name</Label>
                <TextField id='FrCommName' defaultValue={ frCommName } onChange={ this.onUpdateFrName } onGetErrorMessage={ this.getErrorMessage }/>

                <Label htmlFor='shEngDesc'required >English description</Label>
                <TextField id='shEngDesc' defaultValue={ shEngDesc } onChange={ this.onUpdateEngDesc } onGetErrorMessage={ this.getErrorMessage }/>

                <Label htmlFor='shFrDesc'required >French description</Label>
                <TextField id='shFrDesc' defaultValue={ shFrDesc } onChange={ this.onUpdateFrDesc } onGetErrorMessage={ this.getErrorMessage }/>

                <Label htmlFor='classification'required >Community classification</Label>
                <TextField style={{ background:'#eaeaea'}} id='calssification' value={selectedChoice}/>

                <AddUsers context={ context } ownerList={ ownerList } memberList={ memberList } getOwnersCallback={ this.updateDefaultOwnerValues }  
                getMemberCallback={ this.updateDefaultMemberValues }  />

            </>
        );
     }

     private getErrorMessage = (value: string): string => {

        const trimmedValue = value.trim() === '';

        return trimmedValue ? 'field is required' : '';
      };


 }
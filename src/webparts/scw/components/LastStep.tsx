/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import * as React from 'react';
import { IButtonStyles, IconButton, IIconProps, Label, Stack, TextField  } from 'office-ui-fabric-react';
import {  WebPartContext  } from '@microsoft/sp-webpart-base';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';





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
    showCallout: boolean;
    targetId: string;
    prefLang: string;
    current: number;
    commPurposeCallback?: (commPurpose: string) => void;
    handleEngNameCallback?: (engNameValue: string ) => void;
    frNameCallBack?:(frNameValue: string)=> void;
    handleFrDescCallback?:(frDescValue: string)=> void;
    handleEngDescCallback?:(engDescValue: string ) => void;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;
    isCalloutVisible?: ()=> void;  
    getElementId?: (id: string) => void;
    handleButtonClick?: () => void;



  }


export default class LastStep extends React.Component<ILastStepProps> {

    public constructor(props: ILastStepProps) {
        super(props);

        
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


    public showCalloutVisible = ( event:any ):void => {
        
        const id = event.currentTarget.id;

        this.props.isCalloutVisible();
        this.elementId(id)
    }

    public elementId = (id: string ):void => {
        this.props.getElementId(id)
    }

    public updateDefaultOwnerValues = ( username: []):void  => {   
        
        const newValues = username;

        this.props.getOwnersCallback( newValues );//pass to parent
    };

  
    public updateDefaultMemberValues = ( items: [] ):void  => { 
           const newValues = items;
           
        this.props.getMemberCallback( newValues );//pass to parent
    };

   


    
    public render(): React.ReactElement<ILastStepProps> {


        const { engName, frCommName, shEngDesc, shFrDesc, selectedChoice } = this.props
        
        const infoIcon: IIconProps = { iconName: 'UnknownSolid' }; 

        const iconStyles: IButtonStyles = {
            root: {
                paddingTop: '10px',
            }
        }

        return (
            
            <>
               
                <p>Review that the information below is accurate, or edit them </p>
                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='commPurpose' required >Community purpose </Label>
                    <IconButton ariaLabel="information" id='commPurpose' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='commPurpose' defaultValue={ this.props.commPurpose } onChange={ this.onUpdateCommPurpose }  onGetErrorMessage={ this.getErrorMessage } /> 
                

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='name'required >English community name</Label>
                    <IconButton  ariaLabel="information" id='Engname' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='name' defaultValue={ engName }  onChange={ this.onUpdateEngName } onGetErrorMessage={ this.getErrorMessage }  />  

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='FrCommName' required >French community name</Label>
                    <IconButton  ariaLabel="information" id='FrCommName' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='FrCommName' defaultValue={ frCommName } onChange={ this.onUpdateFrName } onGetErrorMessage={ this.getErrorMessage }/>

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='shEngDesc'required >English description</Label>
                    <IconButton  ariaLabel="information" id='shEngDesc' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='shEngDesc' defaultValue={ shEngDesc } onChange={ this.onUpdateEngDesc } onGetErrorMessage={ this.getErrorMessage }/>

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='shFrDesc'required >French description</Label>
                    <IconButton  ariaLabel="information" id='shFrDesc' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField id='shFrDesc' defaultValue={ shFrDesc } onChange={ this.onUpdateFrDesc } onGetErrorMessage={ this.getErrorMessage }/>

                <Stack horizontal verticalAlign='end'>
                    <Label htmlFor='classification'required >Community classification</Label>
                    <IconButton ariaLabel="information" id='classification' styles={ iconStyles } iconProps={infoIcon} onClick={ this.showCalloutVisible } />
                </Stack>
                <TextField style={{ background:'#eaeaea'}} id='classification' value={selectedChoice}/>



                <Stack horizontal verticalAlign ="end">
                    <Label>Invite Owners</Label>
                    <IconButton id ="owners" styles  = { iconStyles } iconProps = { infoIcon } ariaLabel ="InfoIcon" onClick={this.showCalloutVisible }/>
                </Stack>
                <PeoplePicker
                    context = { this.props.context }
                    required = { true }
                    personSelectionLimit = { 3 }
                    groupName = { "" } // Leave this blank in case you want to filter from all users
                    onChange = { this.updateDefaultOwnerValues }
                    principalTypes = { [ PrincipalType.User ] }
                    showHiddenInUI = {false }
                    resolveDelay = {1000}
                    defaultSelectedUsers  = { this.props.ownerList }
                />

                <Stack horizontal verticalAlign ="end">
                    <Label>Invite Members</Label>
                    <IconButton id ="members" styles  = { iconStyles } iconProps = { infoIcon } ariaLabel ="InfoIcon" onClick={this.showCalloutVisible }/>
                </Stack>
                <PeoplePicker
                    context = { this.props.context }
                    required = { true }
                    personSelectionLimit = { 3 }
                    groupName = { "" } // Leave this blank in case you want to filter from all users
                    onChange = { this.updateDefaultMemberValues }
                    principalTypes = { [ PrincipalType.User ] }
                    showHiddenInUI = {false }
                    resolveDelay = {1000}
                    defaultSelectedUsers  = { this.props.memberList }
                />      

            </>
        );
     }

     private getErrorMessage = (value: string): string => {

        const trimmedValue = value.trim() === '';

        return trimmedValue ? 'field is required' : '';
      };


 }
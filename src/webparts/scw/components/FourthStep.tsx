/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';
 



export interface IFourthStepProps  {
    context: WebPartContext;
    ownerList: string[];
    // memberList: string[];
    prefLang: string;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;
    requestor: string;
    invalidEmail: string;
   
 }

 export interface IPerson {
    displayName: string;
    email: string;
    userPrincipalName: string;
 }
 

export default class FourthStep extends React.Component<IFourthStepProps> {
    
    public strings = SelectLanguage(this.props.prefLang);
   

    constructor(props: IFourthStepProps) {
        super(props);
            
        }

      
    //update state in parent 
    public handleOwnerCallback = (items: []): void => {
        console.log('4', items)
        // this.setState({ 
        //     ownerList: items
        // }) ; 

        this.props.getOwnersCallback(items)
    }

    // public handleMemberCallback = (items: []): void => {
    //     this.setState({ 
    //         memberList: items
    //     }) ; 

    //     this.props.getMemberCallback(items)
    // }

    
    
    
    
    public render(): React.ReactElement<IFourthStepProps>  {

        // const buttonStyles: IButtonStyles = {
            
        //     root: {
        //         color: '#004db8',
        //         backgroundColor: '#c0c0cc',
        //         borderColor: '#c0c0cc'
        //     },

        //     rootHovered: {
        //         color: '#4096ff',
        //         background: '#c0c0cc',
        //         borderColor: '#4096ff'
        //     },
            
        //     label: {
        //         fontWeight: 'normal'
        //     }
        // }


        return (
            <>
    
                <p>{ this.strings.invite_owners_para1 }</p>
                <p>{ parse( this.strings.invite_owners_para2 ) }</p>
              
                    <div id="peoplePicker">
                        <AddUsers 
                        id={'owners'}
                        title={this.strings.invite_owners_label}
                        instructions = { this.strings.owners_Instruction}
                        aria-describedby="owners"
                        prefLang={this.props.prefLang}
                        context={this.props.context} 
                        ownerList={this.props.ownerList}
                        getOwnersCallback={this.handleOwnerCallback} 
                        requestor={this.props.requestor}
                        invalidEmail={this.props.invalidEmail}
                        
                        />
                    </div>
            
                    
            </>
        );
    }





}
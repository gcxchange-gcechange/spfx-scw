import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';




export interface IFourthStepProps  {
    context: WebPartContext;
    ownerList: string[];
    memberList: string[];
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;
 }

 export interface IPerson {
    displayName: string;
    email: string;
    userPrincipalName: string;
 }
 

export default class FourthStep extends React.Component<IFourthStepProps> {
   

    constructor(props: IFourthStepProps) {
        super(props);
            
        }

      
    //update state in parent 
    public handleOwnerCallback = (items: []): void => {
        this.setState({ 
            ownerList: items
        }) ; 

        this.props.getOwnersCallback(items)
    }

    public handleMemberCallback = (items: []): void => {
        this.setState({ 
            memberList: items
        }) ; 

        this.props.getMemberCallback(items)
    }

      
    

    public render(): React.ReactElement<IFourthStepProps>  {


        return (
            <>

                <p>As as GCXchange owner you can modify your community and invite other users to your community, so they can caollaborate with your in Microsoft Teams.</p>
                <p>We need to <strong>add at least one more owner</strong> before your community can be created.</p>
                <p>You can <strong>add members</strong> to your GXChange community before it goes live. You can only add individuals who <strong>already have a GCXchange account.</strong> If an 
                individual {`doesn't`}  have an account, you can invite them to sign up below. If you {`don't`} want to invite members just yet, no problem. We will provide detailed instructions on how
                to do this once your community has been created.</p>
                
                <AddUsers 
                context={this.props.context} 
                ownerList={this.props.ownerList} 
                memberList={this.props.memberList} 
                getOwnersCallback={this.handleOwnerCallback} 
                getMemberCallback={this.handleMemberCallback}
                />
            </>
        );
    }



      

}
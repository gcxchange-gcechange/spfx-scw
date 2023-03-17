/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';
import styles from './Scw.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IButtonStyles, PrimaryButton, Stack } from 'office-ui-fabric-react';




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

        const buttonStyles: IButtonStyles = {
            
            root: {
                color: '#004db8',
                backgroundColor: '#c0c0cc',
                borderColor: '#c0c0cc'
            },

            rootHovered: {
                color: '#4096ff',
                background: '#c0c0cc',
                borderColor: '#4096ff'
            },
            
            label: {
                fontWeight: 'normal'
            }
        }


        return (
            <>

                <p>As as GCXchange owner you can modify your community and invite other users to your community, so they can caollaborate with your in Microsoft Teams.</p>
                <p>We need to <strong>add at least one more owner</strong> before your community can be created.</p>
                <p>You can <strong>add members</strong> to your GXChange community before it goes live. You can only add individuals who <strong>already have a GCXchange account.</strong> If an 
                individual {`doesn't`}  have an account, you can invite them to sign up below. If you {`don't`} want to invite members just yet, no problem. We will provide detailed instructions on how
                to do this once your community has been created. Please note, users <strong>cannot</strong> request to join a protected community, so it is up to the owner to make sure they have invited all members.</p>
                
                <AddUsers 
                context={this.props.context} 
                ownerList={this.props.ownerList}
                memberList={this.props.memberList} 
                getOwnersCallback={this.handleOwnerCallback} 
                getMemberCallback={this.handleMemberCallback}
                />


                <div className={styles.inviteContainer}>
                    
                    <Stack horizontal>
                        <Stack.Item align='center'>
                            <Icon iconName='Zoom' className={styles.magnifyingIcon}/>
                        </Stack.Item>
                        <Stack.Item align='center'>
                            <p><strong>Can't find someone?</strong> It's likely they haven't registered yet fort GCXhange.You can invite them to join GCXchange using the button below. Once they are registered, 
                            you will be able to add them to your community.</p>
                        </Stack.Item>
                        </Stack>
                        <Stack>
                        <Stack.Item>
                            <PrimaryButton styles={ buttonStyles } >Invite a colleague to GCXchange</PrimaryButton>
                        </Stack.Item>
                    </Stack>
                </div>
            </>
        );
    }



      

}
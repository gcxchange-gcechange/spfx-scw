import * as React from 'react';
import {Label, TextField} from 'office-ui-fabric-react';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { GraphError } from '@microsoft/microsoft-graph-clientv1';



export interface IFourthStepProps  {
    context?: WebPartContext,
    handleCallback?: (name: string) => void;
 }
 
 export interface IFourthStepState {
    users: MicrosoftGraph.User[];
 }

 export interface  IUserItem {
    displayName: string;
    email: string;
    userPrincipalName: string;
 }

 const fakeUsers : Array<IUserItem>= [
    {displayName: "Gaby", email: 'email1@gmail.com', userPrincipalName: 'email1@gmail.com'}
 ]



export default class FourthStep extends React.Component<IFourthStepProps, IFourthStepState> {

    public add = async (): Promise<void> => {
       
        try {
            const client: MSGraphClientV3 = await this.context.msGraphClientFactory.getClient("3");
             client
             .api('/users/')
             .get((error: GraphError, response: MicrosoftGraph.User, rawResponse: unknown ) => {
                console.log(response);
             })
            }

        catch(error: unknown) {
            console.error(error);
        }
    }


    public render(): React.ReactElement<IFourthStepProps>  {

        // function people(filter: string, selectedItems?: IPersonaProps[]): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
        //     throw new Error('Function not implemented.');
        // }

        return (
            <>
            <Label>Invite owners</Label>
            <TextField onChange={this.add}/>
            {fakeUsers.map(items => items.displayName)}
            {/* <NormalPeoplePicker onResolveSuggestions={people}/> */}

            
            </>
        );
    }

}
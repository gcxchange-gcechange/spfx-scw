import * as React from 'react';
import {IBasePickerSuggestionsProps, IPersonaProps, Label} from 'office-ui-fabric-react';
// import { MSGraphClientV3 } from '@microsoft/sp-http';
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
// import { GraphError } from '@microsoft/microsoft-graph-clientv1';

import { NormalPeoplePicker} from '@fluentui/react/lib/Pickers';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';



export interface IFourthStepProps  {
    context: WebPartContext;
    people?: IPerson[];
    handleCallback?: (name: string) => void;
 }

 export interface IPerson {
    displayName: string;
    email: string;
    userPrincipalName: string;
 }
 
 export interface IFourthStepState {
    peopleList: IPersonaProps[];
    currentSelectedItems?: IPersonaProps[];
    user: [];
 }




export default class FourthStep extends React.Component<IFourthStepProps, IFourthStepState> {

    constructor(props: IFourthStepProps, state: IFourthStepState) {
        super(props);
            this.state = {
                peopleList: [],
                currentSelectedItems: [],
                user: []
            }


        }



      public _getPeoplePickerItems = (item: IPersonaProps[]):void => {
        this.setState({
            peopleList: item
        });
      };
      


    public render(): React.ReactElement<IFourthStepProps>  {


        return (
            <>
            <Label>Invite owners</Label>
            {/* <TextField onChange={this.add}/> */}

            <PeoplePicker
            context={this.props.context}
            titleText="People Picker"
            personSelectionLimit={3}
            groupName={""} // Leave this blank in case you want to filter from all users
            onChange={this._getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} 
            />

            </>
        );
    }



      

}
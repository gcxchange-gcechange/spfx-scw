import * as React from 'react';
// import {IPersonaProps} from 'office-ui-fabric-react';
// import { MSGraphClientV3 } from '@microsoft/sp-http';
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
// import { GraphError } from '@microsoft/microsoft-graph-clientv1';

// import { NormalPeoplePicker} from '@fluentui/react/lib/Pickers';
// import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';




export interface IFourthStepProps  {
    context: WebPartContext;
    peopleList: string[];
    getOwnersCallback?: (item: []) => void;
 }

 export interface IPerson {
    displayName: string;
    email: string;
    userPrincipalName: string;
 }
 
 export interface IFourthStepState {
 
 }




export default class FourthStep extends React.Component<IFourthStepProps, IFourthStepState> {
   

    constructor(props: IFourthStepProps, state: IFourthStepState) {
        super(props);
            // this.state = {
            //     peopleList: [],
            //     currentSelectedItems: [],
            //     user: []
            // }
        }



    //   public _getPeoplePickerItems = (items: []):void => {
        
    //     console.log("Items", items)

        
    //     this.setState({
    //         peopleList: items
    //     });
       
    //     this.props.getOwnersCallback(items);
    //   };

    public handleOwnerMembCallback = (items: []): void => {
        // localStorage.setItem('name', name);

        // eslint-disable-next-line dot-notation
        const values = items.map(item => items[item]['id']);


     console.log("FourthStepItems", items)
    
        this.setState({ 
            peopleList: values
        }) ; 

        this.props.getOwnersCallback(items)
    }

      
      


    public render(): React.ReactElement<IFourthStepProps>  {


        return (
            <>
            <AddUsers context={this.props.context} peopleList={this.props.peopleList} getOwnersCallback={this.handleOwnerMembCallback} />
            {/* <PeoplePicker
            context={this.props.context}
            titleText="Invite Owners"
            required={true}
            personSelectionLimit={3}
            groupName={""} // Leave this blank in case you want to filter from all users
            onChange={this._getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} 
            defaultSelectedUsers = {[this.props.context.pageContext.user.email]} //sets the owner of page
          
          
            /> */}

            </>
        );
    }



      

}
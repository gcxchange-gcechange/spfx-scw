import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import * as React from "react";


export interface IAddUsersProps {
    context: WebPartContext;
    ownerList: string[];
    memberList: string[];
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;
}

export default class AUsers extends React.Component<IAddUsersProps> {

    constructor(props: IAddUsersProps) {
        super(props);
    }

public _getOwnerItems = (items: []):void => {   
    this.setState({
        ownerList: items
    });
   
    this.props.getOwnersCallback(items);//pass to parent
  };

  
  public _getMemberItems = (items: []):void => {
    this.setState({    
        memberList: items
    });
   
    this.props.getMemberCallback(items);//pass to parent
  };


    public render(): React.ReactElement<IAddUsersProps>  {


        return(

            <> 
                <PeoplePicker
                    context={this.props.context}
                    titleText="Invite Owners"
                    required={true}
                    personSelectionLimit={3}
                    groupName={""} // Leave this blank in case you want to filter from all users
                    onChange={this._getOwnerItems}
                    principalTypes={[PrincipalType.User]}
                    showHiddenInUI={false}
                    resolveDelay={1000}
                    defaultSelectedUsers = {this.props.ownerList}
                />

                <PeoplePicker
                    context={this.props.context}
                    titleText="Invite Members"
                    required={true}
                    personSelectionLimit={1000}
                    groupName={""} // Leave this blank in case you want to filter from all users
                    onChange={this._getMemberItems}
                    principalTypes={[PrincipalType.User]}
                    showHiddenInUI={false}
                    resolveDelay={1000}
                    defaultSelectedUsers = {this.props.memberList} 
                />
            </>
        );

    }

}
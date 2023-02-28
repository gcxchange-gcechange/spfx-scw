import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PeoplePicker } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import * as React from "react";


export interface IAddUsersProps {
    context: WebPartContext;
    peopleList: string[];
    getOwnersCallback?: (item: []) => void;
}

export default class AUsers extends React.Component<IAddUsersProps> {

    constructor(props: IAddUsersProps) {
        super(props);
    }

public _getPeoplePickerItems = (items: []):void => {
    console.log("Items", items);
   
    this.setState({
        peopleList: items
    });
   
    this.props.getOwnersCallback(items);
  };



    public render(): React.ReactElement<IAddUsersProps>  {

        console.log(this.props.peopleList);

        return(

            <> 
                <PeoplePicker
                context={this.props.context}
                titleText="Owners"
                required={true}
                personSelectionLimit={3}
                groupName={""} // Leave this blank in case you want to filter from all users
                onChange={this._getPeoplePickerItems}
                showHiddenInUI={false}
                resolveDelay={1000}
                defaultSelectedUsers = {this.props.peopleList} //sets the owner of page
                />
            </>
        );

    }

}
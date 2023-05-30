/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DirectionalHint } from "office-ui-fabric-react";
import * as React from "react";
import { SelectLanguage } from './SelectLanguage';



export interface IAddUsersProps {
    context: WebPartContext;
    ownerList: string[];
    // memberList: string[];
    prefLang: string;
    getOwnersCallback?: ( item: [] )  => void;
    // getMemberCallback?: ( item: [] )  => void;
    handleButtonClick? :(event: any) => void;

}

export default class AUsers extends React.Component<IAddUsersProps> {
    public strings = SelectLanguage( this.props.prefLang );
 
    constructor( props: IAddUsersProps ) {
        super( props );
    }

    public _getOwnerItems = ( items: []):void  => {   
        this.setState({
            ownerList: items
        });
   
        this.props.getOwnersCallback( items );//pass to parent
    };

  
    // public _getMemberItems = ( items: [] ):void  => {
    //     this.setState({    
    //         memberList: items
    // });
   
    //     this.props.getMemberCallback( items );//pass to parent
    // };




    public render(): React.ReactElement<IAddUsersProps>  {



        return(

            <> 
               
                <PeoplePicker
                    context = { this.props.context }
                    required = { true }
                    titleText ={`${ this.strings.invite_owners}`}
                    personSelectionLimit = { 3 }
                    groupName = { "" } // Leave this blank in case you want to filter from all users
                    onChange = { this._getOwnerItems }
                    principalTypes = { [ PrincipalType.User ] }
                    showHiddenInUI = {false }
                    resolveDelay = {1000}
                    defaultSelectedUsers  = { this.props.ownerList }
                    showtooltip = { true }
                    tooltipMessage = { `${ this.strings.owners_Instruction}`}
                    tooltipDirectional  = { DirectionalHint.topCenter }
                />

{/* 
                <PeoplePicker
                    context = { this.props.context }
                    titleText ={`${ this.strings.invite_members}`}
                    personSelectionLimit = { 1000 }
                    groupName = { "" } // Leave this blank in case you want to filter from all users
                    onChange = { this._getMemberItems}
                    principalTypes = { [ PrincipalType.User ] }
                    showHiddenInUI = { false }
                    resolveDelay = { 1000 }
                    defaultSelectedUsers  = { this.props.memberList } 
                    showtooltip = { true }
                    tooltipMessage = { `${ this.strings.owners_Instruction}` }
                    tooltipDirectional  = { DirectionalHint.topCenter }
                /> */}
            </>
        );

    }

}
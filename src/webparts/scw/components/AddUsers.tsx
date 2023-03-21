/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DirectionalHint } from "office-ui-fabric-react";
import * as React from "react";
import { SelectLanguage } from './SelectLanguage';



export interface IAddUsersProps {
    context: WebPartContext;
    ownerList: string[];
    memberList: string[];
    prefLang: string;
    current: number;
    getOwnersCallback?: ( item: [] )  => void;
    getMemberCallback?: ( item: [] )  => void;
    isCalloutVisible?: () => void;  
    getElementId?: ( id: string )  => void;
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

  
    public _getMemberItems = ( items: [] ):void  => {
        this.setState({    
            memberList: items
    });
   
        this.props.getMemberCallback( items );//pass to parent
    };

  public showCalloutVisible = ( event:any ):void  => {
        console.log("clicked ")
    const id = event.currentTarget.id;


    this.props.isCalloutVisible();
    this.elementId( id )
}

    public elementId = ( id: string ):void  => {
        this.props.getElementId( id )
}


    public render(): React.ReactElement<IAddUsersProps>  {

        // const infoIcon: IIconProps = { iconName: 'UnknownSolid' }; 

        // const iconStyles: IButtonStyles = {
        //     root: {
        //         paddingTop: '10px'
        //     }
        // }


        return(

            <> 
                {/* <Stack horizontal verticalAlign ="end">
                    <Label>Invite Owners</Label>
                    { this.props.current  === 4 && <IconButton id =" owners " styles  = { iconStyles } iconProps = { infoIcon } ariaLabel ="InfoIcon" onClick = {this.showCalloutVisible}/>}  
                </Stack> */}
                <PeoplePicker
                    context = { this.props.context }
                    required = { true }
                    titleText ="Invite Owners"
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


                <PeoplePicker
                    context = { this.props.context }
                    titleText ="Invite Members"
                    personSelectionLimit = { 1000 }
                    groupName = { "" } // Leave this blank in case you want to filter from all users
                    onChange = { this._getMemberItems}
                    principalTypes = { [ PrincipalType.User ] }
                    showHiddenInUI = { false }
                    resolveDelay = { 1000 }
                    defaultSelectedUsers  = { this.props.memberList } 
                    showtooltip = { true }
                    tooltipMessage = { `${ this.strings.owners_Instruction}` }
                    tooltipDirectional  = { DirectionalHint.rightCenter }
                />
            </>
        );

    }

}
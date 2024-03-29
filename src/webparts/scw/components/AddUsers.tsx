/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {  IButtonStyles, IIconProps, IconButton, Label, Stack } from "office-ui-fabric-react";
import * as React from "react";
import { SelectLanguage } from './SelectLanguage';
import styles from "./Scw.module.scss";





export interface IAddUsersProps {
    id: string;
    context: any;
    ownerList: string[];
    lineId?: string ;
    instructions?: string;
    title:string;
    currentPage?: number;
    prefLang: string;
    requestor?: string;
    invalidEmail: string;
    getOwnersCallback?: ( item: [] )  => void;
    handleButtonClick? :(event: any) => void;
    showCalloutVisible?:(event: any ) => void ;
    infoButton?: string;
    

}

export default class AUsers extends React.Component<IAddUsersProps> {
     
    public strings = SelectLanguage( this.props.prefLang );
    
 
 
    constructor( props: IAddUsersProps, ) {
        super( props );

        this.state = {
            ownerList: this.props.ownerList
        }
    }

    public _getOwnerItems = ( items: []):void  => {  

        this.props.getOwnersCallback(items);

    };


    public render(): React.ReactElement<IAddUsersProps>  {


        const currentUser = this.props.requestor; // Adjust this based on the actual structure of your context
        console.log("CurrentUser",currentUser)

        const iconStyles: IButtonStyles = {
            root: {
                paddingTop: '10px',
            }
        }

        const infoIcon: IIconProps = { iconName: 'UnknownSolid' };     
        


        return(

            <> 
                <div id={this.props.id} tabIndex={0}>
                    <Stack>
                        <Label htmlFor={this.props.id} style={{fontWeight:'700'}} aria-required={true}>
                            <span className={styles.asterik} aria-label={this.strings.required} >
                                *
                            </span>
                            {this.props.title}
                            {this.props.currentPage === 2 && 
                            (<span>
                                <IconButton ariaLabel={this.props.infoButton} id={this.props.id} styles={ iconStyles } iconProps={infoIcon} onClick={this.props.showCalloutVisible}/>
                            </span>
                            )
                            }
                        </Label>
                            <p className={styles.instruction} >
                                {this.props.instructions}
                            </p>
                    </Stack>
                
                    <PeoplePicker
                        errorMessageClassName={styles.ownerError}
                        context = { this.props.context }
                        required = { true }
                        personSelectionLimit = { 99 }
                        groupName = { "" } // Leave this blank in case you want to filter from all users
                        onChange = { this._getOwnerItems }
                        principalTypes = { [ PrincipalType.User ] }
                        resolveDelay = {1000}
                        defaultSelectedUsers  = { this.props.ownerList}
                        ensureUser={ true }
                        allowUnvalidated={ true }
                    />

                </div>
            </>
        );

    }

}
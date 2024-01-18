/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import AddUsers from './AddUsers';
import styles from './Scw.module.scss';
// import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';
 



export interface IFourthStepProps  {
    context: WebPartContext;
    ownerList: string[];
    prefLang: string;
    getOwnersCallback?: (item: []) => void;
    getMemberCallback?: (item: []) => void;
   
 }

 export interface IPerson {
    displayName: string;
    email: string;
    userPrincipalName: string;
 }
 

export default class FourthStep extends React.Component<IFourthStepProps> {
    
    public strings = SelectLanguage(this.props.prefLang);
   

    constructor(props: IFourthStepProps) {
        super(props);
            
        }

      
    //update state in parent 
    public handleOwnerCallback = (items: []): void => {

        this.props.getOwnersCallback(items)
    }
  
    
    public render(): React.ReactElement<IFourthStepProps>  {

        return (
            <>
    
                    <p>{ this.strings.invite_owners_para1 }</p>
                    <p>{ parse( this.strings.invite_owners_para2 ) }</p>
                    <div tabIndex={1}>
                        <div>
                            <Label  htmlFor="peoplePicker">
                                <span className={styles.asterik}  aria-label='required'>*</span>
                                {this.strings.invite_owners_label}
                            </Label>
                            <p id='ownerInstructions' className={ styles.instruction }>{ this.strings.owners_Instruction}</p>
                        
                        
                            <div id="peoplePicker">
                                <AddUsers 
                                aria-describedby="ownerInstructions"
                                prefLang={this.props.prefLang}
                                context={this.props.context} 
                                ownerList={this.props.ownerList}
                                getOwnersCallback={this.handleOwnerCallback} 
                                />

                            </div>
                        </div>
                    </div>
            </>
        );
    }


}
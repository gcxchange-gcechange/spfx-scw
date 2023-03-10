/* eslint-disable react/no-unescaped-entities */
/* eslint-disable dot-notation */
import { Checkbox, ICheckboxStyles, IStackStyles, Label, Stack, StackItem } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './Scw.module.scss';



export interface IThirdStepProps { 
    checkedValues: boolean[];
    checkedTerms?:( checked: boolean ) => void; 
  }
 

export default class ThirdStep extends React.Component<IThirdStepProps> {

    public constructor(props: IThirdStepProps) {
        super(props);
        
    }

    private onChange = ( event: React.ChangeEvent<HTMLInputElement>, isChecked:boolean ): void => {
        this.props.checkedTerms( isChecked )
    }
    
    
    public render(): React.ReactElement<IThirdStepProps> {

        const stackTokens = { childrenGap: 15 }

        const stackStyles: IStackStyles = {
            root: {
                border: '1px solid rgb(96,94,92,.5)',
                borderRadius: '5px',
                padding: '10px',
                margin: '0px, 30px'
            },
        };

        const checkBoxStyles: ICheckboxStyles = {
           text: {
            marginLeft:'20px'
           }
        };

    
        return (
            
            <>
                <p>Looks like you need a space to store protected documents and information on GCXchange. We have a few terms of use for protected communities.</p>
                <p>The security of documents is the responsability of all members on GCXchange, including yourself. We ask that you review your departmental security guidelines
                    to make sure youy are familiar with your responsabilities and so that you can inform your members about their responsabilities, before agreeing to the terms of use below.
                </p>
                <Label required>I agree to the terms of use below</Label>
                <Stack tokens = { stackTokens } styles={ stackStyles }>
                    <StackItem>
                        <Checkbox  styles={checkBoxStyles} label='Protected communities are only visible to members that have been invited by the communitys owner.' onChange={ this.onChange } defaultChecked={this.props.checkedValues[0]} />
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>I understand that my community will only be visible to members.</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox label='All members of a protected community must have a governement-issued phone with the Microsoft Authenticator app enabled.' onChange={ this.onChange } defaultChecked={this.props.checkedValues[1]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>I understand that my community members must meet these requirements to access my community.</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox label='All members must use a government-issued devide and have MyKey activated to access a protected B community.' onChange={ this.onChange } defaultChecked={this.props.checkedValues[2]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>I understand that my community members must meet these requirements to access my community. </strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox label='Users must have a reliability clearance to access a protected space and a need to know the information stored within.' onChange={ this.onChange } defaultChecked={this.props.checkedValues[3]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>I understand that my community members must meet these requirements to access my community. </strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox label='We cant guarantee timely support for classified communities. Our Support Team doesnt have direct access to these sites until they are added as members.' onChange={ this.onChange } defaultChecked={this.props.checkedValues[4]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>I agree to limited access to GCXchange support.</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox label='Only users with a need to know protected information should be included in a community. When a member changes roles this need to know changes too.' onChange={ this.onChange } defaultChecked={this.props.checkedValues[5]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>I will regularly review membership on my community and remove members who have changed roles</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox label='GCXchange has a retention policy of 2 years for all documents and should only be used to store transitory information.' onChange={ this.onChange } defaultChecked={this.props.checkedValues[6]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>I agree to back up my community documents on my department's official repository if they contain information of business value.</strong></p>
                    </StackItem>
                </Stack>
              
            </>
        );
     }

 }
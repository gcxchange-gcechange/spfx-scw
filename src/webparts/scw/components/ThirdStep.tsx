/* eslint-disable dot-notation */
import { Checkbox, IStackStyles, Label, Stack } from 'office-ui-fabric-react';
import * as React from 'react';



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
              border: '1px solid gray',
              borderRadius: '5px',
              padding: '10px'
            },
          };
          

        return (
            
            <>
                <p>Looks like you need a space to store protected documents and information on GCXchange. We have a few terms of use for protected communities.</p>
                <p>The security of documents is the responsability of all members on GCXchange, including yourself. We ask that you review your departmental security guidelines
                    to make sure youy are familiar with your responsabilities and so that you can inform your members about their responsabilities, before agreeing to the terms of use below.
                </p>
                <Label required>I agree to the terms of use below</Label>
                <Stack tokens = { stackTokens } styles={stackStyles}>
                    <Checkbox label='Protected communities are only visible to members that have been invited by the communitys owner.' onChange={ this.onChange }/>
                    <Checkbox label='All members of a protected community must have a governement-issued phone with the Microsoft Authenticator app enabled.' onChange={ this.onChange }/>
                    <Checkbox label='All members must use a government-issued devide and have MyKey activated to access a protected B community.' onChange={ this.onChange }/>
                    <Checkbox label='Users must have a reliability clearance to access a protected space and a need to know the information stored within.' onChange={ this.onChange }/>
                    <Checkbox label='We cant guarantee timely support for classified communities. Our Support Team doesnt have direct access to these sites until they are added as members.' onChange={ this.onChange }/>
                    <Checkbox label='Only users with a need to know protected information should be included in a community. When a member changes roles this need to know changes too.' onChange={ this.onChange }/>
                    <Checkbox label='GCXchange has a retention policy of 2 years for all documents and should only be used to store transitory information.' onChange={ this.onChange }/>
                </Stack>
              
            </>
        );
     }

 }
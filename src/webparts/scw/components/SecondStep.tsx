/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as React from 'react';





export interface ISecondStepProps  { 
    selectedChoice: string;
    handleSelectedChoice?: (selectedChoice: string) => void;


}

export interface ISecondStepState  { 
  
}



export default class SecondStep extends React.Component<ISecondStepProps, ISecondStepState>  { 


    public constructor(props: ISecondStepProps, state: ISecondStepState)  { 
        super(props);

     

    }


    public render(): React.ReactElement<ISecondStepProps>  { 

        const templateChoice: IChoiceGroupOption[] = [
             { key: '1', text: 'Unclassified community', ariaLabel: 'Unclassified community' },
             { key: '2', text:'Protected Aor B community', ariaLabel: 'Protected Aor B community' }
        ]

       
        return (
            <>
            <ChoiceGroup options={templateChoice} required={true} onChange={this.onSelectedKey}/>
        
            </>
        );
    }

    private onSelectedKey = ( event: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption):void => {
        event.preventDefault();
        this.setState({
            selectedChoice: option.text
        })
        this.props.handleSelectedChoice(option.text)
    }





}

 


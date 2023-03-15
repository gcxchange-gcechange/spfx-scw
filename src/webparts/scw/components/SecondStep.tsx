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
             { key: 'unclassified', text: 'Unclassified community', ariaLabel: 'Unclassified community' },
             { key: 'Protected Aor B community', text:'Protected A or B community', ariaLabel: 'Protected A or B community' }
        ]

       
        return (
            <>
            <ChoiceGroup options={templateChoice} required={true} onChange={this.onSelectedKey} defaultSelectedKey={this.props.selectedChoice} />
        
            </>
        );
    }

    private onSelectedKey = ( event: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption):void => {
        console.log("Choice", option.text);
        // event.preventDefault();
        this.setState({
            selectedChoice: option.key
        })
        this.props.handleSelectedChoice(option.key)
    }





}

 


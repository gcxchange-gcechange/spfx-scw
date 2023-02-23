import { CompactPeoplePicker, IPersonaProps } from 'office-ui-fabric-react';
import * as React from 'react';



export interface IFourthStepProps  {
    handleCallback?: (name: string) => void;
 }
 
 export interface IFourthStepState {
  
 }

export default class FourthStep extends React.Component<IFourthStepProps, IFourthStepState> {

    public render(): React.ReactElement<IFourthStepProps>  {
        return (
            <>
            <CompactPeoplePicker onResolveSuggestions={function (filter: string, selectedItems?: IPersonaProps[]): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
                    throw new Error('Function not implemented.');
                } }/>

            
            </>
        );
    }

}
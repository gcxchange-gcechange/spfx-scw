import * as React from 'react';

export interface IEightStepProps {
    name: string;
    handleCallback?: (name: string) => void;
 }
 
 export interface IEightStepState {
     name: string;
 }



export default class FirstStep extends React.Component<IEightStepProps, IEightStepState> {

    public constructor(props: IEightStepProps, state: IEightStepProps) {
        super(props);
            this.state = {
            name: ''
        }
    }
    
    public render(): React.ReactElement<IEightStepProps>{
        return (
            <div>Hello</div>
        );
    }




}
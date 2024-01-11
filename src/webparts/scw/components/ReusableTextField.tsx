/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {  TextField} from 'office-ui-fabric-react';

export interface IReusableTextFieldProps {
    id: string;
    name: string;
    styles: any;
    multiline: boolean;
    rows: number;
    description: string;
    defaultValue: string;
    validateOnLoad: boolean;
    maxLength: number;
    //onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
    onGetErrorMessage?: (value: string ) => string | JSX.Element | undefined;
    handleOnChange?:(event:any, value: string) => void;
    

}



export default class ReausableTextField extends React.Component<IReusableTextFieldProps> {

    constructor(props: IReusableTextFieldProps) {
        super(props);

    }

    private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const eventName = event.target.name;
        const value = event.target.value;
        const trimmedValue = value.trim();

        console.log("child_eventname_laststep", eventName);
        console.log("child_eventname_laststep", value);
    
        try {
          this.props.handleOnChange(eventName, trimmedValue);
        } catch (error) {
          console.log(error);
        }
    };



    public render() {

        return (
            <TextField
               {...this.props}
               onChange={this.onhandleChangeEvent}
            />
        )

        }
}

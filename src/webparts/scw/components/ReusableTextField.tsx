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
    onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
    onGetErrorMessage?: (value: string ) => string | JSX.Element | undefined;
    

}



export default class ReausableTextField extends React.Component<IReusableTextFieldProps> {

    constructor(props: IReusableTextFieldProps) {
        super(props);

    }


    public render() {

        return (
            <TextField
               {...this.props}
            />
        )

        }
}

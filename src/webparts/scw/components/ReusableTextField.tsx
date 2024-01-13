/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {  Label, Stack, TextField} from 'office-ui-fabric-react';
import styles from './Scw.module.scss';

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
    handleOnChange?:(event:any, value: string) => void;
    instructions?: string;
    title:string;
    lineId?: string;
    
}



export default class ReausableTextField extends React.Component<IReusableTextFieldProps> {

    constructor(props: IReusableTextFieldProps) {
        super(props);

    }

 


    public render() {

        return (
            <div id={this.props.lineId}>
                <Stack>
                    <Label>
                        <span className={styles.asterik} aria-label={''}>
                            *
                        </span>
                        {this.props.title}
                    </Label>
                        <p id={this.props.id} className={styles.instruction}>
                            {this.props.instructions}
                        </p>
                </Stack>
                <TextField
                   {...this.props}
                />
            </div>
        )

        }
}

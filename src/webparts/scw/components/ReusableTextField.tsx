/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {  TextField} from 'office-ui-fabric-react';
//import styles from './Scw.module.scss';

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
    
    
    // handleOnChange?:(event: string, value: string)=> void;
    // handleErrorMessage?: (errorMessage: string) => void;

}



export default class ReausableTextField extends React.Component<IReusableTextFieldProps> {

    constructor(props: IReusableTextFieldProps) {
        super(props);

    }

    // private validateInput = (value: string): JSX.Element  => {
    //     const trimmedValue = value.trim();
    
    //     if (trimmedValue.length >= 1 && trimmedValue.length < 5) {
    //       return (
    //         <Stack horizontal horizontalAlign="center">
    //           <Icon iconName="AlertSolid" className={styles.errorIcon} />
    //           <p className={styles.fieldInstruction}>
    //             {"less than 5"}
    //           </p>
    //         </Stack>
    //       );
    //     } else if (trimmedValue.length === 0) {
    //       return (
    //         <Stack horizontal horizontalAlign="center">
    //           <Icon iconName="AlertSolid" className={styles.errorIcon} />
    //           <p className={styles.fieldInstruction}>{"blank"}</p>
    //         </Stack>
    //       );
    //     } else {
    //       return null;
    //     }
    //   };


    public render() {

        return (
            <TextField
               {...this.props}

            //   onGetErrorMessage={this.props.onGetErrorMessage}
            />
        )

        }
}

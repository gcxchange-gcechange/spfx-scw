/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {  IButtonStyles, IIconProps, IconButton, Label, Stack, TextField} from 'office-ui-fabric-react';
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
    currentPage?: number;
    showCalloutVisible?:(event: any ) => void ;
    getElementId?:(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
    targetId?:string;
}



export default class ReausableTextField extends React.Component<IReusableTextFieldProps> {

    constructor(props: IReusableTextFieldProps) {
        super(props);

    }

    

 


    public render() {

        const infoIcon: IIconProps = { iconName: 'UnknownSolid' }; 

        const iconStyles: IButtonStyles = {
            root: {
                paddingTop: '10px',
            }
        }

        return (
            <div id={this.props.lineId} style={{marginBottom: '10px'}}>
                <Stack>
                    <Label>
                        <span className={styles.asterik} aria-label={''}>
                            *
                        </span>
                        {this.props.title}
                        {this.props.currentPage === 2 && 
                        (<span><IconButton id={this.props.id} styles={ iconStyles } iconProps={infoIcon} onClick={this.props.showCalloutVisible}/></span>)
                        }
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

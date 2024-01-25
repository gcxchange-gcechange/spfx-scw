/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {  IButtonStyles, IIconProps,  IconButton, Label, Stack, TextField} from 'office-ui-fabric-react';
import styles from './Scw.module.scss';
 


export interface IReusableTextFieldProps {
    id: string;
    name: string;
    styles: any;
    multiline: boolean;
    rows: number;
    description?: string;
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
    ariaLabelRequired:string;
    label?:string;
    charCountId: string;
    blankFieldText?: string;
    errorId?: string;
    isError? : (value: string ) => string | JSX.Element | undefined;
}



export default class ReusableTextField extends React.Component<IReusableTextFieldProps> {


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
 
        // const labelStyle: ILabelStyles = {
        //     root: {
        //         fontWeight: "bold",
        //         fontSize: '16px'
        //     }
        // }

        const renderDescription = (): JSX.Element => {
            return (
              <Stack id={this.props.charCountId} horizontalAlign='end' style={{fontSize: '12px'}}>
                {this.props.description}
              </Stack>
            );
          };

    

        return (
            <div id={this.props.lineId} >
                <Stack>
                    <Label style={{fontWeight:'700'}} >
                        <span className={styles.asterik} aria-label={this.props.ariaLabelRequired}>
                            *
                        </span>
                        {this.props.title}
                        {this.props.currentPage === 2 && 
                        (<span><IconButton id={this.props.id} styles={ iconStyles } iconProps={infoIcon} onClick={this.props.showCalloutVisible}/></span>)
                        }
                    </Label>
                </Stack>
                <TextField
                   {...this.props} onRenderDescription={renderDescription} 
                />
                {/* <div>{this.props.isError}</div> */}

            </div>
        )

        }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {  IButtonStyles, IIconProps, IconButton, TextField, Label, ILabelStyles } from 'office-ui-fabric-react';
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
    title?:string;
    lineId?: string;
    currentPage?: number;
    showCalloutVisible?:(event: any ) => void ;
    getElementId?:(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
    targetId?:string;
    ariaLabelRequired:string;
    //label?: string;
    charCountId: string;
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
 
        const labelStyle: ILabelStyles = {
            root: {
                fontWeight: "700",
                fontSize: '16px',
                display: 'inline-flex',
            },
        }
        
        // const onWrapDefaultLabelRenderer = (
        //     props: ITextFieldProps, defaultRender: IRenderFunction<ITextFieldProps>,): JSX.Element => {

        //         return (
        //             <>
        //             <Stack horizontal verticalAlign="center" >
        //                 <Label styles={labelStyle} >
        //                     <span className={styles.asterik} >
        //                         *
        //                     </span>
        //                     {defaultRender(props)} 
                            
        //                 </Label>

        //             {this.props.currentPage === 2 && 
        //                 (<span><IconButton id={this.props.id} styles={ iconStyles } iconProps={infoIcon} onClick={this.props.showCalloutVisible}/></span>)
        //             }
        //             </Stack>
        //             </>
        //         );
        // };


        const onCustomlabelRender = ():JSX.Element => {
            return (

                 
                    <Label styles={labelStyle} htmlFor={this.props.id} required aria-required='true'>
                        {this.props.title}
                        {this.props.currentPage === 2 && 
                        (<span><IconButton id={this.props.id} styles={ iconStyles } iconProps={infoIcon} onClick={this.props.showCalloutVisible}/></span>)
                        }
                        <p className={styles.instruction}>{this.props.instructions}</p>
                    </Label>
                
            ) 
        }
    

      
        return (
            <div id={this.props.lineId} >
                {/* <Stack>
                    <Label styles={labelStyle} htmlFor={this.props.id}>
                        <span className={styles.asterik} aria-label={this.props.ariaLabelRequired}>
                            *
                        </span>
                        {this.props.title}
                        {this.props.currentPage === 2 && 
                        (<span><IconButton id={this.props.id} styles={ iconStyles } iconProps={infoIcon} onClick={this.props.showCalloutVisible}/></span>)
                        }
                    </Label>
                    <p id={this.props.instructionId}  className={ styles.instruction }>{this.props.instructions}</p>
                 

                </Stack> */}
                <TextField
                   {...this.props}  onRenderLabel={onCustomlabelRender}
                />

            </div>
        )

        }
}

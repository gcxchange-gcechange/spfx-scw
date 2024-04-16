/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import styles from './Scw.module.scss';
import { IButtonStyles, IIconProps, IconButton } from 'office-ui-fabric-react';




export interface IReusableTextField2Props {
    id?: string;
    name?: string;
    styles?: any;
    description?: string;
    defaultValue: string;
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
    charCountId: string;
    infoButton?: string;
    out_of_Text?: string;
    characterCountText?: string;
    isError:string[];
}



export default class ReusableTextField2 extends React.Component<IReusableTextField2Props> {


    constructor(props: IReusableTextField2Props) {
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
            <div id={this.props.lineId} >
                <>
                <span className={styles.asterik} aria-label={this.props.ariaLabelRequired}>
                    *
                </span>
                <label htmlFor={this.props.name} style={{fontWeight: 'bold'}}>{this.props.title}</label>
                {this.props.currentPage === 2 && 
                        (<span><IconButton ariaLabel={this.props.infoButton} id={this.props.id} styles={ iconStyles } iconProps={infoIcon} onClick={this.props.showCalloutVisible}/></span>)
                        }
                <p>{this.props.instructions}</p>
                <input type="text" id={this.props.id} name={this.props.name}onChange={this.props.onChange} value={this.props.defaultValue} required  maxLength={this.props.maxLength} />
                {this.props.isError && <p>Hello</p>}
                <small className={styles.charCount}>{this.props.description}</small>
                </>
            </div>
        )

        }
}
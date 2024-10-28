import * as React from "react";
import { SelectLanguage } from './SelectLanguage';
import styles from "./Scw.module.scss";
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupOptionStyles, IChoiceGroupStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Stack } from 'office-ui-fabric-react';
import parse from 'html-react-parser';


export interface ISecondStepProps {
    prefLang: string;
    handleSelectedChoice?: ( selectedChoice: string ) => void;
    selectedChoice: string;
}


export default class SecondStep extends React.Component<ISecondStepProps> {
    public strings = SelectLanguage(this.props.prefLang);

    private onSelectedKey = ( event: React.ChangeEvent<HTMLInputElement>, option: IChoiceGroupOption):void => {

        const elementclass = document.querySelector(".ms-ChoiceField-wrapper.is-inFocus");
        const isCheckedCard = document.querySelector("ms-ChoiceField-field is-checked");

        console.log("Checked", isCheckedCard)
      
        if (option.key === "1") {
            elementclass.classList.add(styles.checkedRadioButton1);
            
        } 
        else if (option.key === "2") {
            elementclass.classList.add(styles.checkedRadioButton2)
        }

        this.setState({
            selectedChoice: option.key
        })

        this.props.handleSelectedChoice(option.key)
    }

    public render(): React.ReactElement<ISecondStepProps> {

        const flexSyle: Partial<IChoiceGroupStyles> = {
            flexContainer:{
                display:'flex'
            }     
        }

        const hoverStyle: Partial<IChoiceGroupOptionStyles> = {
            labelWrapper:{
                ':hover': {
                    color: 'red'
                }
            }
        }

        const templateChoice: IChoiceGroupOption[] = [
            {   key: "1", 
                text: `${this.strings.unclassified_cardTitle}`, 
                ariaLabel: 'Unclassified community',
                styles: hoverStyle,
                onRenderField: (props, render) => {
                    return (
                        <div className={ styles.choiceCard } >
                            <div className={ styles.cardHeading}>
                                {render(props)}
                            </div>
                            <div className={styles.cardBody}>
                                { parse( this.strings.unclassified_cardText )}
                            </div>
                        </div>  
                    )
                }
            },

             {  key: "2", 
                text:`${this.strings.protected_cardTitle}`, 
                ariaLabel: 'Protected A or B community',
                onRenderField: (props, render) => {
                    return (
                        <div className={ styles.choiceCard }>
                            <div className={styles.cardHeading2}>
                                {render(props)}
                            </div>
                            <div className={styles.cardBody}>
                            { parse( this.strings.protected_cardText )}
                            </div>
                        </div>  
                    );
                } 
            }
        ]

        return (
            <>
                <div>
                    <p>{this.strings.comm_classification_para1}</p>
                    <Stack horizontalAlign='center'>
                        <ChoiceGroup 
                            id='choiceGroup' 
                            options={templateChoice} 
                            required={true} 
                            onChange={this.onSelectedKey} 
                            styles={ flexSyle} 
                            defaultSelectedKey={this.props.selectedChoice}
                        />
                    </Stack>
                </div>
            </>
        )
    }

}
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as React from 'react';
import styles from './Scw.module.scss';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';





export interface ISecondStepProps  { 
    prefLang: string;
    selectedChoice: string;
    handleSelectedChoice?: ( selectedChoice: string ) => void;


}




export default class SecondStep extends React.Component< ISecondStepProps >  { 


    public constructor( props: ISecondStepProps )  { 
        super(props);

    }

    public strings = SelectLanguage(this.props.prefLang);


    public render(): React.ReactElement<ISecondStepProps>  { 

        const flexSyle: Partial<IChoiceGroupStyles> = {
            flexContainer:{
                display:'flex'
            }
        }


        const templateChoice: IChoiceGroupOption[] = [
            {   key: 'Unclassified community', 
                text: 'Unclassified community', 
                ariaLabel: 'Unclassified community' ,
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

             {  key: 'Protected A or B community', 
                text:'Protected A or B community', 
                ariaLabel: 'Protected A or B community',
                onRenderField: (props, render) => {
                    return (
                        <div className={ styles.choiceCard }>
                            <div className={styles.cardHeading2}>
                                {render(props)}
                                <div>Hello</div>
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

                <p>{ this.strings.comm_classification_para1 }</p>
                <Stack horizontalAlign='center'>
                    <ChoiceGroup id='choiceGroup' options={templateChoice} required={true} onChange={this.onSelectedKey} styles={ flexSyle } defaultSelectedKey={this.props.selectedChoice}/>
                </Stack>
 
        
            </>
        );
    }

    private onSelectedKey = ( event: React.ChangeEvent<HTMLInputElement>, option: IChoiceGroupOption):void => {

        const elementclass = document.querySelector(".ms-ChoiceField-wrapper.is-inFocus");

      
        if (option.key === 'Unclassified community') {
            elementclass.classList.add(styles.checkedRadioButton1);
            
        } 
        else if (option.key === 'Protected A or B community') {
            elementclass.classList.add(styles.checkedRadioButton2)
        }

        this.setState({
            selectedChoice: option.text
        })

        this.props.handleSelectedChoice(option.text)
    }

}

 


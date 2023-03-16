/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { mergeStyles } from 'office-ui-fabric-react';
import { Stack } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as React from 'react';
import styles from './Scw.module.scss';





export interface ISecondStepProps  { 
    selectedChoice: string;
    handleSelectedChoice?: (selectedChoice: string) => void;


}

export interface ISecondStepState  { 
  
}



export default class SecondStep extends React.Component<ISecondStepProps, ISecondStepState>  { 


    public constructor(props: ISecondStepProps, state: ISecondStepState)  { 
        super(props);

     

    }


    public render(): React.ReactElement<ISecondStepProps>  { 

        // const optionStyle = {
        //     root: { 
        //         marginRight:'30px'
        //     }
        // }
        
        const flexSyle: Partial<IChoiceGroupStyles> = {
            flexContainer:{
                display:'flex'
            }
        }

        console.log("props", this.props)

        const templateChoice: IChoiceGroupOption[] = [
            { key: 'Unclassified community', 
             text: 'Unclassified community', 
             ariaLabel: 'Unclassified community' ,
             onRenderField: (props, render) => {
                return (
                    <div className={ styles.choiceCard } >
                        <div className={ styles.cardHeading}>
                            {render(props)}
                        </div>
                        <div className={styles.cardBody}>
                            No, I don't need to store protected information.<strong> All users will be able to find your community, and search for it.</strong>
                        </div>
                    </div>  
                    )
                }

            
            },
             { key: 'Protected A or B community', 
                text:'Protected A or B community', 
                ariaLabel: 'Protected A or B community',
                onRenderField: (props, render) => {
                    return (
                        <div className={ styles.choiceCard }>
                            <div className={styles.cardHeading2}>
                                {render(props)}
                            </div>
                            <div className={styles.cardBody}>
                            Yes, I need to store protected information such as: consent forms, personal information, contact details for individuals or organizations, financial documentation, or others
                            documents that, if compromised, <strong>could cause injury to an individual, organization or government</strong>
                            </div>
                        </div>  
                    );
                } 
            }
        ]

       
        return (
            <>
            <p>You may ned to store protected documents or information in your community's library. GCXchange can provide a space for protected information up to Protected B. First,
                let's find out whether you will be storing protected documents in your community.
            </p>
            <Stack horizontalAlign='center'>
                <ChoiceGroup id='choiceGroup' options={templateChoice} required={true} onChange={this.onSelectedKey} styles={ flexSyle } defaultSelectedKey={this.props.selectedChoice}/>
            </Stack>
 
        
            </>
        );
    }

    private onSelectedKey = ( event: React.ChangeEvent<HTMLInputElement>, option: IChoiceGroupOption):void => {

        const elementclass = document.querySelector(".ms-ChoiceField-wrapper.is-inFocus")
        const checked = document.querySelector(".ms-ChoiceField-field.is-checked")
        // console.log(event.target.value)
      
        if (option.key === 'Unclassified community') {
            console.log("ec", elementclass)
            console.log("checked", checked)
            elementclass.classList.add(styles.checkedRadioButton1);
               // event.target.parentElement.classList.add(styles.choiceCardBorder);
            
        } 
        else if (option.key === 'Protected A or B community') {
            elementclass.classList.add(styles.checkedRadioButton2)
            // checked.classList.add(styles.checkedRadioButton2);
        }
        this.setState({
            selectedChoice: option.text
        })
        this.props.handleSelectedChoice(option.text)
    }





}

 


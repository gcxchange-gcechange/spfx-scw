/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { mergeStyles } from 'office-ui-fabric-react';
import { Stack, StackItem } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
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

        const optionStyle = {
            root: { 
                display: 'flex',
                flexDirection: 'column',
                color:'pink'
            }
        }

       

        const templateChoice: IChoiceGroupOption[] = [
             { key: '1', 
             text: 'Unclassified community', 
             ariaLabel: 'Unclassified community' ,
             onRenderField: (props, render) => {
                return (
                    <div className={ styles.choiceCard }>
                        <div className={ styles.cardHeading}>
                            {render(props)}
                        </div>
                        <div className={styles.cardBody}>
                            No, I don't need to store protected information.<strong>All users will be able to find your community, and search for it.</strong>
                        </div>
                    </div>  
                    )
                }

            
            },
             { key: '2', 
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
            <Stack horizontal>
                <StackItem>
                    <ChoiceGroup options={templateChoice} required={true} onChange={this.onSelectedKey} styles={optionStyle}/>
                </StackItem>
            </Stack>
                        
        
            </>
        );
    }

    private onSelectedKey = ( event: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption):void => {

        this.setState({
            selectedChoice: option.text
        })
        this.props.handleSelectedChoice(option.text)
    }





}

 


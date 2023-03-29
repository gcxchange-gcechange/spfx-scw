/* eslint-disable react/no-unescaped-entities */
/* eslint-disable dot-notation */
import { Checkbox, ICheckboxStyles, IStackStyles, Label, Stack, StackItem } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './Scw.module.scss';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';




export interface IThirdStepProps { 
    prefLang: string;
    checkedValues: boolean[];
    checkedTerms?:( checked: boolean ) => void; 
    selectedChoice: string;
  }
 

export default class ThirdStep extends React.Component<IThirdStepProps> {

    public strings = SelectLanguage(this.props.prefLang);

    public constructor(props: IThirdStepProps) {
        super(props);
        
    }

    private onChange = ( event: React.ChangeEvent<HTMLInputElement>, isChecked:boolean ): void => {
        this.props.checkedTerms( isChecked )
    }
    
    
    public render(): React.ReactElement<IThirdStepProps> {

        const stackTokens = { childrenGap: 15 }

        const stackStyles: IStackStyles = {
            root: {
                border: '1px solid rgb(96,94,92,.5)',
                borderRadius: '5px',
                padding: '10px',
                margin: '0px, 30px'
            },
        };

        const checkBoxStyles: ICheckboxStyles = {
           text: {
            marginLeft:'20px'
           },
           checkbox: {
            background:'white',
            color: '#004DB8'
           },
           checkmark: {
            color: '#004DB8'
           }
        };

        console.log("Third", this.props.selectedChoice);

    
        return (
            
            <>
            { this.props.selectedChoice === 'Protected A or B community' ? 
            <div>
                <p>{ this.strings.protected_para1 }</p>
                <p>{ this.strings.protected_para2 }</p>
                <Label required>{ this.strings.agree_to_terms }</Label>
                <Stack tokens = { stackTokens } styles={ stackStyles }>
                    <StackItem>
                        <Checkbox  styles={checkBoxStyles} label={`${ this.strings.chk1 }`} onChange={ this.onChange } defaultChecked={this.props.checkedValues[0]} />
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>{ this.strings.chk1b }</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox styles={checkBoxStyles} label={`${ this.strings.chk2 }`}  onChange={ this.onChange } defaultChecked={this.props.checkedValues[1]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>{ this.strings.chk2b }</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox  styles={checkBoxStyles} label={`${ this.strings.chk3 }`}  onChange={ this.onChange } defaultChecked={this.props.checkedValues[2]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>{ this.strings.chk3b }</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox styles={checkBoxStyles} label={`${ this.strings.chk4 }`}  onChange={ this.onChange } defaultChecked={this.props.checkedValues[3]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>{ this.strings.chk4b } </strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox styles={checkBoxStyles} label={`${ this.strings.chk5 }`}  onChange={ this.onChange } defaultChecked={this.props.checkedValues[4]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>{ this.strings.chk5b }</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox styles={checkBoxStyles} label={`${ this.strings.chk6 }`}  onChange={ this.onChange } defaultChecked={this.props.checkedValues[5]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>{ this.strings.chk6b }</strong></p>
                    </StackItem>
                    <StackItem>
                        <Checkbox styles={checkBoxStyles} label={`${ this.strings.chk7 }`}  onChange={ this.onChange } defaultChecked={this.props.checkedValues[6]}/>
                        <p className={ styles.terms }><strong style={{ fontSize: '14px' }}>{ this.strings.chk7b }</strong></p>
                    </StackItem>
                </Stack>
            </div>
                : 
                    <div>
                        <p>{ parse( this.strings.unclassified )}</p>
                    </div>
                }
            </>
        );
     }

 }
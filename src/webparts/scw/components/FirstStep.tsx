/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import { ILabelStyles, Label, Stack, StackItem, TextField } from 'office-ui-fabric-react';




export interface IFirstStepProps {
    engName: string;
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;

 
    handleEngNameCallback?:(engNameValue: string) => void;
    frNameCallback?:(FrNameValue: string) => void;
    engDescCallback?:(shEngDescValue: string) => void;
    frDescCallback?: (shFrDescValue: string) => void;
    commPurposeCallback?: (commPurpose: string) => void;



}


export default class FirstStep extends React.Component<IFirstStepProps> {


    public constructor(props: IFirstStepProps) {
        super(props);

    }


    public render(): React.ReactElement<IFirstStepProps> {

        const {engName, commPurpose,  frCommName, shEngDesc, shFrDesc} = this.props;

        const labelStyle: Partial<ILabelStyles> = {
            root: {
                paddingBottom: '5px',
            },

           
        }

        const stackTokens = { childrenGap: 18 }

       
        return (
            <>
           
            <h2>Community purpose</h2>
            <p>The GCX Support Team needs to know the purpose of the new community to determine whether it can be <strong>approved.</strong></p>
            <Label htmlFor='commPurpose' required styles={labelStyle}>Community purpose</Label>
            <p className={ styles.instruction }>This will not show up on your site. Write in the official language of your choice. Max. 500 characters</p>
            <TextField type='text' name='commPurpose' id='commPurpose'  onChange={ this.commPurposeOnChange }defaultValue={ commPurpose } />

            
            <h2>Community name</h2>
            <Stack tokens={stackTokens}>
                <p>The community's name is the title of your community. Create a short descriptive name. A bilingual name complies with the Official Langauges Act and makes it easier for others to find your community in the GCXchange Catalogue.</p>
                <StackItem>
                    <Label htmlFor='EngName'  required  styles={labelStyle} >English community name</Label>
                    <p className={ styles.instruction }>Use keywords, not abbreviations for better discoverability. Must be between 5 and 126 characters in length and special characters are not permitted.</p>
                    <TextField  id='EngName' name='EngName' onChange={this.handleOnChangeEngNameEvent} defaultValue={engName}/>
                </StackItem>
                <StackItem>
                    <Label htmlFor='frCommName' required  styles={labelStyle} >French community name</Label>
                    <p className={ styles.instruction }>Use keywords, not abbreviations for better discoverability. Must be between 5 and 126 characters in length and special characters are not permitted.</p>
                    <TextField  id='frCommName' name='frCommName' onChange={this.OnChangeFrNameEvent } defaultValue={frCommName}/>
                </StackItem>
            </Stack>

            <h2>Community description</h2>
            <Stack tokens={stackTokens}>
                <p>The community descriptions will be visible to users when they use the {`"All communities"`} page and when they search for it.</p>
                <StackItem>
                    <Label htmlFor='shEngDesc' required  styles={labelStyle} >English description name</Label>
                    <p className={ styles.instruction }>Max. 33 characters.</p>
                    <TextField id='shEngDesc' name='shEngDesc'onChange={this.handleOnChangeEngDescEvent} defaultValue={shEngDesc}/>
                </StackItem>
                <StackItem>
                    <Label htmlFor='shFrDesc' required  styles={labelStyle} >French description name</Label>
                    <p className={ styles.instruction }>Max. 33 characters.</p>
                    <TextField id='shFrDesc' name='shFrDesc' onChange={this.handleOnChangeFrDescEvent} defaultValue={shFrDesc}/> 
                </StackItem>
            </Stack>
            </>
        );
    }


    private  commPurposeOnChange = (event:React.ChangeEvent<HTMLInputElement>) :void => { 
        const value = event.target.value;
        this.setState({commPurpose: value});
        //send it to the parent
        this.props.commPurposeCallback(value)
    }

    private  handleOnChangeEngNameEvent = (event:React.ChangeEvent<HTMLInputElement>) :void => { 
        const nameValue = event.target.value;
        this.setState({engName: nameValue});
        //send it to the parent
        this.props.handleEngNameCallback(nameValue)
    }


    private  OnChangeFrNameEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const frNameValue = event.target.value;
        this.setState({frCommName: frNameValue});
        //send it to the parent
        this.props.frNameCallback(frNameValue)
       
    }


    private  handleOnChangeEngDescEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const engDescValue = event.target.value;
        this.setState({shEngDesc: engDescValue});
        //send it to the parent
        this.props.engDescCallback(engDescValue)
       
    }
    private  handleOnChangeFrDescEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const frDescValue = event.target.value;
        this.setState({shFrDesc: frDescValue});
        //send it to the parent
        this.props.frDescCallback(frDescValue)
       
    }

 
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './Scw.module.scss';
import { Label, TextField } from 'office-ui-fabric-react';
import ModalError from './Modal';





export interface IFirstStepProps {
    engName: string;
    commPurpose: string;
    frCommName: string;
    shEngDesc: string;
    shFrDesc: string;
    errorMessage: string;

    handleOnChange?:(event:any, value: string)=> void;
    handleErrorMessage?: (errorMessage: string) => void;



}


export default class FirstStep extends React.Component<IFirstStepProps> {


    public constructor(props: IFirstStepProps) {
        super(props);

    }


    public render(): React.ReactElement<IFirstStepProps> {
        
        const labels: string[] = ['English community Name']

        const {engName, commPurpose,  frCommName, shEngDesc, shFrDesc} = this.props;

       
        return (
            <>
           
            <h2>Community details</h2>
            <p>The GCX Support Team needs to know the purpose of the new community to determine whether it can be <strong>approved.</strong></p>
            <Label htmlFor='Community purpose' required>Community purpose</Label>
            <p className={ styles.instruction }>This will not show up on your site. Write in the official language of your choice. Max. 500 characters</p>
            <TextField type='text' name='commPurpose' id='Community purpose'  onChange={ this.onhandleChangeEvent }defaultValue={ commPurpose } />

            
            <h2>Community name</h2>
            <p>The communitys name is the title of your community. Create a short descriptive name. A bilingual name complies with the Official Langauges Act and makes it easier for others to find your community in the GCXchange Catalogue.</p>
            <Label htmlFor={labels[0]} required>English community name</Label>
            <p className={ styles.instruction }>Use keywords, not abbreviations for better discoverability. Must be between 5 and 126 characters in length and special characters are not permitted.</p>
            <TextField  id={labels[0]} name='engName' onChange={this.onhandleChangeEvent} defaultValue={engName} onGetErrorMessage={this.onGetErrorMessage} validateOnLoad={false}/>
            <Label htmlFor='frCommName' required>French community name</Label>
            <p className={ styles.instruction }>Use keywords, not abbreviations for better discoverability. Must be between 5 and 126 characters in length and special characters are not permitted.</p>
            <p className={ styles.instruction }>Max. 33 characters.</p>
            <TextField  id='frCommName' name='frCommName' onChange={this.onhandleChangeEvent } defaultValue={frCommName}/>


            <h2>Community description</h2>
            <p>The community descriptions will be visible to users when they use the {`"All communities"`} page and when they search for it.</p>
            <Label htmlFor='shEngDesc' required>English description name</Label>
            <p className={ styles.instruction }>Max. 33 characters.</p>
            <TextField id='shEngDesc' name='shEngDesc'onChange={this.onhandleChangeEvent} defaultValue={shEngDesc}/>

            <Label htmlFor='shFrDesc' required>French description name</Label>
            <p className={ styles.instruction }>Max. 33 characters.</p>
            <TextField id='shFrDesc' name='shFrDesc' onChange={this.onhandleChangeEvent} defaultValue={shFrDesc}/> 
            
            </>
        );
    }

    private onhandleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => {
        const eventValue = event.target.value;
        console.log(event.target.name)
        this.setState({
            ...this.state,
            [event.target.name]: eventValue
        })
        this.props.handleOnChange(event.target.name, eventValue)
    }




    public onGetErrorMessage = ():JSX.Element => {
        
        const engNameValue = this.props.engName
        if(engNameValue === null || engNameValue === '') {
            return(
                <ModalError showModal={false} />
                )
        } else {
            return null;
        }
        
        
    }

 

 
}



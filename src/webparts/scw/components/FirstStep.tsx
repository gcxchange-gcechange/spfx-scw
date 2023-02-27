import * as React from 'react';
import styles from './Scw.module.scss';
import { Label, TextField } from 'office-ui-fabric-react';



export interface IFirstStepProps {
   name: string;
   handleCallback?: (name: string) => void;
}

export interface IFirstStepState {
  
}



export default class FirstStep extends React.Component<IFirstStepProps, IFirstStepState> {
    // userData: any;

    public constructor(props: IFirstStepProps, state: IFirstStepState) {
        super(props);

     
        this.handleOnChangeNameEvent = this.handleOnChangeNameEvent.bind(this);
    }

    

    public render(): React.ReactElement<IFirstStepProps> {

        const {name} = this.props;

       
        return (
            <>
           
            <h2>Community details</h2>
            <p>The GCX Support Team needs to know the purpose of the new community to determine whether it can be <strong>approved.</strong></p>
            <Label htmlFor={name}>Community purpose</Label>
            <p className={styles.instruction}>This will not show up on your site. Write in the official language of your choice. Max. 500 characters</p>
            <TextField id={name} onChange={this.handleOnChangeNameEvent} defaultValue={this.props.name}/>

            
            <h2>Community name</h2>
            <p>The communitys name is the title of your community. Create a short descriptive name. A bilingual name complies with the Official Langauges Act and makes it easier for others to find your community in the GCXchange Catalogue.</p>
            <Label>English community name</Label>
            <p className={styles.instruction}>Use keywords, not abbreviations for better discoverability. Must be between 5 and 126 characters in length and special characters are not permitted.</p>
            <TextField/>
            <Label>French community name</Label>
            <p className={styles.instruction}>Use keywords, not abbreviations for better discoverability. Must be between 5 and 126 characters in length and special characters are not permitted.</p>
            <p className={styles.instruction}>Max. 33 characters.</p>
            <TextField/>


            <h2>Community description</h2>
            <p>The community descriptions will be visible to users when they use the {`"All communities"`} page and when they search for it.</p>
            <Label>English description name</Label>
            <p className={styles.instruction}>Max. 33 characters.</p>
            <TextField/>
            <Label>French description name</Label>
            <p className={styles.instruction}>Max. 33 characters.</p>
            <TextField/>
            
            
            </>
        );
    }


    private  handleOnChangeNameEvent = (event: React.ChangeEvent<HTMLInputElement>) :void => { 
        const nameValue = event.target.value;
        // console.log("newName",newName);
        this.setState({name: nameValue});
        //send it to the parent
        this.props.handleCallback("Name from Child " + nameValue)
       
    }
}

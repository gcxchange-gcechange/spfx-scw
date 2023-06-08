/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';
import { Icon } from 'office-ui-fabric-react';



export interface IFailedProps {
    prefLang: string;
    engName: string; 
    frCommName: string;
    ownerList: string[];
    commPurpose: string;
    shEngDesc: string;
    shFrDesc: string;
    validationStatus: number;
    

}


export default class Failed  extends React.Component<IFailedProps> {
    public strings = SelectLanguage( this.props.prefLang);

    public constructor( props: IFailedProps ) {
        super(props);
      }

    public render(): React.ReactElement<IFailedProps>  {
        
        console.log('status', this.props.validationStatus);

        const mailto: string =  `mailto:?subject=Create%20a%20community%20in%20GCXchange%20-%20Error%20${this.props.validationStatus}&body=Hi%20GCX%20Support%20Team%2C%0D%0A%0D%0ASomething%20went%20wrong%20as%20I%20was%20submitting%20a%20request%20to%20create%20a%20community%20in%20GCXchange.%20Please%20find%20the%20information%20for%20my%20community%20below%3A%0D%0A%0D%0ACommunity%20purpose%3A%20hello%0D%0AEnglish%20community%20name%3A%20${this.props.engName}%20name%0D%0AFrench%20community%20name%3A%20${this.props.frCommName}%20french%0D%0AEnglish%20description%3A%20${this.props.shEngDesc}%0D%0AFrench%20description%3A%20${this.props.shFrDesc}%0D%0AOwners%3A%20${this.props.ownerList}%0D%0A%0D%0AError%20ID%3A%20400%0D%0A%0D%0ACan%20you%20please%20create%20a%20community%20on%20my%20behalf%20using%20the%20information%20above%3F%0D%0A%0D%0AThanks%2C%0D%0A`;
        const mailtoFR: string = `mailto:?subject=Create%20a%20community%20in%20GCXchange%20-%20Error%20${this.props.validationStatus}&body=Hi%20GCX%20Support%20Team%2C%0D%0A%0D%0ASomething%20went%20wrong%20as%20I%20was%20submitting%20a%20request%20to%20create%20a%20community%20in%20GCXchange.%20Please%20find%20the%20information%20for%20my%20community%20below%3A%0D%0A%0D%0ACommunity%20purpose%3A%20hello%0D%0AEnglish%20community%20name%3A%20${this.props.engName}%20name%0D%0AFrench%20community%20name%3A%20${this.props.frCommName}%20french%0D%0AEnglish%20description%3A%20${this.props.shEngDesc}%0D%0AFrench%20description%3A%20${this.props.shFrDesc}%0D%0AOwners%3A%20${this.props.ownerList}%0D%0A%0D%0AError%20ID%3A%20400%0D%0A%0D%0ACan%20you%20please%20create%20a%20community%20on%20my%20behalf%20using%20the%20information%20above%3F%0D%0A%0D%0AThanks%2C%0D%0A`;

        console.log(mailto);

        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Oops, something went wrong!</h2>
                {  this.props.prefLang === "fr-fr" ?
                    <p>{this.strings.failed_txt1 } S'il vous plaît <a style={{ color: '#004DB8' }} href={`mailto: ${mailtoFR}`}>envoyez-nous un email</a>, et toutes les informations que vous avez saises jusqu’ à présent seront pré-remplis dans l'email.</p>
                    :
                    <p>{this.strings.failed_txt1 } Please <a href={`mailto: ${mailto}`}>send us an email</a>, and all the information you've entered so far will be pre-populated in the email.</p>
                }
                <p>{ this.strings.failed_txt2 }</p> 
                <p>{ this.strings.failed_txt3 }</p>
                {  this.props.prefLang === "fr-fr" ?
                    <p>{parse( this.strings.failed_txt4 )}  <a style={{ color:'#004DB8'}} href={`mailto: ${mailtoFR}`} >GCÉchange portail de soutien</a> <Icon style={{ color: '#004DB8' }} iconName='NavigateExternalInline'/></p>
                    :
                    <p>{parse( this.strings.failed_txt4 )}  <a style={{ color:'#004DB8'}}  href={`mailto: ${mailtoFR}`}>GCXchange Support portal</a> <Icon style={{ color: '#004DB8' }} iconName='NavigateExternalInline'/></p>
                }
               
            </div>
        )
    }
}
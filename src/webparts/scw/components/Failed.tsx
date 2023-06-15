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

        const mailto: string =  `mailto:support-soutien@gcx-gce.gc.ca?subject=Create%20a%20community%20in%20GCXchange%20-%20Error%20${this.props.validationStatus}&body=Hi%20GCX%20Support%20Team%2C%0D%0A%0D%0ASomething%20went%20wrong%20as%20I%20was%20submitting%20a%20request%20to%20create%20a%20community%20in%20GCXchange.%20Please%20find%20the%20information%20for%20my%20community%20below%3A%0D%0A%0D%0ACommunity%20purpose%3A%20${this.props.commPurpose}%0D%0AEnglish%20community%20name%3A%20${this.props.engName}%20%0D%0AFrench%20community%20name%3A%20${this.props.frCommName}%0D%0AEnglish%20description%3A%20${this.props.shEngDesc}%0D%0AFrench%20description%3A%20${this.props.shFrDesc}%0D%0AOwners%3A%20${this.props.ownerList}%0D%0A%0D%0AError%20ID%3A%20${this.props.validationStatus}%0D%0A%0D%0ACan%20you%20please%20create%20a%20community%20on%20my%20behalf%20using%20the%20information%20above%3F%0D%0A%0D%0AThanks%2C%0D%0A`;
        const mailtoFR: string = `mailto:support-soutien@gcx-gce.gc.ca?subject=Cr%C3%A9er%20une%20collectivit%C3%A9%20dans%20GC%C3%89change%20%E2%80%93%20Erreur%20${this.props.validationStatus}&body=Bonjour%20%C3%A0%20l%E2%80%99%C3%A9quipe%20de%20soutien%20de%20GC%C3%89change%2C%20%0A%0AUn%20probl%C3%A8me%20est%20survenu%20lorsque%20j%E2%80%99ai%20soumis%20une%20demande%20en%20vue%20de%20la%20cr%C3%A9ation%20d%E2%80%99une%20collectivit%C3%A9%20dans%20GC%C3%89change.%20Vous%20trouverez%20ci-dessous%20les%20renseignements%20concernant%20la%20collectivit%C3%A9%20en%20question%E2%80%AF%3A%20%0A%0A%0AObjet%20de%20la%20collectivit%C3%A9%20%3A%20${this.props.commPurpose}%0A%0ANom%20de%20la%20collectivit%C3%A9%20en%20anglais%20%3A%20${this.props.engName}%0A%0ANom%20de%20la%20collectivit%C3%A9%20en%20fran%C3%A7ais%20%3A%20${this.props.frCommName}%0A%0ABr%C3%A8ve%20description%20en%20anglais%20%3A%20${this.props.shEngDesc}%0A%0ABr%C3%A8ve%20description%20en%20fran%C3%A7ais%20%3A%20${this.props.shFrDesc}%0A%0APropri%C3%A9taire%20%3A%20${this.props.ownerList}%0A%0A%0ACode%20d%E2%80%99erreur%E2%80%AF%3A%20${this.props.validationStatus}%0A%0A%0APourriez-vous%20cr%C3%A9er%20une%20collectivit%C3%A9%20en%20mon%20nom%2C%20%C3%A0%20l%E2%80%99aide%20des%20renseignements%20ci-dessus%3F%20%0A%0A%0AMerci%2C`;

        console.log(mailto);

        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>{`${this.strings.failed_oops}`}</h2>
                {  this.props.prefLang === "fr-fr" ?
                    <p>{this.strings.failed_txt1 } <a style={{ color: '#004DB8' }} href={`mailto: ${mailtoFR}`}>Envoyez‑nous un courriel</a>, et toutes les données entrées jusqu’à maintenant apparaîtront dans votre courriel.</p>
                    :
                    <p>{this.strings.failed_txt1 } Please <a href={`mailto: ${mailto}`}>send us an email</a>, and all the information you've entered so far will be pre-populated in the email.</p>
                }
                <p>{ this.strings.failed_txt2 }</p> 
                <p>{ this.strings.failed_txt3 }</p>
                {  this.props.prefLang === "fr-fr" ?
                    <p>{parse( this.strings.failed_txt4 )}  <a style={{ color:'#004DB8'}} href={`mailto: ${mailtoFR}`} > le portail de soutien GCÉchange</a> <Icon style={{ color: '#004DB8' }} iconName='NavigateExternalInline'/></p>
                    :
                    <p>{parse( this.strings.failed_txt4 )}  <a style={{ color:'#004DB8'}}  href={`mailto: ${mailtoFR}`}>GCXchange Support portal</a> <Icon style={{ color: '#004DB8' }} iconName='NavigateExternalInline'/></p>
                }
               
            </div>
        )
    }
}
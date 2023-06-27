import { IImageProps, Icon, ImageFit, PrimaryButton, Stack } from "office-ui-fabric-react";
import * as React from "react";
// import styles from "./Scw.module.scss";
import { SelectLanguage }  from './SelectLanguage'
import parse from 'html-react-parser';





export interface ICompleteProps {
  prefLang: string;
  url: string;
}

export interface ICompleteState {}

export default class Complete extends React.Component<ICompleteProps, ICompleteState> {
    public strings = SelectLanguage(this.props.prefLang);

  public constructor(props: ICompleteProps, state: ICompleteState) {
    super(props);
  }


 



  
  public render(): React.ReactElement<ICompleteProps> {

    const imageProps: Partial<IImageProps> = {
        src: (require("../assets/complete.png")),
        width: 400,
        imageFit: ImageFit.contain,
        
    };
  
    console.log("URL", this.props.url)

    return (
      <>
        <Stack verticalAlign="center">
            <Stack horizontal horizontalAlign="center">
                <img { ...imageProps } alt={ this.strings.complete_img_alt } />   
            </Stack>
            <h3>{ this.strings.thank_you }</h3>
            <p>{ parse( this.strings.complete_content ) }</p>
            <p>{ parse( this.strings.complete_content2 ) } <Icon style={{ color: '#004DB8' }} iconName='NavigateExternalInLine'/></p>
            <Stack horizontal horizontalAlign="center">
                <PrimaryButton id="GCXHomepage" text={this.strings.complete_button} href={this.props.url}/>
            </Stack>
           
        </Stack>
      </>
    );
  }
}

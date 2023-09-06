import { FocusZone, IImageProps, ImageFit, IStackStyles, Stack} from 'office-ui-fabric-react';
import * as React from 'react';
import styles from  '../InitialPage/Initial.module.scss';
import {faUsers, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IScwProps } from '../IScwProps';
import { SelectLanguage } from '../SelectLanguage';
import parse from 'html-react-parser';


export class Initial extends React.Component<IScwProps> {
    public strings = SelectLanguage(this.props.prefLang);

    public render(): React.ReactElement {

        const imageProps: Partial<IImageProps> = {
            src: (require("../../assets/sharepoint_teams_graphic.png")),
            width: 500,
            imageFit: ImageFit.contain,
            
      };

        const stackStyles: IStackStyles = { 
            root: {
                display:'flex',
                // width:'80%',
                fontSize: '18px;'
          },
        };

        const flexStyles: IStackStyles = {
            root: {
                height:'130px'
          },
        };

        //   const sectionStackTokens: IStackTokens = { childrenGap: 10 };

        return (
            <>
            <section className={ styles.container }>
            <h2 className={ styles.mgBottom0 }>{this.strings.create_a_community}</h2>
            <Stack horizontal verticalAlign="center" styles={ flexStyles }>
                <Stack.Item grow={ 2 } >
                    <p style={{ fontSize:'18px', width: '600px' }} className={ styles.mg0 }>{parse(this.strings.collaborate)}</p>
                </Stack.Item>
                <Stack.Item grow={ 4 }>
                    <img { ...imageProps } alt={ this.strings.SP_TeamsLogos }/> 
                </Stack.Item>
            </Stack>

            <h3>{ this.strings.a_few_things }</h3>
            <p>{ this.strings.to_create }</p>

            <FocusZone as="ul">
                <Stack horizontal styles={stackStyles } horizontalAlign='space-around' verticalAlign="center" >
                
                <li className={ styles.card }  data-is-focusable>
                        <FontAwesomeIcon icon={ faGlobe } size='3x' className={ styles.blue } />
                        <p>{ parse( this.strings.provide_bilingual_name ) }</p>
                        <small>{ parse( this.strings.bilingual_name_smallText ) }</small>  
                </li>
            
                <li className={ styles.card }  data-is-focusable>
                        <FontAwesomeIcon icon={faUsers } size='3x' className={ styles.blue } />
                        <p>{ parse( this.strings.indentify_one_more_owner ) }</p>
                        <small>{ this.strings.indentify_one_more_owner_smallText }</small> 
                </li>

                </Stack>

            </FocusZone>
 
      
                 
               {/* <StackItem>
                <div className={ styles.card }>
                    <FontAwesomeIcon icon={ faUsers } size='3x' className={ styles.blue } />
                    <p>{ parse( this.strings.protected_or_unclassified ) }</p> 
                    <small>{ parse( this.strings.protected_or_unclassified_smallText )}<Icon className={styles.blue} iconName='NavigateExternalInLine'/></small>
                </div>
               </StackItem> */}
          
            </section>
            </>

        );
    }
}
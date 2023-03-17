import { IImageProps, ImageFit, IStackStyles, IStackTokens, Stack, StackItem } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from  '../InitialPage/Initial.module.scss';
import {faUsers, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IScwProps } from '../IScwProps';
import { SelectLanguage } from '../SelectLanguage';
import parse from 'html-react-parser';


export class Initial extends React.Component<IScwProps> {
    public strings = SelectLanguage(this.props.prefLang);

    public render(): React.ReactElement {

        const imageProps: Partial<IImageProps> = {
            src: (require("../../assets/sharepoint_teams_graphic.png")),
            width: 400,
            imageFit: ImageFit.contain,
            
      };

        const stackStyles: IStackStyles = {
            root: {
                display:'flex',
                width:'80%',
                fontSize: '18px;'
          },
        };

        const flexStyles: IStackStyles = {
            root: {
                height:'130px'
          },
        };

          const sectionStackTokens: IStackTokens = { childrenGap: 20 };

        return (
            <>
            <section className={ styles.container }>
            <h2 className={ styles.mgBottom0 }>{this.strings.create_a_community}</h2>
            <Stack horizontal verticalAlign="center" styles={ flexStyles }>
                <Stack.Item grow={ 2 } >
                    <p style={{ fontSize:'18px' }}className={ styles.mg0 }>Collaborate with collegues across departments using Microsoft Teams and Sharepoint to share ideas, documents, and much more...</p>
                </Stack.Item>
                <Stack.Item grow={ 4 }>
                    <img { ...imageProps } alt={"teams" }/> 
                </Stack.Item>
            </Stack>

            <h3>A few things before you start</h3>
            <p>To create a community, you will need to:</p>
 
            <Stack horizontal styles={stackStyles } horizontalAlign='center' verticalAlign="baseline" tokens={ sectionStackTokens }>
                <StackItem align="start">
                    <div className={ styles.card }>
                        <FontAwesomeIcon icon={ faGlobe } size='3x' className={ styles.blue } />
                        <p>{ parse( this.strings.provide_bilingual_name ) }</p>
                        <small>Communities’ name and description need to be fully bilingual to comply with the Official Languages Act </small>
                    </div>
                </StackItem>
                <StackItem>
                <div className={ styles.card }>
                    <FontAwesomeIcon icon={faUsers } size='3x' className={ styles.blue } />
                    <p>Identify at least <strong className={ styles.blue }>one more owner</strong></p>
                    <small>Identifying more than one owner ensures the continuity of the community if one owner leaves </small>
                </div>
               </StackItem>
               <StackItem>
                <div className={ styles.card }>
                    <FontAwesomeIcon icon={faLock } size='3x' className={ styles.blue } />
                    <p>Identify if your data will be <strong className={ styles.blue }>Protected</strong> or  <strong className={ styles.blue }>Unclassified</strong></p>
                    <small>Terms and conditions for creating a protected  community will need to be accepted prior to creating one </small>
                </div>
               </StackItem>
            </Stack>
            </section>
            </>

        );
  }
 }
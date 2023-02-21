import { IImageProps, ImageFit, IStackStyles, IStackTokens, Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from  '../InitialPage/Initial.module.scss';
import {faUsers, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export class Initial extends React.Component {


    public render(): React.ReactElement {

        const imageProps: Partial<IImageProps> = {
            src: (require("../../assets/sharepoint_teams_graphic.png")),
            width: 500,
            imageFit: ImageFit.contain,
            
        };

        const stackStyles: IStackStyles = {
            root: {
                display:'flex',
                width:'80%',
                fontSize: '18px;'
            },
          };

          const sectionStackTokens: IStackTokens = { childrenGap: 20 };

        return (
            <>
            <section className={styles.container}>
            
            <Stack horizontal verticalAlign="center">
                <Stack.Item grow={1} >
                    <h2>Create a community</h2>
                    <p style={{fontSize:'18px'}}className={styles.mg0}>Collaborate with collegues across departments using Microsoft Teams and Sharepoint to share ideas, documents, and much more...</p>
                </Stack.Item>
                <Stack.Item grow={2}>
                    <img {...imageProps} alt={"teams"}/> 
                </Stack.Item>
            </Stack>

            <h3>A few things before you start</h3>
            <p>To create a community, you will need to:</p>
 
            <Stack horizontal styles={stackStyles} horizontalAlign='center' verticalAlign="baseline" tokens={sectionStackTokens}>
                <div className={ styles.card }>
                    <FontAwesomeIcon icon={faGlobe} size='2x' className={styles.blue} />
                    <p>Provide <strong className={styles.blue}>bilingual</strong> name and descriptions</p>
                </div>
               <div className={ styles.card }>
                    <FontAwesomeIcon icon={faUsers} size='2x' className={styles.blue} />
                    <p>Identify at least <strong className={styles.blue}>two owners</strong></p>
               </div>
               <div className={ styles.card }>
                    <FontAwesomeIcon icon={faLock} size='2x' className={styles.blue} />
                    <p>Identify if your data will be <strong className={styles.blue}>Protected</strong> or  <strong className={styles.blue}>Unclassified</strong></p>
               </div>
            </Stack>
            </section>
            </>

        );
    }
}
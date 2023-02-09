import { IImageProps, ImageFit, Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from  '../InitialPage/Initial.module.scss';
import { PrimaryButton } from '@fluentui/react';
import {faUsers, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export class Initial extends React.Component {


    public render(): React.ReactElement {

        const imageProps: Partial<IImageProps> = {
            src: (require("../../assets/sharepoint_teams_graphic.png")),
            width: 225,
            imageFit: ImageFit.contain,
            
        };


        return (
            <>
            <Stack horizontal>
            <p>Collaborate with collegues across departments using Microsoft Teams and Sharepoint to share ideas, documents, and much more...</p>
            <img {...imageProps} alt={"teams"}/> 
            </Stack>

            <h4>A few things before you start</h4>
            <p>To create a community, you will need to:</p>

            <Stack horizontal>
                <div role="list" className={styles.card}>
                    <FontAwesomeIcon icon={faGlobe} size='2x' className={styles.blue} />
                    <p>Provide <strong className={styles.blue}>bilingual</strong> name and descriptions</p>
               </div>
               <div className={styles.card}>
                    <FontAwesomeIcon icon={faUsers} size='2x' className={styles.blue} />
                    <p className={styles.mg10}>Identify at least <strong className={styles.blue}>two owners</strong></p>
               </div>
               <div className={styles.card}>
                    <FontAwesomeIcon icon={faLock} size='2x' className={styles.blue} />
                    <p>Identify if your data will be <strong className={styles.blue}>Protected</strong> or  <strong className={styles.blue}>Unclassified</strong></p>
               </div>
            </Stack>

            <PrimaryButton text="Let's go" ariaLabel="Let's go" onClick={_handleOnClick} className={styles.centerButton}/>
            </>
        );

        function _handleOnClick(): void {
            alert("Clicked");
        }
    }
}
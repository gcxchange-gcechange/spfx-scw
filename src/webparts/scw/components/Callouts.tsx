/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styles from "./Scw.module.scss";
import { DirectionalHint, FocusTrapCallout, FocusZone, IconButton, mergeStyleSets, PrimaryButton, Stack, Text } from 'office-ui-fabric-react';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';



export interface ICalloutsProps {
  showCallout: boolean;
  prefLang: string;
  targetId: string;
  openCallout?: ()=> void;

}



export default class Callouts extends React.Component< ICalloutsProps > {
  public strings = SelectLanguage( this.props.prefLang);

  public constructor( props: ICalloutsProps ) {
    super(props);
  }


  private messageText = () : string => {
    const { targetId } = this.props;

    let message: any = '';

    if ( targetId === 'commPurpose' ) {
      message = `${ this.strings.commPurpose_desc } <br/> ${ this.strings.commPurpose_Instruction}`
    }
    else if ( targetId === 'Engname' ) {
      message = `${ this.strings.engName_desc } <br/> ${ this.strings.engName_Instruction }`
    }
    else if ( targetId === 'FrCommName' ) {
      message = `${ this.strings.frCommName_desc } <br/> ${ this.strings.frCommName_Instruction}`
    }
    else if ( targetId === 'shEngDesc' ) {
      message = `${ this.strings.shEngDesc_desc } <br/> ${ this.strings.shEngDesc_Instruction}` 
    }
    else if ( targetId === 'shFrDesc' ) {
      message = `${ this.strings.shFrDesc_desc } <br/> ${ this.strings.shFrDesc_Instruction}`
    }
    // else if ( targetId === 'classification' ) {
    //   message = `${ this.strings.community_classification_desc } <br/><br/> ${this.strings.community_classification_link}`
    // }
    // else if ( targetId === 'owners' || targetId === 'members') {
    //   message = `${this.strings.owners_Instruction}`
    // }

    return message
  }

  private getTitles = () : string => {
    const { targetId } = this.props;

    let title:string = '';


    if ( targetId === 'commPurpose' )  {
      title = `${ this.strings.commPurpose_title }`
    }
    else if ( targetId === 'Engname' ) {
      title = `${ this.strings.engName_title }`
    }
    else if ( targetId === 'FrCommName' ) {
      title = `${ this.strings.frCommName_title }`
    }
    else if ( targetId === 'shEngDesc' ) {
      title = `${ this.strings.shEngDesc_title }`
    }
    else if ( targetId === 'shFrDesc' ) {
      title = `${ this.strings.shFrDesc_title }`
    }
    // else if ( targetId === 'classification' ) {
    //   title = ` ${ this.strings.community_classification}`
    // }
    else if ( targetId === 'owners' ) {
      title = `${this.strings.owners}`
    }
    // else if ( targetId === 'members' ) {
    //   title = `${this.strings.members}`
    // }

    return title
  }



  
  public render(): React.ReactElement<ICalloutsProps> {

  
   const message = parse( this.messageText());
   
  
  const calloutStyle = {
    root: {
      width: '60%',
      height: 'auto',
      borderRadius: '15px',
    },
    beak: {
      top: '20px!important',
      backgroundColor:  "#106EBE"
    },
    calloutMain: {
      borderRadius: '15px',
    },
    beakCurtain: {
      borderRadius: '15px',
    }
  }

  const stylesCallout = mergeStyleSets({

    heading: {
      height: '50px',
     
    },
    body: {
      height: 'auto',
      padding: '10px'
    },
    title: {
      fontSize: '16px',
      padding: '10px',
      color: 'white',
      marginBottom: 12,
      fontWeight: 'normal',
      backgroundColor:  "#106EBE",

    },
    buttons: {
      width:'98%',
      padding:'10px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  });


    return (
      <>
        
          <FocusTrapCallout
            role="dialog"
            target={ `#${ this.props.targetId}` }
            isBeakVisible={ true }
            beakWidth={ 16 }
            styles={ calloutStyle }
            directionalHint={ DirectionalHint.rightTopEdge }
            gapSpace={ 10 }
            setInitialFocus = {true}
            onDismiss = { this.props.openCallout} 
          >

            <div className={stylesCallout.heading}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={ stylesCallout.title }>
                <Text>{ this.getTitles() }</Text>
                <IconButton
                  className={ styles.cancelIcon }
                  iconProps={{ iconName: "Cancel" }}
                  onClick={ this.props.openCallout }
                />
              </Stack>
            </div>
            <div className={stylesCallout.body}>
              <Text>{ message }</Text>
              <FocusZone>
                <div className={ stylesCallout.buttons } >
                    <PrimaryButton onClick={this.props.openCallout} > {this.strings.close} </PrimaryButton>
                </div>
              </FocusZone>
            </div>
            
           

          </FocusTrapCallout>
      </>
    );
  }
}

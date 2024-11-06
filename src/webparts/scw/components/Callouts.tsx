/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styles from "./Scw.module.scss";
import { DefaultButton, DirectionalHint, FocusTrapCallout, FocusZone, IconButton, mergeStyleSets, PrimaryButton, Stack } from 'office-ui-fabric-react';
import { SelectLanguage } from './SelectLanguage';
import parse from 'html-react-parser';



export interface ICalloutsProps {
  showCallout: boolean;
  prefLang: string;
  targetId: string;
  openCallout?: ()=> void;
  goToPage?: (page: number)=> void;
  current: number;

}



export default class Callouts extends React.Component< ICalloutsProps > {
  public strings = SelectLanguage( this.props.prefLang);

  public constructor( props: ICalloutsProps ) {
    super(props);
  }

  private goToClassificationPage = ():void => {
    const prevPage = this.props.current - 3;
    this.props.goToPage(prevPage)
  }

  private messageText = () : string => {
    const { targetId } = this.props;

    
    let message: any = '';

    if ( targetId === 'commPurpose' ) {
      message = `${this.strings.commPurpose_desc} <br/> ${ this.strings.commPurpose_Instruction}`
    }
    else if ( targetId === 'engName' ) {
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
    else if ( targetId === 'classification' ) {
      message = `${ this.strings.classificationCallout }`
    }
    else if ( targetId === 'owners' ) {
      message = `${this.strings.owners_instruction_Callout}`
    }

    return message
  }

  private getTitles = () : string => {
    const { targetId } = this.props;

    let title:string = '';


    if ( targetId === 'commPurpose' )  {
      title = `${ this.strings.commPurpose_title }`
    }
    else if ( targetId === 'engName' ) {
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
    else if(targetId === 'classification') {
      title = `${this.strings.classification}`
    } 
    else if ( targetId === 'owners' ) {
      title = `${this.strings.owners}`
    }
 

    return title
  }



  
  public render(): React.ReactElement<ICalloutsProps> {

    console.log("CallOut ID", this.props.targetId);
  const message = parse( this.messageText());
   
  
  const calloutStyle = {
    root: {
      width: '40%',
      height: 'auto',
      borderRadius: '15px',
      boxShadow: 'rgb(0 0 0 / 58%) 0px 8px 16px'
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
      height: 'auto',
     
    },
    body: {
      height: 'auto',
      padding: '10px',
    },
    title: {
      fontSize: '16px',
      padding: '10px',
      color: 'white',
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
            aria-modal="true"
            aria-labelledby="dialog_title"
            aria-describedby="dialog_desc"
            target={ `#${ this.props.targetId}` }
            isBeakVisible={ true }
            beakWidth={ 16 }
            styles={ calloutStyle }
            directionalHint={ DirectionalHint.rightTopEdge }
            gapSpace={ 10 }
            setInitialFocus = {true}
            onDismiss = { this.props.openCallout} 
          >
            <FocusZone>
            <div className={stylesCallout.heading}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={ stylesCallout.title }>
                <h2 id="dialog_title">{ this.getTitles() }</h2>
                <IconButton
                  aria-Label=  { this.strings.close }
                  className={ styles.cancelIcon }
                  iconProps={{ iconName: "Cancel" }}
                  onClick={ this.props.openCallout }
                />
              </Stack>
            </div>
            <div id="dialog_desc" className={stylesCallout.body}>
              <p>{ message }</p>
              
                {this.props.targetId === 'classification' ? (
                  <Stack horizontal horizontalAlign="space-between">
                    <DefaultButton className={styles.classbtn} onClick={this.goToClassificationPage}>{parse(this.strings.changeClassificationButton)}</DefaultButton>
                    <PrimaryButton onClick={this.props.openCallout} > {this.strings.close} </PrimaryButton>
                </Stack>
                 ):
                <div className={ stylesCallout.buttons } >
                 <PrimaryButton onClick={this.props.openCallout} > {this.strings.close} </PrimaryButton>
                </div>
                 } 
            </div>
              </FocusZone>
          </FocusTrapCallout>
      </>
    );
  }
}

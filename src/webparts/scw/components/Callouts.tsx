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
  public strings = SelectLanguage(this.props.prefLang);

  public constructor( props: ICalloutsProps ) {
    super(props);
  }

  private messageText = () : string => {
    const { targetId } = this.props;

    let message: any = '';

    if ( targetId === 'commPurpose') {
      message = `${this.strings.CommPurpose}`
    }

    return message
  }

  
  public render(): React.ReactElement<ICalloutsProps> {

    console.log("Props", this.props.targetId);
  
   const message = parse(this.messageText());
  
  const calloutStyle = {
    root: {
      width: '500px',
      height: '100px',
      border: '1px solid #c0c0cc',
      borderRadius: '5px',
      
    },
    beak: {
      backgroundColor:  "#106EBE"
    }
  }

  const stylesCallout = mergeStyleSets({

    heading: {
      height: '50px',
      padding: '10px'
    },
    body: {
      height: '50px',
      padding: '10px'
    },
    title: {
      color: 'white',
      marginBottom: 12,
      fontWeight: 'normal',
      backgroundColor:  "#106EBE"
    },
    buttons: {
      padding:'10px',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 20,
    },
  });


    return (
      <>
        <div>

          <FocusTrapCallout
            role="alertdialog"
            target={ `#${this.props.targetId}` }
            isBeakVisible={ true }
            beakWidth={ 10 }
            styles={ calloutStyle }
            directionalHint={ DirectionalHint.rightCenter }
            gapSpace={ 10 }
            
          >
            <div className={stylesCallout.heading}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={ stylesCallout.title }>
                <Text>{this.props.targetId}</Text>
                <IconButton
                  className={ styles.cancelIcon }
                  iconProps={{ iconName: "Cancel" }}
                  onClick={ this.props.openCallout }
                />
              </Stack>
            </div>
            <div className={stylesCallout.body}>
            <Text>{message}</Text>
            </div>
            
            <FocusZone>
              <div className={ stylesCallout.buttons } >
                <PrimaryButton onClick={ this.props.openCallout } > Close </PrimaryButton>
              </div>
            </FocusZone>

          </FocusTrapCallout>
     
        </div>
      </>
    );
  }
}

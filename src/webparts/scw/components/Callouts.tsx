import * as React from "react";
// import styles from "./Scw.module.scss";
import { Callout, PrimaryButton, Stack } from 'office-ui-fabric-react';




export interface ICalloutsProps {
  
}

export interface ICalloutsState {}

export default class Callouts extends React.Component<ICalloutsProps, ICalloutsState> {
  public constructor(props: ICalloutsProps, state: ICalloutsState) {
    super(props);
  }


  private closeCallout = () :void => {
    console.log('close')
  }
  

  
  public render(): React.ReactElement<ICalloutsProps> {

  
  const calloutStyle = {
    root: {
      width: '300px',
      
    }
  }


    return (
      <>
        <div>
          <Callout
            styles={calloutStyle}
            target={`#callout-button`}
            onDismiss={this.closeCallout}
          >
            <Stack>
              Hello
              <PrimaryButton>Close</PrimaryButton>
            </Stack>
            
          </Callout>
        </div>
      </>
    );
  }
}

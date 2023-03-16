import * as React from "react";
// import styles from "./Scw.module.scss";
import { Callout, PrimaryButton } from 'office-ui-fabric-react';




export interface ICalloutsProps {
  
}

export interface ICalloutsState {}

export default class Callouts extends React.Component<ICalloutsProps, ICalloutsState> {
  public constructor(props: ICalloutsProps, state: ICalloutsState) {
    super(props);
  }


  
  

  
  public render(): React.ReactElement<ICalloutsProps> {




    return (
      <>
        <div>
          <Callout
           target={`#callout-button`}
          >
            Hello
            <PrimaryButton>Close</PrimaryButton>
          </Callout>
        </div>
      </>
    );
  }
}

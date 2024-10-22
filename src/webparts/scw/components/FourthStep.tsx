/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import AddUsers from "./AddUsers";
import { SelectLanguage } from "./SelectLanguage";
import parse from "html-react-parser";

export interface IFourthStepProps {
  context: WebPartContext;
  ownerList: string[];
  prefLang: string;
  getOwnersCallback?: (item: []) => void;
  getMemberCallback?: (item: []) => void;
  requestor: string;
  invalidEmail: string;
}

export interface IPerson {
  displayName: string;
  email: string;
  userPrincipalName: string;
}

export default class FourthStep extends React.Component<IFourthStepProps> {
  public strings = SelectLanguage(this.props.prefLang);

  public handleOwnerCallback = (items: []): void => {
    this.props.getOwnersCallback(items);
  };

  public render(): React.ReactElement<IFourthStepProps> {
    return (
      <>
        <p>{parse(this.strings.invite_owners_para1)}</p>
   
          <AddUsers
            id={"owners"}
            title={this.strings.invite_owners_label}
            instructions={this.strings.owners_Instruction}
            aria-describedby="owners"
            prefLang={this.props.prefLang}
            context={this.props.context}
            ownerList={this.props.ownerList}
            getOwnersCallback={this.handleOwnerCallback}
            requestor={this.props.requestor}
            invalidEmail={this.props.invalidEmail}
          />
      
      </>
    );
  }
}

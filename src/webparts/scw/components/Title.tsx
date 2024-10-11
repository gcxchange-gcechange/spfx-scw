import * as React from "react";
import { SelectLanguage } from "./SelectLanguage";
import styles from "./Scw.module.scss";

export interface ITitleProps {
  current: number;
  step: number;
  prefLang: string;
  status: number;
  selectedChoice: string;
}

export default class Title extends React.Component<ITitleProps> {
  public strings = SelectLanguage(this.props.prefLang);

  private pageTitle = (): string => {
    const { current, step, status, selectedChoice } = this.props;

    const titles: string[] = [
      `${this.strings.community_details}`,
      `${this.strings.community_classification}`,
      `${this.strings.unclassifiedTermTitle}`,
      `${this.strings.protectedTermTitle}`,
      `${this.strings.invite_owners_title}`,
      `${this.strings.review_submit}`,
      `${this.strings.submissionFailed}`,
      `${this.strings.title_complete}`,
    ];

    let title: string = "";

    if (step === 0) {
      title = null;
    } else if (step === 1 && current === 0) {
      title = `${titles[0]}`;
    } else if (current === 1) {
      title = `${titles[1]}`;
    } else if (current === 2 && selectedChoice === "1") {
      title = `${titles[2]}`
    } else if (current === 2 && selectedChoice === "2") {
      title = `${titles[3]}`;
    } else if (current === 3 ) {    
      title = `${titles[4]}`
    } else if (current === 4 ) {
      title = `${titles[5]}`;
    } else if (current === 5 && status !== 200) {
      title = `${titles[6]}`;
    } else {
      title = `${titles[7]}`;
    }

    return title;
  };

  public render(): React.ReactElement<ITitleProps> {
    return (
      <>
        {this.props.step !== 0 && (
          <h2 style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.mainTitle}>
              {this.strings.create_a_community}
            </span>
            <span>{this.pageTitle()}</span>
          </h2>
        )}
      </>
    );
  }
}

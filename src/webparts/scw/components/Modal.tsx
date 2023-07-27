/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Modal } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import parse from 'html-react-parser';
import { SelectLanguage } from './SelectLanguage';
// import { IButtonStyles } from "office-ui-fabric-react";
// import { PrimaryButton } from "office-ui-fabric-react";

export interface IErrorModalProps {
  showModal: boolean;
  openModal?: () => void;
  onClose?: () => void;
  engName: string;
  frCommName: string;
  commPurpose: string;
  shEngDesc: string;
  shFrDesc: string;
  // selectedChoice: string;
  checkedValues: string[];
  ownerList: string[];
  current: number;
  prefLang: string;
}

export interface IErrorModalState {}

export default class ErrorModal extends React.Component<IErrorModalProps, IErrorModalState> {
  public constructor(props: IErrorModalProps, state: IErrorModalState) {
    super(props);
  }

  public strings = SelectLanguage(this.props.prefLang);

  private modalStyle = {
    main: {
      display: "flex",
      borderRadius: "5px",
      minWidth: "600px",
      maxWidth: "600px",
    },
    header: {
      backgroundColor: "#106EBE",
      color: "white",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "30px",
      paddingRight: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    footer: {
      padding: "10px",
      marginLeft: "60px",
      marginRight: "60px"
    },
  };

  public errorMessage = (): string => {
   
    const {
      current,
      commPurpose,
      engName,
      frCommName,
      shEngDesc,
      shFrDesc,
      // selectedChoice,
      // checkedValues,
      ownerList,
    } = this.props;

  // const filtered = checkedValues.filter((value, index) => {
  //   return checkedValues.indexOf(value) === index
  // });

    interface PropValues {
      name: string;
      value: any;
    }

    const firstValues: PropValues[] = [
      { name: `${ this.strings.commPurpose_Modal }`, value: `${commPurpose}` },
      { name: `${ this.strings.engName_Modal }`, value: `${engName}` },
      { name: `${ this.strings.frCommName_Modal }`, value: `${frCommName}` },
      { name: `${ this.strings.shEngDesc_Modal }`, value: `${shEngDesc}` },
      { name: `${ this.strings.shFrDesc_Modal }`, value: `${shFrDesc}` },
    ];

    // const secondValues: PropValues[] = [
    //   { name: `${ this.strings.community_classification_Modal }`, value: `${selectedChoice}` },
    // ];
   
    // const thirdValues: PropValues[] = [
    //   { name: `${ this.strings.term_of_use.toLowerCase() }`, value: `${filtered.length}` },
    // ];

    const fourthValues: PropValues[] = [
      { name: `${ this.strings.one_more_owner }`, value: `${ownerList.length}` },
    ];
    const lastValues: PropValues[] = [
      { name: `${ this.strings.commPurpose_Modal }`, value: `${commPurpose}` },
      { name: `${ this.strings.engName_Modal }`, value: `${engName}` },
      { name: `${ this.strings.frCommName_Modal }`, value: `${frCommName}` },
      { name: `${ this.strings.shEngDesc_Modal }`, value: `${shEngDesc}` },
      { name: `${ this.strings.shFrDesc_Modal }`, value: `${shFrDesc}` },
      { name: `${ this.strings.one_more_owner }`, value: `${ownerList.length}` },
    ];

    let message: string = "";
    const results: string[] = [];
    const comma = `<span style="fontWeight:normal">, </span>`;

    for (const obj of firstValues) {
      if (current === 0 && obj.value === "") {
        results.push(obj.name);
        
        if (results.length > 1) {
          message =  `${this.strings.provide}` + results.slice(0, -1).join(`${comma}`) + `${ this.strings.and }` + results.slice(-1)
          
        } 
        else if ( results.length === 1 ) {
          message = `${this.strings.provide} ${obj.name}`
        }
      }
    }

    // for (const obj of secondValues) {
    //   if (current === 1 && obj.value === "") {
    //     message = `${this.strings.select }  ${obj.name}`;
    //   }
    // }

    // for (const obj of thirdValues) {
    //   console.log("thirdValues", obj.value)
    //   if (current === 2 && (obj.value === '' || obj.value < 7)) {
    //     message += `${this.strings.agree} ${ obj.name }`;
    //   }
    // }

    for (const obj of fourthValues) {
      if (current === 1 && obj.value < 2) {
        message += `${obj.name}`;
      }
    }

    for (const obj of lastValues) {
      if (current === 2 && (obj.value === '' || obj.value < 2)) {
        results.push(obj.name);
     
        if ( results.length > 1 ) {
          message =  `${this.strings.provide}` + results.slice(0, -1).join(`${comma}`) + `${ this.strings.and }` + results.slice(-1)
        } 
       
        else if (results.length === 1) {
          message = `${this.strings.provide} ${obj.name}`
        }
      }
    }

    return  message;
  };

  public render(): React.ReactElement<IErrorModalProps> {

    const messages = parse(this.errorMessage());

    return (
      <>
        {/* <div> */}
          <Modal
            titleAriaId={ this.strings.forget }
            isOpen={ this.props.showModal}
            onDismiss={ this.props.onClose}
            isBlocking={ true}
            styles={{
              main: this.modalStyle.main,
            }}
          >
            <div>
            <div style={ this.modalStyle.header}>
              <h2>{ this.strings.forget }</h2>
              <IconButton
                tabIndex={1}
                aria-label= { this.strings.close }
                className={styles.cancelIcon}
                iconProps={{ iconName: "Cancel" }}
                onClick={ this.props.onClose}
              />
            </div>
            <div style={ this.modalStyle.footer}>
              <Stack>
                <Stack.Item align="center">
                  <p className={ styles.modalContent }>{ this.strings.you_must } <strong>{messages}</strong> { this.strings.before_proceeding }</p>
                </Stack.Item>
                <Stack.Item>
                  <hr  aria-hidden= 'true' className={styles.horizontalLine} />
                </Stack.Item>
                <Stack.Item align="center">
                  <button
                    tabIndex={2}
                    aria-label= { this.strings.close }
                    onClick={ this.props.onClose}
                    className={styles.close}
                  >
                    { this.strings.close }
                  </button>
                </Stack.Item>
              </Stack>
            </div>
            </div>
          </Modal>
        {/* </div> */}
      </>
    );
  }
}

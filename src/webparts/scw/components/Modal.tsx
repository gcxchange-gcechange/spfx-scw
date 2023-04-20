/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Modal, PrimaryButton } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import parse from 'html-react-parser';
import { SelectLanguage } from './SelectLanguage';

export interface IErrorModalProps {
  showModal: boolean;
  openModal?: () => void;
  onClose?: () => void;
  engName: string;
  frCommName: string;
  commPurpose: string;
  shEngDesc: string;
  shFrDesc: string;
  selectedChoice: string;
  checkedValues: string[];
  ownerList: string[];
  current: number;
  prefLang: string;
}

export interface IErrorModalState {}

export default class ErrorModal extends React.Component<
  IErrorModalProps,
  IErrorModalState
> {
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
      selectedChoice,
      checkedValues,
      ownerList,
    } = this.props;

  

    interface PropValues {
      name: string;
      value: any;
    }

    const firstValues: PropValues[] = [
      { name: `${ this.strings.commPurpose_title }`, value: `${commPurpose}` },
      { name: `${ this.strings.engName_title }`, value: `${engName}` },
      { name: `${ this.strings.frCommName_title }`, value: `${frCommName}` },
      { name: `${ this.strings.shEngDesc_Modal }`, value: `${shEngDesc}` },
      { name: `${ this.strings.shFrDesc_Modal}`, value: `${shFrDesc}` },
    ];

    const secondValues: PropValues[] = [
      { name: `${ this.strings.community_classification }`, value: `${selectedChoice}` },
    ];
   
    const thirdValues: PropValues[] = [
      { name: `${ this.strings.term_of_use }`, value: `${checkedValues.length}` },
    ];

    const fourthValues: PropValues[] = [
      { name: `${ this.strings.one_more_owner }`, value: `${ownerList.length}` },
    ];
    const lastValues: PropValues[] = [
      { name: `${ this.strings.commPurpose_title }`, value: `${commPurpose}` },
      { name: `${ this.strings.engName_title }`, value: `${engName}` },
      { name: `${ this.strings.frCommName_title }`, value: `${frCommName}` },
      { name: `${ this.strings.shEngDesc_title }`, value: `${shEngDesc}` },
      { name: `${ this.strings.shFrDesc_title }`, value: `${shFrDesc}` },
      { name: `${ this.strings.second_owner }`, value: `${ownerList.length}` },
    ];

    let message: string = "";
    const results: string[] = [];
    const seperatorAndThe = `<span style="fontWeight:normal">, ${ this.strings.and_the} </span>`;
    const seperatorThe = `<span style="fontWeight:normal">, ${ this.strings.the} </span>`;
    const seperatorTheNoComma = `<span style="fontWeight:normal"> ${ this.strings.the } </span>`;
    const seperatorA = '<span style="fontWeight:normal"> a </span>';
    const seperatorUne = '<span style="fontWeight:normal">, une </span>';

    for (const obj of firstValues) {
      if (current === 0 && obj.value === "") {
        results.push(obj.name);

        if (results.length > 2 && this.props.prefLang === 'en-en') {
          message =
            results.slice(0, -1).join(`${seperatorThe}`) + `${ seperatorAndThe }` + results.slice(-1);
        } 
        else if (results.length > 2 && this.props.prefLang === 'fr-fr' ) {
          // message =
          // results.slice(0, -1).join(`${seperatorThe}`) + `${ seperatorAndThe }`+ results.slice(-1);

          message =  results.slice(0, -1)
          .map(word => {
            console.log("word", word.charAt(0))
          if (word.charAt(0) === 'b') {
              return `${seperatorUne} + ${word}`;
          }
          return word;
        })
        .join(seperatorThe) + results.slice(-1);
        }
        else if ( results.length === 2 ){
          message = results.join(`${seperatorAndThe}`) ;
        }
        else if ( results.length === 1 ) {
          message = `${seperatorTheNoComma} ${obj.name}`
        }
      }
    }

    for (const obj of secondValues) {
      if (current === 1 && obj.value === "") {
        message = `${seperatorA} ${obj.name}`;
      }
    }

    for (const obj of thirdValues) {
      if (current === 2 && (obj.value === '' || obj.value < 7)) {
        message += `${ obj.name.toLowerCase() }`;
      }
    }

    for (const obj of fourthValues) {
      if (current === 3 && obj.value < 2) {
        message += `${obj.name}`;
      }
    }

    for (const obj of lastValues) {
      if (current === 4 && (obj.value === '' || obj.value < 2)) {
        results.push(obj.name);
     
        if ( results.length > 2 ) {
          message =
            results.slice(0, -1).join(`${seperatorThe}`) + `${ seperatorAndThe }` +  results.slice(-1);
        } 
        else if ( results.length === 2 )  {
          message = results.join(`${seperatorAndThe}`)
        }
        else if (results.length === 1) {
          message = `${seperatorTheNoComma} ${obj.name}`
        }
      }
    }

    return  message;
  };

  public render(): React.ReactElement<IErrorModalProps> {

    const messages = parse(this.errorMessage());

    return (
      <>
        <div>
          <Modal
            isOpen={ this.props.showModal}
            onDismiss={ this.props.onClose}
            isBlocking={ true}
            styles={{
              main: this.modalStyle.main,
            }}
          >
            <div style={ this.modalStyle.header}>
              <h2>{ this.strings.forget }</h2>
              <IconButton
                className={styles.cancelIcon}
                iconProps={{ iconName: "Cancel" }}
                onClick={ this.props.onClose}
              />
            </div>
            <div style={ this.modalStyle.footer}>
              <Stack>
                <Stack.Item align="center">
                  <p className={ styles.modalContent }>{ this.props.checkedValues.length !== 0 ? this.strings.you_must_agree : this.strings.you_must_provide } <strong>{messages}</strong> { this.strings.before_proceeding }</p>
                </Stack.Item>
                <Stack.Item>
                  <hr className={styles.horizontalLine} />
                </Stack.Item>
                <Stack.Item align="center">
                  <PrimaryButton
                    onClick={ this.props.onClose}
                    className={styles.close}
                  >
                    { this.strings.close }
                  </PrimaryButton>
                </Stack.Item>
              </Stack>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}

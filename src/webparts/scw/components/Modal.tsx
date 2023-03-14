import * as React from "react";
import { Modal, PrimaryButton } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./Scw.module.scss";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import parse from 'html-react-parser';

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
  checkedValues: boolean[];
  ownerList: string[];
  current: number;
}

export interface IErrorModalState {}

export default class ErrorModal extends React.Component<
  IErrorModalProps,
  IErrorModalState
> {
  public constructor(props: IErrorModalProps, state: IErrorModalState) {
    super(props);
  }

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
      value: string | boolean | number;
    }

    const firstValues: PropValues[] = [
      { name: "Community purpose", value: `${commPurpose}` },
      { name: "English community name", value: `${engName}` },
      { name: "French community name", value: `${frCommName}` },
      { name: "Short English description", value: `${shEngDesc}` },
      { name: "Short French description", value: `${shFrDesc}` },
    ];

    const secondValues: PropValues[] = [
      { name: "community classification", value: `${selectedChoice}` },
    ];
    console.log("SV",secondValues)
    const thirdValues: PropValues[] = [
      { name: "terms of use", value: `${checkedValues.length}` },
    ];

    const fourthValues: PropValues[] = [
      { name: "at least one more owner", value: `${ownerList.length}` },
    ];
    const lastValues: PropValues[] = [
      { name: "Community Purpose", value: `${commPurpose}` },
      { name: "English community name", value: `${engName}` },
      { name: "French community name", value: `${frCommName}` },
      { name: "Short English description", value: `${shEngDesc}` },
      { name: "Short French description", value: `${shFrDesc}` },
      { name: "second owner", value: `${ownerList.length}` },
    ];

    let message: string = "";
    const results: string[] = [];
    const seperatorAndThe = '<span style="fontWeight:normal">, and the </span>';
    const seperatorThe = '<span style="fontWeight:normal">, the </span>';
    const seperatorTheNoComma = '<span style="fontWeight:normal"> the </span>';
    const seperatorA = '<span style="fontWeight:normal"> a </span>';
    const seperatorAll = '<span style="fontWeight:normal"> all </span>';

    for (const obj of firstValues) {
      if (current === 0 && obj.value === "") {
        results.push(obj.name);

        if (results.length > 2 ) {
          message =
            results.slice(0, -1).join(`${seperatorThe}`) + `${ seperatorAndThe }` + results.slice(-1);
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
      if (current === 2 && (obj.value === "" || obj.value < 7)) {
        message += `${seperatorAll} ${obj.name}`;
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
        console.log("res",results);
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
            isOpen={this.props.showModal}
            onDismiss={this.props.onClose}
            isBlocking={true}
            styles={{
              main: this.modalStyle.main,
            }}
          >
            <div style={this.modalStyle.header}>
              <h2>Did you forget something?</h2>
              <IconButton
                className={styles.cancelIcon}
                iconProps={{ iconName: "Cancel" }}
                onClick={this.props.onClose}
              />
            </div>
            <div style={this.modalStyle.footer}>
              <Stack>
                <Stack.Item align="center">
                  <p className={ styles.modalContent }>You must provide <strong>{messages}</strong> before proceeding</p>
                </Stack.Item>
                <Stack.Item>
                  <hr className={styles.horizontalLine} />
                </Stack.Item>
                <Stack.Item align="center">
                  <PrimaryButton
                    onClick={this.props.onClose}
                    className={styles.close}
                  >
                    CLOSE
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
